-- =============================================
-- FIX: Actualizar políticas RLS para permitir CRUD
-- Ejecutar en Supabase SQL Editor
-- =============================================

-- Eliminar políticas existentes
DROP POLICY IF EXISTS "Proyectos públicos visibles" ON projects;
DROP POLICY IF EXISTS "Categorías públicas visibles" ON categories;

-- OPCIÓN 1: Desactivar RLS completamente (más simple para admin hardcodeado)
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;

-- Si prefieres mantener RLS activo, usa la OPCIÓN 2 en su lugar:
-- (Comenta la opción 1 y descomenta la opción 2)

/*
-- OPCIÓN 2: Políticas permisivas para anon key
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Permitir SELECT a todos
CREATE POLICY "Allow public read" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Allow public read" ON categories
  FOR SELECT USING (true);

-- Permitir INSERT a todos (la autenticación la maneja la API)
CREATE POLICY "Allow insert" ON projects
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow insert" ON categories
  FOR INSERT WITH CHECK (true);

-- Permitir UPDATE a todos
CREATE POLICY "Allow update" ON projects
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow update" ON categories
  FOR UPDATE USING (true) WITH CHECK (true);

-- Permitir DELETE a todos
CREATE POLICY "Allow delete" ON projects
  FOR DELETE USING (true);

CREATE POLICY "Allow delete" ON categories
  FOR DELETE USING (true);
*/

-- Verificar que RLS está desactivado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename IN ('projects', 'categories');
