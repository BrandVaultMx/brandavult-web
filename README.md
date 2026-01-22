# BrandVault.mx - Sitio Web Oficial

Plataforma de protección de marcas en México con sistema de reportes dinámicos para campañas de cold email.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel
- **TypeScript:** Sí

## Estructura

```
brandvault-site/
├── app/
│   ├── globals.css         # Estilos globales
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Landing page (/)
│   └── marca/
│       └── [expediente]/
│           ├── page.tsx    # Página de reporte (/marca/1802681)
│           └── not-found.tsx
├── data/
│   └── leads.ts            # Datos del scraper
├── public/
│   └── logo.png            # Logo del león
├── package.json
├── tailwind.config.js
└── next.config.js
```

## Instalación Local

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar tu logo.png a /public/logo.png

# 3. Ejecutar en desarrollo
npm run dev

# 4. Abrir http://localhost:3000
```

## Deploy a Vercel

### Opción A: Desde GitHub (Recomendado)

1. Sube este código a tu repo de GitHub (brandvault.mx)
2. Ve a [vercel.com](https://vercel.com)
3. Importa el proyecto desde GitHub
4. Vercel detecta Next.js automáticamente
5. Click "Deploy"

### Opción B: Reemplazar código existente

1. Borra todo el contenido de tu repo actual
2. Copia todos estos archivos
3. Commit y push a GitHub
4. Vercel re-desplegará automáticamente

## URLs

- **Landing:** `brandvault.mx`
- **Reportes:** `brandvault.mx/marca/[expediente]`

Ejemplos:
- https://brandvault.mx/marca/1802681 → REYMA MARIEL
- https://brandvault.mx/marca/1327583 → CONEXION DF

## Actualizar Leads

Cuando corras el scraper con nuevos datos:

1. Genera el CSV con el scraper
2. Convierte a TypeScript usando el script incluido
3. Reemplaza el contenido de `data/leads.ts`
4. Commit y push → Vercel re-despliega automáticamente

### Formato requerido en leads.ts

```typescript
export const leads: Record<string, Lead> = {
  "EXPEDIENTE": {
    expediente: "EXPEDIENTE",
    marca: "NOMBRE MARCA",
    titular: "TITULAR",
    firstName: "NOMBRE",
    fechaRegistro: "DD/MM/YYYY",
    fechaLimite: "DD/MM/YYYY",
    diasRestantes: 73,
    score: 55,
    urgencia: "IMPORTANTE"
  },
  // ... más leads
}
```

## Secuencia de Emails

Los emails de Instantly deben usar el link:

```
brandvault.mx/marca/{{expediente}}
```

Variables disponibles:
- `{{expediente}}` - Número de expediente
- `{{marca}}` - Nombre de la marca
- `{{dias_restantes}}` - Días hasta vencimiento
- `{{fecha_limite}}` - Fecha límite

## Personalización

### Colores (tailwind.config.js)
- `gold-400: #D4AF37` - Dorado principal
- `vault-black: #050505` - Negro base

### WhatsApp/Calendly
Editar en:
- `app/page.tsx` - Landing principal
- `app/marca/[expediente]/page.tsx` - Reportes

### Logo
Reemplazar `public/logo.png`

## Notas

- El sitio está optimizado para conversión
- Los reportes se generan estáticamente (rápidos)
- Tracking de analytics se puede agregar después
- Compatible con mobile
