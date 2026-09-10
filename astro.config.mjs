// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// The public URL the site is served from. Used for sitemap, canonical URLs and
// the JSON-LD. CHANGE THIS to the real domain once it's live.
const SITE_URL = "https://sturrystorage.co.uk";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: "static",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
