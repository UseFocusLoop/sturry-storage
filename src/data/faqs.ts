/* =============================================================================
   FAQS — container and yard pages
   -----------------------------------------------------------------------------
   Questions people ask before they hire. Prices are passed in from the pricing
   collection, so a price change in the CMS updates these answers too.

   Only facts we know are in here. Access hours and the deposit are left out
   until they're confirmed — add a question for each once they are.
   Distances are approximate straight-line miles.
   ============================================================================= */

export type Faq = { q: string; a: string };

type Price = { priceFrom?: number | null; priceNote: string };

/* "from £35 a week", or the price note if there's no figure. */
const weekly = (p: Price) =>
  p.priceFrom != null ? `from £${p.priceFrom} a week` : p.priceNote.toLowerCase();

const insurance: Faq = {
  q: "Is my stuff insured while it's in storage?",
  a: "No. Your goods stay your responsibility while they're with us, and we don't insure them, so we strongly recommend you arrange your own insurance before you move in. It's worth checking whether your home or business policy can cover goods kept in storage.",
};

const distance = (also: string): Faq => ({
  q: "How far are you from Canterbury, Herne Bay and Whitstable?",
  a: `We're on Staines Hill in Sturry, on the Herne Bay side of Canterbury. That's about 3 miles from Canterbury city centre, about 4.5 miles from Herne Bay and about 6 miles from Whitstable. ${also}`,
});

const security: Faq = {
  q: "How secure is the site?",
  a: "The site is gated and closed to the public, with a locked gate and 24hr CCTV covering it around the clock. You drive right up to your unit, so your things go straight from your vehicle into storage.",
};

export const containerFaqs = (p: { c20: Price; c40: Price }): Faq[] => [
  {
    q: "How much does container hire cost?",
    a: `Container hire starts ${weekly(p.c20)} for a 20ft container and ${weekly(
      p.c40
    )} for a 40ft. You can pay weekly or monthly, for as short or as long as you need, with no tie-ins. Call or WhatsApp to check what's available.`,
  },
  {
    q: "What fits in a 20ft container?",
    a: "A 20ft container holds roughly a three-bed house's worth of furniture, or a full van-load of tools and stock, with room to walk in and get at what you need. A 40ft container has about twice the floor space. Not sure which size to hire? Contact us and we'll help you work it out.",
  },
  security,
  insurance,
  distance(
    "Customers use our container hire for house moves and clear-outs, trade tools and stock, and anything else they need kept dry and locked away."
  ),
];

export const yardFaqs = (p: { gated: Price; open: Price }): Faq[] => [
  {
    q: "What can I keep on the yard?",
    a: "Plant and machinery between sites, trailers and horseboxes, vans and vehicles, and building materials, aggregates and skips staged for a job. Fuel is only allowed in the tank of a vehicle or machine. For larger vehicles, please contact us for availability.",
  },
  {
    q: "How much does yard space cost?",
    a: `A gated storage yard starts ${weekly(
      p.gated
    )}. Open storage is priced on the space you need, so contact us for a quote. You can pay weekly or monthly, short or long term, with no tie-ins.`,
  },
  {
    q: "Is the yard secure?",
    a: "Yes. It's a gated, hardstanding yard behind a locked gate, closed to the public and covered by 24hr CCTV. You can drive straight onto it in any weather.",
  },
  insurance,
  distance(
    "As well as yard space, we do container hire on the same site if you need somewhere dry and lockable too."
  ),
];
