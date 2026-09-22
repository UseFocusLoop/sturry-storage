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
    category: z.string().optional(),
  }),
});

// A photo slot the client can swap: which file, its alt text, and where the
// photo is anchored inside its fixed-shape slot.
const photo = z.object({
  src: z.string(),
  alt: z.string(),
  objectPosition: z.string().default("50% 50%"),
});

// Editable page text (headings / leads / body prose) and photos, one JSON file
// per page: home, container, yard, contact. Bodies are stored as a list of
// paragraphs (each rendered as its own <p>) rather than markdown, so the output
// stays exactly as designed — no markdown engine reformatting the copy.
const pages = defineCollection({
  loader: glob({ pattern: "*.json", base: "src/content/pages" }),
  schema: z.object({
    // --- Home ---
    hero: z
      .object({
        image: photo,
        heading: z.string(),
        // The "from £xx a week" price sits between these two, injected from the
        // live 20ft price, so it always matches the pricing table.
        leadBefore: z.string(),
        leadAfter: z.string(),
      })
      .optional(),
    pricing: z
      .object({ heading: z.string(), lead: z.string().optional() })
      .optional(),
    security: z
      .object({
        heading: z.string(),
        lead: z.string(),
        facts: z.array(z.object({ title: z.string(), text: z.string() })),
      })
      .optional(),
    finding: z
      .object({
        heading: z.string(),
        directions: z.array(
          z.object({ heading: z.string(), body: z.string() }),
        ),
        areas: z.string(),
      })
      .optional(),
    enquiry: z.object({ heading: z.string(), lead: z.string() }).optional(),

    // --- Container / Yard intro (headline, lead, prose, side photo) ---
    intro: z
      .object({
        heading: z.string(),
        lead: z.string().optional(),
        // Container's lead wraps the injected price, so it is split in two.
        leadBefore: z.string().optional(),
        leadAfter: z.string().optional(),
        body: z.array(z.string()).optional(),
        image: photo.optional(),
      })
      .optional(),

    // --- Yard second section ---
    second: z
      .object({
        heading: z.string(),
        image: photo.optional(),
        body1: z.string(),
      })
      .optional(),

    // --- Contact ---
    formHeading: z.string().optional(),
  }),
});

export const collections = { pricing, pages };
