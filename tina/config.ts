import { defineConfig } from "tinacms";

// The Git branch Tina reads/writes. Set by the host (Netlify/Cloudflare) at
// build time; falls back to "main" for local work.
const branch =
  process.env.TINA_BRANCH ||
  process.env.HEAD ||
  process.env.CF_PAGES_BRANCH ||
  "main";

// A reusable "photo slot" field group: the photo, its description (alt text)
// and an optional focus point. Written once, used on every page photo.
const photoField = (name: string, label: string, description: string) => ({
  type: "object" as const,
  name,
  label,
  description,
  fields: [
    {
      type: "image" as const,
      name: "src",
      label: "Photo",
      description:
        "Tap to choose an existing photo or upload a new one. Any size or shape is fine — the site resizes and optimises it for you. No need to crop or shrink it first.",
    },
    {
      type: "string" as const,
      name: "alt",
      label: "Photo description",
      description:
        "A few words describing what's in the photo, e.g. 'The gated yard entrance'. Used by screen readers and search engines. Not shown on the page.",
    },
    {
      type: "string" as const,
      name: "objectPosition",
      label: "Focus point (advanced — usually leave as is)",
      description:
        "Which part of the photo to keep in view if it has to be trimmed to fit the slot. '50% 50%' is the centre. Use '50% 0%' to favour the top, '50% 100%' for the bottom. Leave as '50% 50%' if unsure.",
    },
  ],
});

