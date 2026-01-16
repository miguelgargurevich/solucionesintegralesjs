-- =============================================
-- SQL para crear tablas en Supabase
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- =============================================

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(50) DEFAULT 'industrial-blue',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de proyectos
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  client VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT,
  main_image TEXT NOT NULL,
  gallery TEXT[] DEFAULT '{}',
  video_url TEXT,
  year VARCHAR(4) NOT NULL,
  location VARCHAR(200),
  duration VARCHAR(50),
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year DESC);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Habilitar Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Políticas de acceso público (solo lectura)
CREATE POLICY "Categorías visibles para todos" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Proyectos publicados visibles para todos" ON projects
  FOR SELECT USING (published = true);

-- Políticas para usuarios autenticados (CRUD completo)
CREATE POLICY "Usuarios autenticados pueden gestionar categorías" ON categories
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Usuarios autenticados pueden gestionar proyectos" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- Datos de ejemplo (categorías)
-- =============================================

INSERT INTO categories (title, slug, description, color) VALUES
  ('Ingeniería Estructural', 'ingenieria-estructural', 'Diseño y cálculo de estructuras', 'industrial-blue'),
  ('Obras Civiles', 'obras-civiles', 'Construcción y remodelación', 'safety-yellow'),
  ('Montaje Industrial', 'montaje-industrial', 'Instalación de equipos y maquinaria', 'metal-gray'),
  ('Piping', 'piping', 'Sistemas de tuberías', 'industrial-blue'),
  ('Estructuras Metálicas', 'estructuras-metalicas', 'Fabricación y montaje de estructuras', 'safety-yellow'),
  ('Señalización', 'senalizacion', 'Señalización industrial y de seguridad', 'red')
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- Datos de ejemplo (proyectos iniciales)
-- =============================================

INSERT INTO projects (title, slug, client, category, description, main_image, year, featured, published, order_index) VALUES
  (
    'Diseño estructural – Goodyear Almacén',
    'diseno-estructural-goodyear',
    'Goodyear',
    'Ingeniería Estructural',
    'Diseño y cálculo estructural completo para nuevo almacén industrial de 2,500 m².',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
    '2024',
    true,
    true,
    1
  ),
  (
    'Trinchera para prensas de vulcanización',
    'trinchera-prensas-vulcanizacion',
    'Lima Caucho',
    'Obras Civiles',
    'Construcción de trinchera especializada para sistema de prensas de vulcanización.',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
    '2024',
    true,
    true,
    2
  ),
  (
    'Montaje de tanque pulmón de aire',
    'montaje-tanque-pulmon',
    'Ransa',
    'Montaje Industrial',
    'Instalación completa de tanque pulmón con capacidad de 15,000 litros.',
    'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=600&fit=crop',
    '2023',
    true,
    true,
    3
  ),
  (
    'Instalación de tubería de vapor y condensado',
    'instalacion-tuberia-vapor',
    'San Fernando',
    'Piping',
    'Sistema completo de tubería de vapor de alta presión y retorno de condensado.',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    '2024',
    false,
    true,
    4
  ),
  (
    'Fabricación de tolva y rampa acero inoxidable',
    'fabricacion-tolva-rampa',
    'Backus',
    'Estructuras Metálicas',
    'Fabricación e instalación de tolva industrial en acero inoxidable 304.',
    'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=800&h=600&fit=crop',
    '2023',
    true,
    true,
    5
  ),
  (
    'Señalización industrial FAMESA',
    'senalizacion-famesa',
    'FAMESA',
    'Señalización',
    'Sistema completo de señalización industrial según normativa de seguridad.',
    'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=800&h=600&fit=crop',
    '2024',
    false,
    true,
    6
  )
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- Storage Bucket para imágenes
-- Nota: Crear manualmente en Supabase Dashboard
-- Storage > New Bucket > Name: "images" > Public: true
-- =============================================
