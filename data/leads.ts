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
  {
    expediente: "1327581",
    marca: "DIZAO",
    titular: "ROBERTO SANCHEZ",
    firstName: "ROBERTO",
    fechaRegistro: "2023-01-22",
    fechaLimite: "2026-04-22",
    diasRestantes: 91,
    score: 78,
    urgencia: "ALTA"
  },
  {
    expediente: "1327583",
    marca: "TECH SOLUTIONS MX",
    titular: "CARLOS MENDEZ",
    firstName: "CARLOS",
    fechaRegistro: "2023-02-01",
    fechaLimite: "2026-05-01",
    diasRestantes: 100,
    score: 75,
    urgencia: "MEDIA"
  },
  {
    expediente: "1456789",
    marca: "CAFÉ ORIGEN",
    titular: "ANA PATRICIA RUIZ",
    firstName: "ANA",
    fechaRegistro: "2023-02-10",
    fechaLimite: "2026-05-10",
    diasRestantes: 109,
    score: 72,
    urgencia: "MEDIA"
  },
  {
    expediente: "1567890",
    marca: "MODA URBANA",
    titular: "LUIS FERNANDO TORRES",
    firstName: "LUIS",
    fechaRegistro: "2023-02-15",
    fechaLimite: "2026-05-15",
    diasRestantes: 114,
    score: 70,
    urgencia: "MEDIA"
  },
  {
    expediente: "1678901",
    marca: "DULCE TENTACIÓN",
    titular: "PATRICIA HERNANDEZ",
    firstName: "PATRICIA",
    fechaRegistro: "2023-02-20",
    fechaLimite: "2026-05-20",
    diasRestantes: 119,
    score: 68,
    urgencia: "MEDIA"
  },
  {
    expediente: "1789012",
    marca: "SERVICIOS DELTA",
    titular: "JORGE ALBERTO LUNA",
    firstName: "JORGE",
    fechaRegistro: "2023-03-01",
    fechaLimite: "2026-06-01",
    diasRestantes: 131,
    score: 65,
    urgencia: "MEDIA"
  },
  {
    expediente: "1890123",
    marca: "NATURAL LIFE",
    titular: "GABRIELA MARTINEZ",
    firstName: "GABRIELA",
    fechaRegistro: "2023-03-10",
    fechaLimite: "2026-06-10",
    diasRestantes: 140,
    score: 62,
    urgencia: "MEDIA"
  },
  {
    expediente: "1901234",
    marca: "AUTO PARTS PRO",
    titular: "FERNANDO DIAZ",
    firstName: "FERNANDO",
    fechaRegistro: "2023-03-15",
    fechaLimite: "2026-06-15",
    diasRestantes: 145,
    score: 60,
    urgencia: "BAJA"
  },
  {
    expediente: "2012345",
    marca: "BEAUTY SALON MX",
    titular: "CLAUDIA RAMIREZ",
    firstName: "CLAUDIA",
    fechaRegistro: "2023-03-20",
    fechaLimite: "2026-06-20",
    diasRestantes: 150,
    score: 58,
    urgencia: "BAJA"
  },
  {
    expediente: "2123456",
    marca: "CONSTRUCTORA NORTE",
    titular: "MIGUEL ANGEL VAZQUEZ",
    firstName: "MIGUEL",
    fechaRegistro: "2023-03-25",
    fechaLimite: "2026-06-25",
    diasRestantes: 155,
    score: 55,
    urgencia: "BAJA"
  },
  {
    expediente: "2234567",
    marca: "FARMACIA SALUD",
    titular: "ROSA ELENA CASTRO",
    firstName: "ROSA",
    fechaRegistro: "2023-04-01",
    fechaLimite: "2026-07-01",
    diasRestantes: 161,
    score: 52,
    urgencia: "BAJA"
  },
  {
    expediente: "2345678",
    marca: "SPORT ZONE",
    titular: "DAVID ALEJANDRO PENA",
    firstName: "DAVID",
    fechaRegistro: "2023-04-05",
    fechaLimite: "2026-07-05",
    diasRestantes: 165,
    score: 50,
    urgencia: "BAJA"
  },
  {
    expediente: "2456789",
    marca: "TECH INNOVA",
    titular: "SANDRA LOPEZ",
    firstName: "SANDRA",
    fechaRegistro: "2023-04-10",
    fechaLimite: "2026-07-10",
    diasRestantes: 170,
    score: 48,
    urgencia: "BAJA"
  },
  {
    expediente: "2567890",
    marca: "DELICIAS GOURMET",
    titular: "RICARDO MORALES",
    firstName: "RICARDO",
    fechaRegistro: "2023-04-15",
    fechaLimite: "2026-07-15",
    diasRestantes: 175,
    score: 45,
    urgencia: "BAJA"
  }
]

export function getLeadByExpediente(expediente: string): Lead | undefined {
  return leads.find(lead => lead.expediente === expediente)
}

export function getAllExpedientes(): string[] {
  return leads.map(lead => lead.expediente)
}
