import { Pool, type QueryResultRow } from 'pg'

const defaultLocalDatabaseUrl = 'postgresql://postgres:postgres@localhost:5434/soluciones_integrales_local'
const connectionString = process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL || defaultLocalDatabaseUrl

let pool: Pool | null = null

type QueryError = {
  message: string
  code?: string
}

type QueryResponse<T = unknown> = {
  data: T | null
  error: QueryError | null
}

type Filter = {
  column: string
  value: unknown
}

type Order = {
  column: string
  ascending: boolean
}

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString,
      max: 10,
    })
  }

  return pool
}

function quoteIdentifier(identifier: string) {
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(identifier)) {
    throw new Error(`Identificador SQL inválido: ${identifier}`)
  }

  return `"${identifier}"`
}

function buildWhereClause(filters: Filter[], params: unknown[]) {
  if (filters.length === 0) {
    return ''
  }

  const clauses = filters.map(({ column, value }) => {
    params.push(value)
    return `${quoteIdentifier(column)} = $${params.length}`
  })

  return ` WHERE ${clauses.join(' AND ')}`
}

function normalizeRows<T>(rows: T[], expectSingle: boolean): QueryResponse<T | T[]> {
  if (!expectSingle) {
    return { data: rows, error: null }
  }

  if (rows.length !== 1) {
    return {
      data: null,
      error: {
        code: 'PGRST116',
        message: 'JSON object requested, multiple (or no) rows returned',
      },
    }
  }

  return { data: rows[0], error: null }
}

class LocalQueryBuilder<T extends QueryResultRow = QueryResultRow> implements PromiseLike<QueryResponse<T | T[]>> {
  private readonly table: string
  private filters: Filter[] = []
  private orders: Order[] = []
  private limitCount: number | null = null
  private expectSingle = false
  private action: 'select' | 'insert' | 'update' | 'delete' | 'upsert' = 'select'
  private payload: Record<string, unknown> | Record<string, unknown>[] | null = null
  private returning = false
  private conflictColumn: string | null = null

  constructor(table: string) {
    this.table = table
  }

  select(_columns: string = '*') {
    if (this.action === 'select') {
      return this
    }

    this.returning = true
    return this
  }

  insert(values: Record<string, unknown> | Record<string, unknown>[]) {
    this.action = 'insert'
    this.payload = values
    return this
  }

  update(values: Record<string, unknown>) {
    this.action = 'update'
    this.payload = values
    return this
  }

  delete() {
    this.action = 'delete'
    return this
  }

  upsert(values: Record<string, unknown> | Record<string, unknown>[], options?: { onConflict?: string }) {
    this.action = 'upsert'
    this.payload = values
    this.conflictColumn = options?.onConflict || null
    return this
  }

  eq(column: string, value: unknown) {
    this.filters.push({ column, value })
    return this
  }

  order(column: string, options?: { ascending?: boolean }) {
    this.orders.push({ column, ascending: options?.ascending !== false })
    return this
  }

  limit(count: number) {
    this.limitCount = count
    return this
  }

  single() {
    this.expectSingle = true
    return this
  }

