/**
 * Script para convertir CSV de leads del scraper a TypeScript
 * 
 * Uso:
 * 1. Coloca tu archivo leads.csv en la raíz del proyecto
 * 2. Ejecuta: node scripts/csv-to-ts.js
 * 3. El archivo data/leads.ts será actualizado
 */

const fs = require('fs');
const path = require('path');

// Configuración
const CSV_PATH = path.join(__dirname, '..', 'leads.csv');
const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'leads.ts');

// Función para parsear CSV
function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  
  return lines.slice(1).map(line => {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });
    return obj;
  });
}

// Función para determinar urgencia
function getUrgencia(diasRestantes) {
  if (diasRestantes <= 30) return 'CRÍTICA';
  if (diasRestantes <= 90) return 'ALTA';
  if (diasRestantes <= 150) return 'MEDIA';
  return 'BAJA';
}

// Función para extraer primer nombre
function getFirstName(titular) {
  const parts = titular.split(' ');
  return parts[0] || '';
}

// Generar contenido TypeScript
function generateTypeScript(leads) {
  const leadsArray = leads.map(lead => {
    const diasRestantes = parseInt(lead.dias_restantes) || parseInt(lead.diasRestantes) || 0;
    const expediente = lead.expediente || lead.Expediente || '';
    const marca = lead.marca || lead.Marca || '';
    const titular = lead.titular || lead.Titular || lead.company_name || '';
    const fechaRegistro = lead.fecha_registro || lead.fechaRegistro || '';
    const fechaLimite = lead.fecha_limite || lead.fechaLimite || '';
    const score = parseInt(lead.score) || 50;
    
    return {
      expediente: expediente.toString(),
      marca: marca.toUpperCase(),
      titular: titular.toUpperCase(),
      firstName: getFirstName(titular).toUpperCase(),
      fechaRegistro,
      fechaLimite,
      diasRestantes,
      score,
      urgencia: getUrgencia(diasRestantes)
    };
  });

  return `export interface Lead {
  expediente: string
  marca: string
  titular: string
  firstName: string
  fechaRegistro: string
  fechaLimite: string
  diasRestantes: number
  score: number
  urgencia: 'CRÍTICA' | 'ALTA' | 'MEDIA' | 'BAJA'
}

export const leads: Lead[] = ${JSON.stringify(leadsArray, null, 2)}

export function getLeadByExpediente(expediente: string): Lead | undefined {
  return leads.find(lead => lead.expediente === expediente)
}

export function getAllExpedientes(): string[] {
  return leads.map(lead => lead.expediente)
}
`;
}

// Main
function main() {
  console.log('🔄 Convirtiendo CSV a TypeScript...\n');
  
  // Verificar que existe el CSV
  if (!fs.existsSync(CSV_PATH)) {
    console.error('❌ Error: No se encontró el archivo leads.csv');
    console.log('   Coloca el archivo en la raíz del proyecto y vuelve a ejecutar.\n');
    process.exit(1);
  }
  
  // Leer y parsear CSV
  const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
  const leads = parseCSV(csvContent);
  
  console.log(`📊 Leads encontrados: ${leads.length}`);
  
  // Generar TypeScript
  const tsContent = generateTypeScript(leads);
  
  // Asegurar que existe el directorio
  const dataDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Escribir archivo
  fs.writeFileSync(OUTPUT_PATH, tsContent);
  
  console.log(`✅ Archivo generado: data/leads.ts`);
  console.log(`\n📝 Resumen:`);
  console.log(`   - Total leads: ${leads.length}`);
  
  // Contar por urgencia
  const byUrgency = leads.reduce((acc, lead) => {
    const dias = parseInt(lead.dias_restantes) || parseInt(lead.diasRestantes) || 0;
    const urgencia = getUrgencia(dias);
    acc[urgencia] = (acc[urgencia] || 0) + 1;
    return acc;
  }, {});
  
  Object.entries(byUrgency).forEach(([urgencia, count]) => {
    console.log(`   - ${urgencia}: ${count}`);
  });
  
  console.log('\n🚀 ¡Listo! Ahora haz deploy para ver los reportes actualizados.');
}

main();
