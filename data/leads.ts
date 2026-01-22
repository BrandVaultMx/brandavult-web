export interface Lead {
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

export const leads: Lead[] = [
  {
    expediente: "1802681",
    marca: "REYMA MARIEL",
    titular: "VICENTE REYES MAGAÑA",
    firstName: "VICENTE",
    fechaRegistro: "2023-01-04",
    fechaLimite: "2026-04-04",
    diasRestantes: 73,
    score: 85,
    urgencia: "ALTA"
  },
  {
    expediente: "1233929",
    marca: "CONEXION DF",
    titular: "MARIA GONZALEZ",
    firstName: "MARIA",
    fechaRegistro: "2023-01-15",
    fechaLimite: "2026-04-15",
    diasRestantes: 84,
    score: 82,
    urgencia: "ALTA"
  },
  // Más leads se agregarán aquí cuando el scraper termine
]

export function getLeadByExpediente(expediente: string): Lead | undefined {
  return leads.find(lead => lead.expediente === expediente)
}

export function getAllExpedientes(): string[] {
  return leads.map(lead => lead.expediente)
}
