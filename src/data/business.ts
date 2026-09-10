/* =============================================================================
   BUSINESS DETAILS
   -----------------------------------------------------------------------------
   Client-editable details live in  src/content/settings/business.json  (managed
   in the CMS). A few technical fields the client should NOT edit (map coords,
   areas served for SEO, etc.) are kept here in code and merged in.

   To change a phone number, address, price note, etc. — edit the JSON / CMS.
   ============================================================================= */
import editable from "../content/settings/business.json";

// Technical fields kept out of the CMS (structural / SEO — not client-editable).
const technical = {
  shortName: "Sturry Storage",
  geo: { lat: 51.3106, lng: 1.1176 },
  insuranceNote: "",
  deposit: "",
  hgvParking: null as boolean | null,
  areas: [
    "Sturry",
    "Canterbury",
    "Fordwich",
    "Westbere",
    "Herne Bay",
    "Whitstable",
    "Broad Oak",
  ],
};

export const business = { ...editable, ...technical };

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
