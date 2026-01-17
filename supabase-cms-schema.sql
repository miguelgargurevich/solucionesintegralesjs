-- =============================================
-- CMS COMPLETO - Esquema de Base de Datos
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- =============================================

-- =============================================
-- 1. CONFIGURACIÓN DEL SITIO (Branding)
-- =============================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(100) NOT NULL UNIQUE,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar configuración por defecto
INSERT INTO site_settings (key, value) VALUES
  ('branding', '{
    "companyName": "SOLUCIONES INTEGRALES JS S.A.C.",
    "tagline": "Ingeniería Industrial de Excelencia",
    "logo": "/logo.svg",
    "favicon": "/favicon.ico"
  }'::jsonb),
  ('colors', '{
    "primary": "#0056A6",
    "primaryLight": "#0066CC",
    "primaryDark": "#004080",
    "secondary": "#FFB800",
    "secondaryLight": "#FFC933",
    "secondaryDark": "#CC9300",
    "accent": "#FF6B35",
    "background": "#1A1D23",
    "backgroundLight": "#22252C",
    "textPrimary": "#FFFFFF",
    "textSecondary": "#D7D8DA"
  }'::jsonb),
  ('contact', '{
    "phone": "+51 953 951 268",
    "email": "contacto@solucionesintegralesjs.com",
    "address": "Av. Las Gaviotas 2121, Santiago de Surco, Lima, Perú",
    "ruc": "20123456789",
    "coordinates": {"lat": -12.1328, "lng": -76.9908}
  }'::jsonb),
  ('social_media', '{
    "linkedin": "https://linkedin.com/company/soluciones-integrales-js",
    "facebook": "https://facebook.com/solucionesintegralesjs",
    "instagram": "https://instagram.com/solucionesintegralesjs",
    "youtube": "",
    "whatsapp": "+51953951268"
  }'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- =============================================
