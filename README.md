<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1JTJoCQyVzcw7e4H-JnJK4EmRScW85n0G

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

---

## Deploy to Vercel

This project is configured to build as a static site with Vite. The included `vercel.json` uses the `@vercel/static-build` builder and outputs from the `dist` folder.

1. Install the [Vercel CLI](https://vercel.com/docs/cli) or use the dashboard.
2. In your project settings, define the following environment variables (either via dashboard or CLI) with your keys:
   - `GEMINI_API_KEY` (optional for Gemini requests)
   - `OPENAI_API_KEY`
   - `ANTHROPIC_API_KEY`
   - `AZURE_OPENAI_ENDPOINT`
   - `AZURE_OPENAI_KEY`
   - `AZURE_OPENAI_DEPLOYMENT`
3. From the project root run:
   ```bash
   vercel --prod
   ```
4. The site will be accessible at the generated Vercel domain.

> ⚠️ Make sure to never commit sensitive keys to source control; use Vercel's secret management or `.env` files locally.
