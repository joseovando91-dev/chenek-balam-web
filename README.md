# CHENEK BALAM — Página web y app PWA

Sitio oficial de CHENEK BALAM, robot catamarán recolector de residuos flotantes (TecNM Campus Tuxtla Gutiérrez, Chiapas).

- `/` → página principal (una sola página con secciones)
- `/app` → panel de control instalable como app (PWA)

Hecho con Next.js 16, React 19, Tailwind CSS y Framer Motion.

## Correr en tu computadora

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Publicar en Vercel (gratis)

1. Entra a https://vercel.com e inicia sesión con tu cuenta de GitHub.
2. **Add New → Project** y elige este repositorio.
3. Deja todo como viene (Vercel detecta Next.js) y presiona **Deploy**.
4. Cada vez que se suban cambios a la rama `main`, la página se actualiza sola.

## Dónde cambiar cosas

| Qué | Archivo |
|-----|---------|
| Teléfono, WhatsApp, correo y redes | `lib/contact.ts` |
| Equipo | `components/sections/team.tsx` |
| Comparativa contra la competencia | `components/sections/comparison.tsx` |
| Marco jurídico y normativo | `components/sections/legal.tsx` |
| Catálogo de modelos | `components/sections/models.tsx` |
| Orden de las secciones | `app/page.tsx` |
| Fotos | `public/real/` |

## Contacto

El formulario no usa base de datos: abre WhatsApp con la solicitud ya escrita, dirigida al 961 154 4298.
