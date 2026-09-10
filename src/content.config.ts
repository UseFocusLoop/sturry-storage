import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// One entry per storage type shown in the pricing table.
const pricing = defineCollection({
  loader: glob({ pattern: "*.md", base: "src/content/pricing" }),
  schema: z.object({
    name: z.string(),
    // Leave blank to show priceNote instead (e.g. "Call for availability").
    priceFrom: z.number().nullable().optional(),
    priceUnit: z.string().default("week"),
    priceNote: z.string().default(""),
    whatFits: z.string(),
    available: z.boolean().default(true),
    order: z.number().default(99),
  }),
});

export const collections = { pricing };
