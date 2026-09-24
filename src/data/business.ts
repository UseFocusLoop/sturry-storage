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
  geo: { lat: 51.3086, lng: 1.1392 },
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
  sms: `sms:${business.phoneDial}`,
  whatsapp: `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
    business.whatsappMessage
  )}`,
};

// Web3Forms access key for the quote form. This is a PUBLIC key (it is embedded
// in the rendered form HTML either way), so it lives here as a committed default
// and can be overridden per-environment with PUBLIC_WEB3FORMS_KEY.
export const web3formsKey =
  import.meta.env.PUBLIC_WEB3FORMS_KEY ||
  "b0d514c7-ea8b-4abb-bc11-5bbfb8800e64";

export const addressOneLine = [
  business.address.line1,
  business.address.town,
  business.address.city,
  business.address.county,
  business.address.postcode,
].join(", ");