-- 2. NAVEGACIÓN (Header)
-- =============================================
CREATE TABLE IF NOT EXISTS navigation (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  href VARCHAR(200) NOT NULL,
  order_index INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT TRUE,
  is_cta BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar navegación por defecto
INSERT INTO navigation (label, href, order_index, visible, is_cta) VALUES
  ('Inicio', '#inicio', 1, true, false),
  ('Nosotros', '#nosotros', 2, true, false),
  ('Servicios', '#servicios', 3, true, false),
  ('Proyectos', '#proyectos', 4, true, false),
  ('Clientes', '#clientes', 5, true, false),
  ('Contacto', '#contacto', 6, true, true)
ON CONFLICT DO NOTHING;

-- =============================================
-- 3. SECCIÓN HERO
-- =============================================
CREATE TABLE IF NOT EXISTS hero_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  subtitle VARCHAR(300),
  description TEXT,
  cta_primary_text VARCHAR(100),
  cta_primary_href VARCHAR(200),
  cta_secondary_text VARCHAR(100),
  cta_secondary_href VARCHAR(200),
  background_type VARCHAR(20) DEFAULT 'video', -- 'video', 'image', '3d'
  background_url TEXT,
  show_3d_scene BOOLEAN DEFAULT TRUE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar contenido hero por defecto
INSERT INTO hero_content (title, subtitle, description, cta_primary_text, cta_primary_href, cta_secondary_text, cta_secondary_href, background_type, show_3d_scene, active) VALUES
  (
    'SOLUCIONES INTEGRALES',
    'Ingeniería Industrial de Excelencia',
    'Transformamos ideas en estructuras sólidas. Más de 15 años brindando soluciones de ingeniería que impulsan el crecimiento industrial del Perú.',
    'Ver Proyectos',
    '#proyectos',
    'Contáctanos',
    '#contacto',
    '3d',
    true,
    true
  )
ON CONFLICT DO NOTHING;

-- =============================================
-- 4. SECCIÓN NOSOTROS (About)
-- =============================================
CREATE TABLE IF NOT EXISTS about_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  subtitle VARCHAR(300),
  description TEXT NOT NULL,
  mission TEXT,
  vision TEXT,
  video_url TEXT,
  video_thumbnail TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Estadísticas de la empresa
CREATE TABLE IF NOT EXISTS about_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  icon VARCHAR(50) NOT NULL, -- nombre del icono de Lucide
  value VARCHAR(50) NOT NULL,
  label VARCHAR(100) NOT NULL,
  order_index INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar contenido about por defecto
INSERT INTO about_content (title, subtitle, description, mission, vision, video_url, active) VALUES
  (
    'Quiénes Somos',
    'Más de 15 años de experiencia',
    'Somos una empresa peruana especializada en servicios de ingeniería, proyectos civiles, estructuras metálicas, piping, montaje industrial y mantenimiento. Nuestro compromiso es brindar soluciones integrales que superen las expectativas de nuestros clientes.',
    'Brindar soluciones de ingeniería integral con los más altos estándares de calidad, seguridad y eficiencia, contribuyendo al desarrollo industrial del Perú.',
    'Ser reconocidos como la empresa líder en servicios de ingeniería industrial en el Perú, destacando por nuestra excelencia técnica y compromiso con la innovación.',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    true
  )
ON CONFLICT DO NOTHING;

-- Insertar estadísticas por defecto
INSERT INTO about_stats (icon, value, label, order_index, visible) VALUES
  ('Building2', '200+', 'Proyectos Realizados', 1, true),
  ('Users', '50+', 'Clientes Satisfechos', 2, true),
  ('Award', '15+', 'Años de Experiencia', 3, true),
  ('Clock', '24/7', 'Soporte Técnico', 4, true)
ON CONFLICT DO NOTHING;

-- =============================================
-- 5. SERVICIOS
-- =============================================
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL,
  features TEXT[] DEFAULT '{}',
  image TEXT,
  order_index INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar servicios por defecto
INSERT INTO services (title, slug, description, icon, features, order_index, visible) VALUES
  (
    'Estructuras Metálicas',
    'estructuras-metalicas',
    'Diseño, fabricación y montaje de estructuras metálicas para naves industriales, almacenes y edificaciones comerciales.',
    'building',
    ARRAY['Diseño estructural', 'Fabricación en planta', 'Montaje especializado', 'Certificación de calidad'],
    1,
    true
  ),
  (
    'Piping Industrial',
    'piping-industrial',
    'Sistemas completos de tuberías para transporte de fluidos, vapor, gases y productos químicos.',
    'pipe',
    ARRAY['Tuberías de proceso', 'Vapor y condensado', 'Sistemas de refrigeración', 'Pruebas hidrostáticas'],
    2,
    true
  ),
  (
    'Señalización Industrial',
    'senalizacion-industrial',
    'Implementación de sistemas de señalización según normativas de seguridad industrial.',
    'alert-triangle',
    ARRAY['Señales de seguridad', 'Demarcación de áreas', 'Señalización vial', 'Normativa OSHA'],
    3,
    true
  ),
  (
    'Obras Civiles',
    'obras-civiles',
    'Construcción y remodelación de infraestructura civil para instalaciones industriales.',
    'hard-hat',
    ARRAY['Cimentaciones', 'Pisos industriales', 'Trincheras', 'Remodelaciones'],
    4,
    true
  ),
  (
    'Montaje Industrial',
    'montaje-industrial',
    'Montaje y desmontaje de equipos industriales, maquinaria y líneas de producción.',
    'cog',
    ARRAY['Montaje de equipos', 'Alineamiento', 'Izaje especializado', 'Desmontaje técnico'],
    5,
    true
  ),
  (
    'Tanques y Tuberías',
    'tanques-tuberias',
    'Fabricación e instalación de tanques de almacenamiento y sistemas de tuberías especializados.',
    'cylinder',
    ARRAY['Tanques atmosféricos', 'Recipientes a presión', 'Tuberías especiales', 'Recubrimientos'],
    6,
    true
  ),
  (
    'Mantenimiento Industrial',
    'mantenimiento-industrial',
    'Servicios de mantenimiento preventivo y correctivo para instalaciones industriales.',
    'wrench',
    ARRAY['Mantenimiento preventivo', 'Reparaciones', 'Paradas de planta', 'Emergencias 24/7'],
    7,
    true
  ),
  (
    'Ingeniería Estructural',
    'ingenieria-estructural',
    'Servicios de diseño y cálculo estructural para proyectos industriales y comerciales.',
    'drafting-compass',
    ARRAY['Cálculo estructural', 'Planos de fabricación', 'Memorias de cálculo', 'Supervisión técnica'],
    8,
    true
  )
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- 6. CLIENTES
-- =============================================
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  logo TEXT,
  website TEXT,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar clientes por defecto
INSERT INTO clients (name, slug, logo, order_index, visible, featured) VALUES
  ('Goodyear', 'goodyear', '/clients/goodyear.svg', 1, true, true),
  ('Lima Caucho', 'lima-caucho', '/clients/lima-caucho.svg', 2, true, true),
  ('Ransa', 'ransa', '/clients/ransa.svg', 3, true, true),
  ('Frenosa', 'frenosa', '/clients/frenosa.svg', 4, true, false),
  ('FAMESA', 'famesa', '/clients/famesa.svg', 5, true, true),
  ('San Fernando', 'san-fernando', '/clients/san-fernando.svg', 6, true, true),
  ('Forus', 'forus', '/clients/forus.svg', 7, true, false),
  ('Mexichem', 'mexichem', '/clients/mexichem.svg', 8, true, false),
  ('Backus', 'backus', '/clients/backus.svg', 9, true, true),
  ('Pieriplast', 'pieriplast', '/clients/pieriplast.svg', 10, true, false)
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- 7. CONTENIDO DEL FOOTER
-- =============================================
CREATE TABLE IF NOT EXISTS footer_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section VARCHAR(100) NOT NULL, -- 'servicios', 'empresa', 'legal'
  label VARCHAR(100) NOT NULL,
  href VARCHAR(200) NOT NULL,
  order_index INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT TRUE,
  open_in_new_tab BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar links del footer por defecto
INSERT INTO footer_links (section, label, href, order_index, visible) VALUES
  ('servicios', 'Estructuras Metálicas', '#servicios', 1, true),
  ('servicios', 'Piping Industrial', '#servicios', 2, true),
  ('servicios', 'Obras Civiles', '#servicios', 3, true),
  ('servicios', 'Montaje Industrial', '#servicios', 4, true),
  ('empresa', 'Nosotros', '#nosotros', 1, true),
  ('empresa', 'Proyectos', '#proyectos', 2, true),
  ('empresa', 'Clientes', '#clientes', 3, true),
  ('empresa', 'Contacto', '#contacto', 4, true),
  ('legal', 'Política de Privacidad', '/privacidad', 1, true),
  ('legal', 'Términos y Condiciones', '/terminos', 2, true)
ON CONFLICT DO NOTHING;

-- =============================================
-- 8. SECCIONES (Configuración de visibilidad)
-- =============================================
CREATE TABLE IF NOT EXISTS sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(200),
  subtitle VARCHAR(300),
  visible BOOLEAN DEFAULT TRUE,
  order_index INTEGER DEFAULT 0,
  settings JSONB DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar secciones por defecto
INSERT INTO sections (name, title, subtitle, visible, order_index) VALUES
  ('hero', 'Hero', 'Sección principal', true, 1),
  ('about', 'Quiénes Somos', 'Conoce nuestra historia', true, 2),
  ('services', 'Nuestros Servicios', 'Soluciones integrales para la industria', true, 3),
  ('projects', 'Proyectos', 'Nuestro trabajo habla por nosotros', true, 4),
  ('clients', 'Clientes', 'Confían en nosotros', true, 5),
  ('contact', 'Contacto', 'Estamos para ayudarte', true, 6)
ON CONFLICT (name) DO NOTHING;

-- =============================================
-- ÍNDICES
-- =============================================
CREATE INDEX IF NOT EXISTS idx_navigation_order ON navigation(order_index);
CREATE INDEX IF NOT EXISTS idx_navigation_visible ON navigation(visible);
CREATE INDEX IF NOT EXISTS idx_services_order ON services(order_index);
CREATE INDEX IF NOT EXISTS idx_services_visible ON services(visible);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_clients_order ON clients(order_index);
CREATE INDEX IF NOT EXISTS idx_clients_visible ON clients(visible);
CREATE INDEX IF NOT EXISTS idx_clients_slug ON clients(slug);
CREATE INDEX IF NOT EXISTS idx_footer_links_section ON footer_links(section);
CREATE INDEX IF NOT EXISTS idx_about_stats_order ON about_stats(order_index);
CREATE INDEX IF NOT EXISTS idx_sections_name ON sections(name);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública
CREATE POLICY "site_settings_read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "navigation_read" ON navigation FOR SELECT USING (visible = true);
CREATE POLICY "hero_content_read" ON hero_content FOR SELECT USING (active = true);
CREATE POLICY "about_content_read" ON about_content FOR SELECT USING (active = true);
CREATE POLICY "about_stats_read" ON about_stats FOR SELECT USING (visible = true);
CREATE POLICY "services_read" ON services FOR SELECT USING (visible = true);
CREATE POLICY "clients_read" ON clients FOR SELECT USING (visible = true);
CREATE POLICY "footer_links_read" ON footer_links FOR SELECT USING (visible = true);
CREATE POLICY "sections_read" ON sections FOR SELECT USING (true);

-- Políticas de escritura para admin (usando service_role key)
-- Nota: El acceso de escritura se maneja via service_role key en el backend

-- =============================================
-- FUNCIÓN PARA ACTUALIZAR updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_navigation_updated_at ON navigation;
CREATE TRIGGER update_navigation_updated_at BEFORE UPDATE ON navigation FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_hero_content_updated_at ON hero_content;
CREATE TRIGGER update_hero_content_updated_at BEFORE UPDATE ON hero_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_about_content_updated_at ON about_content;
CREATE TRIGGER update_about_content_updated_at BEFORE UPDATE ON about_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_services_updated_at ON services;
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_clients_updated_at ON clients;
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_sections_updated_at ON sections;
CREATE TRIGGER update_sections_updated_at BEFORE UPDATE ON sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
