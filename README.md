# BrandVault.mx - Landing Premium

Plataforma de protección de marcas en México con sistema de reportes dinámicos para campañas de cold email.

## 🚀 Stack Tecnológico

- **Framework:** Next.js 14 (App Router)
- **Animaciones:** Framer Motion
- **Estilos:** Tailwind CSS
- **Deploy:** Vercel
- **TypeScript:** Tipado estricto

## 📁 Estructura del Proyecto

```
brandvault-premium/
├── app/
│   ├── globals.css          # Estilos globales premium
│   ├── layout.tsx           # Layout con metadata SEO
│   ├── page.tsx             # Landing principal
│   └── marca/[expediente]/
│       ├── page.tsx         # Reportes dinámicos
│       └── not-found.tsx    # 404 elegante
├── components/
│   └── animations.tsx       # Componentes de animación
├── data/
│   └── leads.ts             # Datos de leads
├── scripts/
│   └── csv-to-ts.js         # Convertidor CSV → TypeScript
├── public/
│   └── logo.png             # Logo (agregar)
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🛠️ Instalación

### 1. Descomprimir y preparar

```bash
# Descomprime el ZIP en tu carpeta de proyectos
# Abre en tu editor (VS Code, Cursor)
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

Abre http://localhost:3000

## 📤 Deploy a Vercel

### Opción A: GitHub + Vercel (Recomendado)

1. **Sube a GitHub:**
```bash
git init
git add .
git commit -m "Landing premium BrandVault"
git remote add origin https://github.com/tu-usuario/brandvault-web.git
git push -u origin main
```

2. **En Vercel:**
   - Importa el repositorio
   - Framework Preset: **Next.js** (¡importante!)
   - Deploy

### Opción B: Vercel CLI

```bash
npm i -g vercel
vercel
```

## 🔄 Actualizar Leads

Cuando tengas nuevos leads del scraper:

1. **Coloca el CSV** en la raíz del proyecto:
```
brandvault-premium/
└── leads.csv    ← aquí
```

2. **Ejecuta el script:**
```bash
node scripts/csv-to-ts.js
```

3. **Haz deploy:**
```bash
git add .
git commit -m "Actualizar leads"
git push
```

Vercel detectará el cambio y hará deploy automático.

## 📊 Formato del CSV

El CSV del scraper debe tener estas columnas:

```csv
expediente,marca,titular,fecha_registro,fecha_limite,dias_restantes,score
1802681,REYMA MARIEL,VICENTE REYES,2023-01-04,2026-04-04,73,85
```

## 🎨 Personalización

### Colores (tailwind.config.js)

```js
colors: {
  gold: {
    400: '#D4AF37',  // Dorado principal
    500: '#B8962E',  // Dorado oscuro
  },
  vault: {
    black: '#030303',  // Negro profundo
    dark: '#0A0A0A',   // Negro suave
  }
}
```

### Links importantes

En `app/page.tsx` actualiza:

- **WhatsApp:** `522294641516`
- **Mercado Pago:** `https://mpago.la/2jfXZ5W`
- **Calendly:** `https://calendly.com/brandvault/15min`
- **Instagram:** `@brandvault.mx`

## ✅ Checklist Pre-Launch

- [ ] Logo en `/public/logo.png`
- [ ] Verificar links de WhatsApp
- [ ] Verificar link de Mercado Pago
- [ ] Verificar link de Calendly
- [ ] Actualizar datos de leads
- [ ] Probar en móvil
- [ ] Verificar Framework Preset = Next.js en Vercel

## 🐛 Troubleshooting

### Error 404 después de deploy

1. Ve a Vercel → Project → Settings → General
2. Verifica que **Framework Preset** sea "Next.js"
3. Haz Redeploy sin caché

### Animaciones no funcionan

Verifica que Framer Motion está instalado:
```bash
npm install framer-motion
```

### Build falla

```bash
# Limpia caché
rm -rf .next node_modules
npm install
npm run build
```

## 📞 Soporte

- **Email:** contacto@brandvault.mx
- **WhatsApp:** +52 229 464 1516

---

Construido con ❤️ para BrandVault.mx
