import { defineConfig } from "tinacms";

// The Git branch Tina reads/writes. Set by the host (Netlify/Cloudflare) at
// build time; falls back to "main" for local work.
const branch =
  process.env.TINA_BRANCH ||
  process.env.HEAD ||
  process.env.CF_PAGES_BRANCH ||
  "main";

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
      mediaRoot: "uploads", // uploaded photos go in public/uploads
      publicFolder: "public",
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
        ],
      },
    ],
  },
});
