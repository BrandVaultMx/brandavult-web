/**
 * Convertidor CSV a TypeScript para BrandVault
 * 
 * Uso: node scripts/csv-to-ts.js input.csv
 * 
 * Genera el contenido para data/leads.ts
 */

const fs = require('fs');

const inputFile = process.argv[2];

if (!inputFile) {
  console.log('Uso: node csv-to-ts.js <archivo.csv>');
  process.exit(1);
}

// Leer CSV
const csvContent = fs.readFileSync(inputFile, 'utf-8');
const lines = csvContent.trim().split('\n');
const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());

// Parsear filas
const leads = {};

for (let i = 1; i < lines.length; i++) {
  // Parse CSV respetando comillas
  const values = lines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
  if (!values) continue;
  
  const cleanValues = values.map(v => v.replace(/^"|"$/g, '').trim());
  
  const row = {};
  headers.forEach((header, index) => {
    row[header] = cleanValues[index] || '';
  });
  
  const expediente = row.expediente;
  if (!expediente) continue;
  
  // Calcular fecha de registro aproximada
  let fechaRegistro = '';
  if (row.fecha_limite) {
    const parts = row.fecha_limite.split('/');
    if (parts.length === 3) {
      const fecha = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
      fecha.setFullYear(fecha.getFullYear() - 3);
      fecha.setMonth(fecha.getMonth() - 3);
      fechaRegistro = `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()}`;
    }
  }
  
  leads[expediente] = {
    expediente: expediente,
    marca: row.marca || `EXP-${expediente}`,
    titular: row.company_name || '',
    firstName: row.first_name || '',
    fechaRegistro: fechaRegistro,
    fechaLimite: row.fecha_limite || '',
    diasRestantes: parseInt(row.dias_restantes) || 0,
    score: parseInt(row.score) || 0,
    urgencia: row.urgencia || 'PREVENTIVO'
  };
}

// Generar TypeScript
let output = `// Datos de leads extraídos del scraper MARCIA
// Actualizado: ${new Date().toLocaleDateString('es-MX')}

export interface Lead {
  expediente: string
  marca: string
  titular: string
  firstName: string
  fechaRegistro: string
  fechaLimite: string
  diasRestantes: number
  score: number
  urgencia: 'CRÍTICO' | 'URGENTE' | 'IMPORTANTE' | 'PREVENTIVO'
}

export const leads: Record<string, Lead> = ${JSON.stringify(leads, null, 2)}

export function getLead(expediente: string): Lead | null {
  return leads[expediente] || null
}

export function getAllExpedientes(): string[] {
  return Object.keys(leads)
}
`;

// Corregir las comillas en urgencia
output = output.replace(/"urgencia": "([^"]+)"/g, 'urgencia: "$1"');

console.log('\\n// ===== COPIA DESDE AQUÍ =====\\n');
console.log(output);
console.log('\\n// ===== HASTA AQUÍ =====\\n');
console.log(`✅ ${Object.keys(leads).length} leads convertidos`);
console.log('Pega el contenido en data/leads.ts');