  then<TResult1 = QueryResponse<T | T[]>, TResult2 = never>(
    onfulfilled?: ((value: QueryResponse<T | T[]>) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    return this.execute().then(onfulfilled, onrejected)
  }

  private async execute(): Promise<QueryResponse<T | T[]>> {
    try {
      switch (this.action) {
        case 'insert':
          return await this.executeInsert(false)
        case 'update':
          return await this.executeUpdate()
        case 'delete':
          return await this.executeDelete()
        case 'upsert':
          return await this.executeInsert(true)
        case 'select':
        default:
          return await this.executeSelect()
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Database query failed'
      const code = typeof error === 'object' && error !== null && 'code' in error ? String((error as { code?: string }).code) : undefined
      return { data: null, error: { message, code } }
    }
  }

  private async executeSelect(): Promise<QueryResponse<T | T[]>> {
    const params: unknown[] = []
    let sql = `SELECT * FROM ${quoteIdentifier(this.table)}`

    sql += buildWhereClause(this.filters, params)

    if (this.orders.length > 0) {
      const orderBy = this.orders
        .map(({ column, ascending }) => `${quoteIdentifier(column)} ${ascending ? 'ASC' : 'DESC'}`)
        .join(', ')
      sql += ` ORDER BY ${orderBy}`
    }

    if (this.limitCount !== null) {
      sql += ` LIMIT ${Math.max(0, this.limitCount)}`
    }

    const result = await getPool().query<T>(sql, params)
    return normalizeRows(result.rows, this.expectSingle)
  }

  private async executeInsert(isUpsert: boolean): Promise<QueryResponse<T | T[]>> {
    const rows = Array.isArray(this.payload) ? this.payload : [this.payload]

    if (!rows[0]) {
      return { data: null, error: { message: 'No hay datos para insertar' } }
    }

    const columns = Object.keys(rows[0])
    if (columns.length === 0) {
      return { data: null, error: { message: 'No hay columnas para insertar' } }
    }

    const params: unknown[] = []
    const valuesSql = rows
      .map((row) => {
        const placeholders = columns.map((column) => {
          params.push((row as Record<string, unknown>)[column] ?? null)
          return `$${params.length}`
        })
        return `(${placeholders.join(', ')})`
      })
      .join(', ')

    let sql = `INSERT INTO ${quoteIdentifier(this.table)} (${columns.map(quoteIdentifier).join(', ')}) VALUES ${valuesSql}`

    if (isUpsert) {
      if (!this.conflictColumn) {
        throw new Error('Upsert requiere onConflict')
      }

      const updateColumns = columns.filter((column) => column !== this.conflictColumn)
      const updates = updateColumns
        .map((column) => `${quoteIdentifier(column)} = EXCLUDED.${quoteIdentifier(column)}`)
        .join(', ')

      sql += ` ON CONFLICT (${quoteIdentifier(this.conflictColumn)}) DO UPDATE SET ${updates}`
    }

    if (this.returning || this.expectSingle) {
      sql += ' RETURNING *'
    }

    const result = await getPool().query<T>(sql, params)
    if (!this.returning && !this.expectSingle) {
      return { data: null, error: null }
    }

    return normalizeRows(result.rows, this.expectSingle)
  }

  private async executeUpdate(): Promise<QueryResponse<T | T[]>> {
    const updates = this.payload as Record<string, unknown> | null
    if (!updates || Object.keys(updates).length === 0) {
      return { data: null, error: { message: 'No hay datos para actualizar' } }
    }

    const params: unknown[] = []
    const setClause = Object.entries(updates)
      .map(([column, value]) => {
        params.push(value)
        return `${quoteIdentifier(column)} = $${params.length}`
      })
      .join(', ')

    let sql = `UPDATE ${quoteIdentifier(this.table)} SET ${setClause}`
    sql += buildWhereClause(this.filters, params)

    if (this.returning || this.expectSingle) {
      sql += ' RETURNING *'
    }

    const result = await getPool().query<T>(sql, params)
    if (!this.returning && !this.expectSingle) {
      return { data: null, error: null }
    }

    return normalizeRows(result.rows, this.expectSingle)
  }

  private async executeDelete(): Promise<QueryResponse<T | T[]>> {
    const params: unknown[] = []
    let sql = `DELETE FROM ${quoteIdentifier(this.table)}`
    sql += buildWhereClause(this.filters, params)

    if (this.returning || this.expectSingle) {
      sql += ' RETURNING *'
    }

    const result = await getPool().query<T>(sql, params)
    if (!this.returning && !this.expectSingle) {
      return { data: null, error: null }
    }

    return normalizeRows(result.rows, this.expectSingle)
  }
}

type LocalDbClient = {
  from: <T extends QueryResultRow = QueryResultRow>(table: string) => LocalQueryBuilder<T>
}

const localDbClient: LocalDbClient = {
  from(table) {
    return new LocalQueryBuilder(table)
  },
}

export function getSupabaseAdmin() {
  return localDbClient
}

// Tipos para la base de datos
export interface DBProject {
  id: string
  title: string
  slug: string
  client: string
  category: string
  description: string
  full_description?: string
  main_image: string
  gallery?: string[]
  video_url?: string
  year: string
  location?: string
  duration?: string
  featured: boolean
  published: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export interface DBCategory {
  id: string
  title: string
  slug: string
  description?: string
  color?: string
  created_at: string
}

// ============== FUNCIONES DE FETCH ==============

export async function getProjects(publishedOnly: boolean = true): Promise<DBProject[]> {
  try {
    let query = getSupabaseAdmin()
      .from<DBProject>('projects')
      .select('*')
      .order('order_index', { ascending: true })
      .order('year', { ascending: false })

    if (publishedOnly) {
      query = query.eq('published', true)
    }

    const { data, error } = await query

    if (error) throw error
    return (data as DBProject[]) || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<DBProject | null> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from<DBProject>('projects')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) throw error
    return (data as DBProject) || null
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export async function getCategories(): Promise<DBCategory[]> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from<DBCategory>('categories')
      .select('*')
      .order('title', { ascending: true })

    if (error) throw error
    return (data as DBCategory[]) || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// ============== FUNCIONES ADMIN ==============

export async function getAllProjects(): Promise<DBProject[]> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from<DBProject>('projects')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) throw error
    return (data as DBProject[]) || []
  } catch (error) {
    console.error('Error fetching all projects:', error)
    return []
  }
}

export async function createProject(project: Omit<DBProject, 'id' | 'created_at' | 'updated_at'>): Promise<DBProject | null> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from<DBProject>('projects')
      .insert(project)
      .select()
      .single()

    if (error) throw error
    return (data as DBProject) || null
  } catch (error) {
    console.error('Error creating project:', error)
    return null
  }
}

export async function updateProject(id: string, updates: Partial<DBProject>): Promise<DBProject | null> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from<DBProject>('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return (data as DBProject) || null
  } catch (error) {
    console.error('Error updating project:', error)
    return null
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    const { error } = await getSupabaseAdmin()
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting project:', error)
    return false
  }
}