export default defineConfig({
  branch,
  // These come from your Tina Cloud project (set as env vars — see .env.example).
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  build: {
    outputFolder: "admin", // admin served at /admin
    publicFolder: "public",
  },
  media: {
    tina: {
      // Photos live in src/assets so Astro optimises them (AVIF/WebP, resized)
      // at build time. publicFolder is the repo root ("") so the saved path is
      // "/src/assets/<file>" — exactly what the site looks up when building.
      mediaRoot: "src/assets",
      publicFolder: "",
    },
  },

  schema: {
    collections: [
      // ---------------------------------------------------------------
      // BUSINESS DETAILS  (single settings document)
      // ---------------------------------------------------------------
      {
        name: "business",
        label: "Business details",
        path: "src/content/settings",
        format: "json",
        match: { include: "business" },
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        fields: [
          {
            type: "string",
            name: "legalName",
            label: "Company name",
            description: "Full legal name, including 'Ltd'.",
          },
          {
            type: "string",
            name: "phoneDisplay",
            label: "Phone number (as shown on the site)",
            description: "How the number appears to visitors, e.g. 07777 39 25 38.",
          },
          {
            type: "string",
            name: "phoneDial",
            label: "Phone number (for the Call button)",
            description:
              "What the Call button actually dials. Keep the +44 form with no spaces, e.g. +447777392538.",
          },
          {
            type: "string",
            name: "whatsapp",
            label: "WhatsApp number",
            description:
              "International form: starts 44, no plus sign and no spaces, e.g. 447777392538.",
          },
          {
            type: "string",
            name: "whatsappMessage",
            label: "WhatsApp opening message",
            description:
              "The message pre-typed for someone when they tap WhatsApp.",
          },
          {
            type: "object",
            name: "address",
            label: "Address",
            fields: [
              { type: "string", name: "line1", label: "Street / road" },
              { type: "string", name: "town", label: "Town" },
              { type: "string", name: "city", label: "City" },
              { type: "string", name: "county", label: "County" },
              { type: "string", name: "postcode", label: "Postcode" },
            ],
          },
          {
            type: "string",
            name: "accessHours",
            label: "Access hours",
            description:
              "e.g. Mon–Sat 7am–7pm. Only appears when the toggle below is on.",
          },
          {
            type: "boolean",
            name: "accessHoursConfirmed",
            label: "Show access hours on the site",
            description:
              "Leave off until the hours above are final. Off shows 'access on request' instead.",
          },
          {
            type: "string",
            name: "companyNumber",
            label: "Company registration number",
            description: "From Companies House. Leave blank to hide it.",
          },
          {
            type: "string",
            name: "minimumTerm",
            label: "Minimum term note",
            description:
              "Shown under the price table, e.g. 'One week minimum, no long tie-in'. Leave blank for 'No long tie-in'.",
          },
          {
            type: "boolean",
            name: "pricesIndicative",
            label: "Show 'prices are indicative' note",
            description:
              "Turn this off once your prices are final and firm.",
          },
        ],
      },

      // ---------------------------------------------------------------
      // PRICES  (one entry per storage type in the table)
      // ---------------------------------------------------------------
      {
        name: "pricing",
        label: "Prices",
        path: "src/content/pricing",
        format: "md",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            description: "e.g. 20ft container",
            isTitle: true,
            required: true,
          },
          {
            type: "number",
            name: "priceFrom",
            label: "Price from (£)",
            description:
              "Just the number, e.g. 35. Leave blank to show the note below instead.",
            ui: {
              validate: (value?: number) => {
                if (value != null && value < 0) return "Price can't be negative.";
              },
            },
          },
          {
            type: "string",
            name: "priceUnit",
            label: "Per",
            description: "The unit after the price, e.g. week.",
          },
          {
            type: "string",
            name: "priceNote",
            label: "Text to show when there's no price",
            description:
              "Used only when 'Price from' is blank, e.g. 'Call for availability'.",
          },
          {
            type: "string",
            name: "whatFits",
            label: "Roughly what fits",
            description: "The short description in the middle column of the table.",
            ui: { component: "textarea" },
          },
          {
            type: "boolean",
            name: "available",
            label: "Show this row",
            description:
              "Turn off to hide this row from the table without deleting it.",
          },
          {
            type: "number",
            name: "order",
            label: "Order in the table",
            description: "Lower numbers appear first (20ft = 1, 40ft = 2, yard = 3).",
          },
          {
            type: "string",
            name: "category",
            label: "Which page it appears on",
            description:
              "Controls which page's price list this shows on. Containers → Container storage page; Yards → Yard space page. Both always show on the home page table.",
            options: [
              { value: "container", label: "Containers" },
              { value: "yard", label: "Yards" },
            ],
          },
        ],
      },

      // ---------------------------------------------------------------
      // HOME PAGE  (headings, leads, prose + hero photo)
      // ---------------------------------------------------------------
      {
        name: "pageHome",
        label: "Home page",
        path: "src/content/pages",
        format: "json",
        match: { include: "home" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Top banner (hero)",
            fields: [
              photoField(
                "image",
                "Background photo",
                "The large photo behind the headline at the very top of the home page.",
              ),
              {
                type: "string",
                name: "heading",
                label: "Headline",
                description:
                  "The big headline over the photo. Best kept under about 55 characters, or it can wrap awkwardly on phones.",
                ui: {
                  validate: (v?: string) =>
                    v && v.length > 70
                      ? "That's quite long and may look cramped on phones — try to trim it."
                      : undefined,
                },
              },
              {
                type: "string",
                name: "leadBefore",
                label: "Sentence before the price",
                description:
                  "The line that leads up to the '£xx a week' price. The price is filled in automatically from your 20ft price, so you don't type it here. Keep a space at the end.",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "leadAfter",
                label: "Words after the price",
                description: "The words that come straight after the price, e.g. ' a week.'",
              },
            ],
          },
          {
            type: "object",
            name: "pricing",
            label: "‘Sizes and pricing’ section",
            fields: [
              { type: "string", name: "heading", label: "Section heading" },
              {
                type: "string",
                name: "lead",
                label: "Section intro line",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "security",
            label: "‘Security and access’ section",
            fields: [
              { type: "string", name: "heading", label: "Section heading" },
              {
                type: "string",
                name: "lead",
                label: "Section intro line",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "facts",
                label: "Security cards (first three)",
                description:
                  "The first three cards. The fourth card, ‘Easy access’, fills itself in from the access-hours setting in Business details, so it isn't listed here.",
                list: true,
                ui: {
                  itemProps: (item: { title?: string }) => ({
                    label: item?.title || "Card",
                  }),
                },
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Card title",
                    description: "Keep it short — one to three words.",
                  },
                  {
                    type: "string",
                    name: "text",
                    label: "Card text",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "finding",
            label: "‘Finding us’ section",
            description:
              "The address and map fill themselves in from Business details — you only edit the directions and the areas line here.",
            fields: [
              { type: "string", name: "heading", label: "Section heading" },
              {
                type: "object",
                name: "directions",
                label: "Directions",
                list: true,
                ui: {
                  itemProps: (item: { heading?: string }) => ({
                    label: item?.heading || "Directions",
                  }),
                },
                fields: [
                  { type: "string", name: "heading", label: "Small heading" },
                  {
                    type: "string",
                    name: "body",
                    label: "Directions text",
                    ui: { component: "textarea" },
                  },
                ],
              },
              {
                type: "string",
                name: "areas",
                label: "Areas you cover (last paragraph)",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "enquiry",
            label: "‘Get a quote’ section",
            fields: [
              { type: "string", name: "heading", label: "Section heading" },
              {
                type: "string",
                name: "lead",
                label: "Section intro line",
                ui: { component: "textarea" },
              },
            ],
          },
        ],
      },

      // ---------------------------------------------------------------
      // CONTAINER STORAGE PAGE
      // ---------------------------------------------------------------
      {
        name: "pageContainer",
        label: "Container storage page",
        path: "src/content/pages",
        format: "json",
        match: { include: "container" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "intro",
            label: "Top of the page",
            fields: [
              {
                type: "string",
                name: "heading",
                label: "Page headline",
                description: "Best kept under about 55 characters.",
              },
              {
                type: "string",
                name: "leadBefore",
                label: "Intro sentence before the price",
                description:
                  "Leads up to the '£xx a week' price, which is added automatically. Keep a space at the end.",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "leadAfter",
                label: "Words after the price",
                description: "e.g. ' a week.'",
              },
              {
                type: "string",
                name: "body",
                label: "Paragraphs",
                description:
                  "The main text, one box per paragraph. Use the + button to add a paragraph, or the handle to reorder them.",
                list: true,
                ui: {
                  component: "textarea",
                  itemProps: (item: string) => ({
                    label: item ? item.slice(0, 40) + "…" : "Paragraph",
                  }),
                },
              },
              photoField("image", "Side photo", "The photo beside the text near the top of the page."),
            ],
          },
          {
            type: "object",
            name: "pricing",
            label: "Pricing section",
            fields: [{ type: "string", name: "heading", label: "Section heading" }],
          },
        ],
      },

      // ---------------------------------------------------------------
      // YARD SPACE PAGE
      // ---------------------------------------------------------------
      {
        name: "pageYard",
        label: "Yard space page",
        path: "src/content/pages",
        format: "json",
        match: { include: "yard" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "intro",
            label: "Top of the page",
            fields: [
              {
                type: "string",
                name: "heading",
                label: "Page headline",
                description: "Best kept under about 55 characters.",
              },
              {
                type: "string",
                name: "lead",
                label: "Intro line",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "body",
                label: "Paragraphs",
                description:
                  "The main text, one box per paragraph. Use the + button to add a paragraph, or the handle to reorder them.",
                list: true,
                ui: {
                  component: "textarea",
                  itemProps: (item: string) => ({
                    label: item ? item.slice(0, 40) + "…" : "Paragraph",
                  }),
                },
              },
              photoField("image", "Side photo", "The photo beside the text near the top of the page."),
            ],
          },
          {
            type: "object",
            name: "second",
            label: "‘What the yard takes’ section",
            fields: [
              { type: "string", name: "heading", label: "Section heading" },
              photoField("image", "Section photo", "The photo in this second section."),
              {
                type: "string",
                name: "body1",
                label: "Paragraph",
                description:
                  "The second line about larger vehicles / HGVs fills itself in and isn't edited here.",
                ui: { component: "textarea" },
              },
            ],
          },
        ],
      },
    ],
  },
});
