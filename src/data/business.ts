/* =============================================================================
   BUSINESS DETAILS — EDIT THIS FILE TO CHANGE THE SITE
   -----------------------------------------------------------------------------
   Almost everything you'll want to change — phone number, prices, address,
   opening hours, the areas you cover — lives in this one file. Change it here
   and it updates everywhere on the website automatically.

   Lines marked  // [CONFIRM]  are placeholders. Replace them with the real
   details when you have them, then delete the [CONFIRM] note.
   ============================================================================= */

export const business = {
  // ---- Name -----------------------------------------------------------------
  legalName: "Sturry Storage Solutions Ltd",
  shortName: "Sturry Storage",

  // ---- Phone / WhatsApp -----------------------------------------------------
  // phoneDisplay is what people SEE. phoneDial is what the Call button DIALS
  // (no spaces, UK +44 format). whatsapp is the international number for wa.me.
  phoneDisplay: "07777 39 25 38",
  phoneDial: "+447777392538",
  whatsapp: "447777392538",
  // The message that's pre-typed when someone opens WhatsApp from the site.
  whatsappMessage:
    "Hi Sturry Storage, I'd like to ask about storage. ",

  // ---- Address --------------------------------------------------------------
  address: {
    line1: "Staines Hill",
    town: "Sturry",
    city: "Canterbury",
    county: "Kent",
    postcode: "CT2 0EU",
  },
  // Map coordinates for the "Finding us" pin and the JSON-LD.
  // These point at Staines Hill, Sturry. Fine-tune if the pin is slightly off.
  geo: { lat: 51.3106, lng: 1.1176 },

  // ---- Opening / access hours ----------------------------------------------
  // [CONFIRM] The leaflet promises 24hr CCTV, NOT 24hr access.
  // Do not advertise 24/7 access. Put the real access hours here.
  accessHours: "Access hours to be confirmed", // [CONFIRM]
  accessHoursConfirmed: false, // set true once real hours are entered above

  // ---- Company / legal ------------------------------------------------------
  companyNumber: "", // [CONFIRM] Companies House registration number
  insuranceNote: "", // [CONFIRM] e.g. "Goods stored are the owner's responsibility — arrange your own cover."
  deposit: "", // [CONFIRM] e.g. "One week's rent held as deposit."
  minimumTerm: "", // [CONFIRM] e.g. "One week minimum, no long tie-in."

  // ---- Pricing --------------------------------------------------------------
  // PLACEHOLDER PRICES — treat as indicative anchors only. Swap for real prices.
  pricing: {
    container20: { from: "£35", per: "week", isPlaceholder: true }, // [CONFIRM]
    container40: { from: "", per: "week", available: false, isPlaceholder: true }, // [CONFIRM] offered? price?
    yard: { from: "£250", per: "week", isPlaceholder: true }, // [CONFIRM]
  },

  // ---- What's offered -------------------------------------------------------
  hgvParking: null as boolean | null, // [CONFIRM] true / false — is vehicle/HGV parking offered?

  // ---- Areas served (used in prose + SEO) -----------------------------------
  areas: [
    "Sturry",
    "Canterbury",
    "Fordwich",
    "Westbere",
    "Herne Bay",
    "Whitstable",
    "Broad Oak",
  ],
} as const;

// ---- Derived links (don't usually need to edit these) -----------------------
export const links = {
  tel: `tel:${business.phoneDial}`,
  whatsapp: `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
    business.whatsappMessage
  )}`,
};

export const addressOneLine = [
  business.address.line1,
  business.address.town,
  business.address.city,
  business.address.county,
  business.address.postcode,
].join(", ");
