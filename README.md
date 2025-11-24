<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally or deploy it to GitHub Pages.

View your app in AI Studio: https://ai.studio/apps/drive/11OYqm21UILIlB-AXblAf1CXZU64pBut-

## Development Environments

This project supports two development modes:

### 🚀 Google AI Studio (Development)
- Open `index-dev.html` in AI Studio
- Uses CDN for Tailwind CSS
- Uses importmap for React dependencies
- Hot reload with AI Studio

### 💻 Local Development (Production Build)
- Run locally with Vite
- Uses compiled Tailwind CSS
- Full build pipeline

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
1. Build the app with production Tailwind
2. Deploy to `gh-pages` branch
3. Available at: https://zerazerg.github.io/fate-rpg-comptador-iniciativa-google-gemini/

## Project Structure

- `index-dev.html` + `index-dev.tsx` → For Google AI Studio development
- `index.html` + `index.tsx` → For production build with Vite
- `src/index.css` → Tailwind directives for production
- `tailwind.config.js` → Tailwind configuration
- `vite.config.ts` → Vite build configuration
