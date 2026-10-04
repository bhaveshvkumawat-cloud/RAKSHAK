<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/16aea7a6-3fef-4e5e-a724-84fde32f880a

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

The `main` branch deploys automatically through `.github/workflows/deploy.yml`.
The workflow installs dependencies with `npm ci`, builds only the Vite frontend
with `npm run build:pages`, and publishes `dist/` to GitHub Pages. The Pages
build uses the `/RAKSHAK/` base path; the local Express development server and
the existing `npm run build` command remain available for local/server hosting.

Do not put API keys in frontend code or commit `.env` files. The `.gitignore`
excludes local environment files; configure any server-side secrets in the
hosting environment for the Express backend. GitHub Pages serves only static
frontend assets and cannot run that backend.
