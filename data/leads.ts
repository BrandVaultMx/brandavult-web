// Datos de leads extraídos del scraper MARCIA
// Actualizar este archivo cada vez que se corra el scraper

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

export const leads: Record<string, Lead> = {
  "1802681": {
    expediente: "1802681",
    marca: "REYMA MARIEL",
    titular: "VICENTE REYES MAGAÑA",
    firstName: "Vicente",
    fechaRegistro: "04/01/2023",
    fechaLimite: "4/4/2026",
    diasRestantes: 73,
    score: 55,
    urgencia: "IMPORTANTE"
  },
  "1831568": {
    expediente: "1831568",
    marca: "IN LIVING EDUCATION",
    titular: "EFRAIN GUTIERREZ Y RODRIGUEZ",
    firstName: "Efrain",
    fechaRegistro: "03/01/2023",
    fechaLimite: "3/4/2026",
    diasRestantes: 72,
    score: 55,
    urgencia: "IMPORTANTE"
  },
  "1955086": {
    expediente: "1955086",
    marca: "ROYAL BARBER",
    titular: "ROMAN HORACIO MELCHOR AVALOS, RIGOBERTO MELCHOR AVALOS",
    firstName: "Roman",
    fechaRegistro: "03/01/2023",
    fechaLimite: "3/4/2026",
    diasRestantes: 72,
    score: 55,
    urgencia: "IMPORTANTE"
  },
  "1327581": {
    expediente: "1327581",
    marca: "CONEXIÓN",
    titular: "DIEGO ORTIZ RAMOS",
    firstName: "Diego",
    fechaRegistro: "20/02/2023",
    fechaLimite: "20/5/2026",
    diasRestantes: 119,
    score: 45,
    urgencia: "PREVENTIVO"
  },
  "1327583": {
    expediente: "1327583",
    marca: "CONEXION DF",
    titular: "DIEGO ORTIZ RAMOS",
    firstName: "Diego",
    fechaRegistro: "20/02/2023",
    fechaLimite: "20/5/2026",
    diasRestantes: 119,
    score: 45,
    urgencia: "PREVENTIVO"
  },
  "1341265": {
    expediente: "1341265",
    marca: "CONEXIONQRO",
    titular: "DIEGO ORTIZ RAMOS",
    firstName: "Diego",
    fechaRegistro: "20/02/2023",
    fechaLimite: "20/5/2026",
    diasRestantes: 119,
    score: 45,
    urgencia: "PREVENTIVO"
  },
  "1341268": {
    expediente: "1341268",
    marca: "CONEXIONMX",
    titular: "DIEGO ORTIZ RAMOS",
    firstName: "Diego",
    fechaRegistro: "20/02/2023",
    fechaLimite: "20/5/2026",
    diasRestantes: 119,
    score: 45,
    urgencia: "PREVENTIVO"
  },
  "1341273": {
    expediente: "1341273",
    marca: "CONEXIONPUEBLA",
    titular: "DIEGO ORTIZ RAMOS",
    firstName: "Diego",
    fechaRegistro: "20/02/2023",
    fechaLimite: "20/5/2026",
    diasRestantes: 119,
    score: 45,
    urgencia: "PREVENTIVO"
  },
  "1711738": {
    expediente: "1711738",
    marca: "CONEXION GDL",
    titular: "DIEGO ORTIZ RAMOS",
    firstName: "Diego",
    fechaRegistro: "20/02/2023",
    fechaLimite: "20/5/2026",
    diasRestantes: 119,
    score: 45,
    urgencia: "PREVENTIVO"
  },
  "1763537": {
    expediente: "1763537",
    marca: "ENCUENTRO EMPRESA UNIVERSIDAD UGC",
    titular: "IRMA YOLANDA RAZO ABUNDIS",
    firstName: "Irma",
    fechaRegistro: "27/03/2023",
    fechaLimite: "27/6/2026",
    diasRestantes: 157,
    score: 35,
    urgencia: "PREVENTIVO"
  },
  "1233929": {
    expediente: "1233929",
    marca: "DIZAO",
    titular: "COMERCIALIZADORA SITRI, S.A. DE C.V.",
    firstName: "",
    fechaRegistro: "17/01/2023",
    fechaLimite: "17/4/2026",
    diasRestantes: 86,
    score: 30,
    urgencia: "IMPORTANTE"
  },
  "1983273": {
    expediente: "1983273",
    marca: "SANTO TOMAS",
    titular: "ELIAS PANDO, S.A. DE C.V.",
    firstName: "",
    fechaRegistro: "20/01/2023",
    fechaLimite: "20/4/2026",
    diasRestantes: 89,
    score: 30,
    urgencia: "IMPORTANTE"
  },
  "1363114": {
    expediente: "1363114",
    marca: "PRIMARK",
    titular: "ADMINISTRADORA DE MARCAS Y FRANQUICIAS S.A. DE C.V.",
    firstName: "",
    fechaRegistro: "26/01/2023",
    fechaLimite: "26/4/2026",
    diasRestantes: 95,
    score: 20,
    urgencia: "PREVENTIVO"
  },
  "1973028": {
    expediente: "1973028",
    marca: "INCUSUR",
    titular: "UNIVERSIDAD TECNOLÓGICA DEL SUR S.C.",
    firstName: "",
    fechaRegistro: "10/02/2023",
    fechaLimite: "10/5/2026",
    diasRestantes: 109,
    score: 20,
    urgencia: "PREVENTIVO"
  },
  "1401929": {
    expediente: "1401929",
    marca: "CENTRO CULTURAL UNIVERSITARIO JUSTO SIERRA",
    titular: "CENTRO CULTURAL UNIVERSITARIO JUSTO SIERRA, A.C.",
    firstName: "",
    fechaRegistro: "22/02/2023",
    fechaLimite: "22/5/2026",
    diasRestantes: 121,
    score: 10,
    urgencia: "PREVENTIVO"
  },
  "1862134": {
    expediente: "1862134",
    marca: "HILLSTONE",
    titular: "RESTAURANTES TOKS, S.A. DE C.V.",
    firstName: "",
    fechaRegistro: "23/02/2023",
    fechaLimite: "23/5/2026",
    diasRestantes: 122,
    score: 10,
    urgencia: "PREVENTIVO"
  }
}

export function getLead(expediente: string): Lead | null {
  return leads[expediente] || null
}

export function getAllExpedientes(): string[] {
  return Object.keys(leads)
}
