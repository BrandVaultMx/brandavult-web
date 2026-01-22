/**
 * Convierte CSV de leads a TypeScript
 * 
 * Uso:
 * 1. Coloca leads.csv en la raíz
 * 2. Ejecuta: node scripts/csv-to-ts.js
 */

const fs = require('fs');
const path = require('path');

const CSV_PATH = path.join(__dirname, '..', 'leads.csv');
const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'leads.ts');

function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  
  return lines.slice(1).map(line => {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let char of line) {
      if (char === '"') inQuotes = !inQuotes;
      else if (char === ',' && !inQuotes) { values.push(current.trim()); current = ''; }
      else current += char;
    }
    values.push(current.trim());
    
    const obj = {};
    headers.forEach((h, i) => obj[h] = values[i] || '');
    return obj;
  });
}

function getUrgencia(dias) {
  if (dias <= 30) return 'CRÍTICA';
  if (dias <= 90) return 'ALTA';
  if (dias <= 150) return 'MEDIA';
  return 'BAJA';
}

function generateTS(leads) {
  const arr = leads.map(l => ({
    expediente: (l.expediente || l.Expediente || '').toString(),
    marca: (l.marca || l.Marca || '').toUpperCase(),
    titular: (l.titular || l.Titular || l.company_name || '').toUpperCase(),
    firstName: (l.titular || l.Titular || '').split(' ')[0].toUpperCase(),
    fechaRegistro: l.fecha_registro || l.fechaRegistro || '',
    fechaLimite: l.fecha_limite || l.fechaLimite || '',
    diasRestantes: parseInt(l.dias_restantes || l.diasRestantes) || 0,
    score: parseInt(l.score) || 50,
    urgencia: getUrgencia(parseInt(l.dias_restantes || l.diasRestantes) || 0)
  }));

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

export const leads: Lead[] = ${JSON.stringify(arr, null, 2)}

export function getLeadByExpediente(expediente: string): Lead | undefined {
  return leads.find(lead => lead.expediente === expediente)
}

export function getAllExpedientes(): string[] {
  return leads.map(lead => lead.expediente)
}
`;
}

function main() {
  console.log('🔄 Convirtiendo CSV a TypeScript...\n');
  
  if (!fs.existsSync(CSV_PATH)) {
    console.error('❌ No se encontró leads.csv en la raíz del proyecto');
    process.exit(1);
  }
  
  const csv = fs.readFileSync(CSV_PATH, 'utf-8');
  const leads = parseCSV(csv);
  const ts = generateTS(leads);
  
  const dir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  fs.writeFileSync(OUTPUT_PATH, ts);
  
  console.log(`✅ Generado: data/leads.ts`);
  console.log(`📊 Total leads: ${leads.length}`);
  console.log('\n🚀 Ahora haz deploy para ver los reportes.');
}

main();
