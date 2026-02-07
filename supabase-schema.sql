-- ============================================
-- BrandVault.mx — Schema de Leads
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- Tabla principal de leads
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT,
  telefono TEXT,
  marca TEXT NOT NULL,
  servicio TEXT NOT NULL DEFAULT 'diagnostico_ia',
  fuente TEXT DEFAULT 'hero',
  status TEXT DEFAULT 'nuevo',
  notas TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para búsquedas rápidas
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_servicio ON leads(servicio);
CREATE INDEX idx_leads_created ON leads(created_at DESC);

-- Trigger para updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- RLS (Row Level Security) — permitir inserts desde la API
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: el service role puede hacer todo (tu API route usa service role key)
CREATE POLICY "Service role full access"
  ON leads
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Vista para contador de marcas analizadas (para el futuro ticker)
CREATE VIEW leads_stats AS
SELECT
  COUNT(*) as total_leads,
  COUNT(CASE WHEN servicio = 'diagnostico_ia' THEN 1 END) as diagnosticos_ia,
  COUNT(CASE WHEN servicio = 'blindaje' THEN 1 END) as blindajes,
  COUNT(CASE WHEN servicio = 'diagnostico' THEN 1 END) as diagnosticos,
  COUNT(CASE WHEN servicio = 'declaracion' THEN 1 END) as declaraciones,
  COUNT(CASE WHEN status = 'nuevo' THEN 1 END) as nuevos,
  COUNT(CASE WHEN status = 'contactado' THEN 1 END) as contactados,
  COUNT(CASE WHEN status = 'cerrado' THEN 1 END) as cerrados
FROM leads;
