/* =============================================================================
   BUSINESS DETAILS
   -----------------------------------------------------------------------------
   The actual values now live in  src/content/settings/business.json  so the
   client can edit them in the CMS. This file just loads that JSON and adds the
   derived links (tel:, wa.me, one-line address) that components use.

   Do not hardcode business details here — edit the JSON (or the CMS).
   ============================================================================= */
import businessData from "../content/settings/business.json";

export const business = businessData;

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
