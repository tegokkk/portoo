# Tego Saputra Portfolio

Single-page portfolio for Tego Saputra, built with React, Vite, Framer Motion, and Vercel-ready static output.

## Run Locally

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Deploy to Vercel

Import this folder's GitHub repository into Vercel. The included `vercel.json` uses:

- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite

## Form Handling

The contact form supports a Formspree endpoint through the `VITE_FORMSPREE_ENDPOINT` environment variable.
When the endpoint is empty, the form shows a configuration toast and asks visitors to use the direct email link.

Example local setup:

```bash
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id npm run dev
```

On Vercel, add `VITE_FORMSPREE_ENDPOINT` in Project Settings > Environment Variables, then redeploy.

## Source Structure

- `src/App.jsx` keeps page orchestration, section layout, and form state.
- `src/data/portfolio.js` stores profile, projects, certificate, navigation, and tech-stack data.
- `src/components/` contains reusable UI, system effects, profile visual, quick-peek, and modals.
- `src/animations.js` centralizes Framer Motion variants.
- `src/styles.css` imports modular CSS files from `src/styles/`.
