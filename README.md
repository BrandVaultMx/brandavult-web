# BrandVault.mx - Landing Ultra Premium v3.0

Landing page premium con animaciones avanzadas, cursor tracking, parallax y efectos nivel Silicon Valley.

## 🚀 Stack

- **Next.js 14** (App Router)
- **Framer Motion** (Animaciones)
- **Tailwind CSS** (Estilos)
- **TypeScript** (Tipado)

## ✨ Características Premium

- ✅ Cursor glow effect (sigue el mouse)
- ✅ Scroll progress indicator
- ✅ Loading screen animado
- ✅ Parallax en hero
- ✅ Counters animados
- ✅ Magnetic buttons
- ✅ Staggered reveal animations
- ✅ Floating WhatsApp button
- ✅ 4 redes sociales (IG, LinkedIn, X, FB)
- ✅ Noise texture overlay
- ✅ FAQ acordeón animado
- ✅ Reportes dinámicos para cold email

## 📁 Estructura

```
brandvault-ultra/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx              # Landing principal
│   └── marca/[expediente]/   # Reportes dinámicos
├── data/
│   └── leads.ts              # Datos de leads
├── scripts/
│   └── csv-to-ts.js          # Convertidor CSV
├── public/
│   └── logo.png              # Agregar tu logo
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🛠️ Instalación

```bash
npm install
npm run dev
```

## 📤 Deploy

1. Push a GitHub
2. Importar en Vercel
3. **Framework Preset: Next.js** (¡importante!)
4. Deploy

## 🔗 Actualizar Links

Edita `SOCIAL_LINKS` al inicio de `app/page.tsx`:

```js
const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/522294641516',
  instagram: 'https://www.instagram.com/brandvaultmx/',
  linkedin: 'https://linkedin.com/company/brandvaultmx',
  twitter: 'https://x.com/brandvaultmx',
  facebook: 'https://facebook.com/brandvaultmx',
  email: 'contacto@brandvault.mx',
  mercadopago: 'https://mpago.la/2jfXZ5W',
  calendly: 'https://calendly.com/brandvault/15min',
}
```

## 📊 Actualizar Leads

1. Coloca `leads.csv` en la raíz
2. Ejecuta: `node scripts/csv-to-ts.js`
3. Push y deploy

## 🎨 Colores

- Gold: `#D4AF37`
- Black: `#030303`

---

Construido para BrandVault.mx 🏆
