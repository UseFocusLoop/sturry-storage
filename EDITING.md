# Editing the Sturry Storage website

Plain-English guide to the changes you'll actually make. You don't need to be a
developer for any of these — nearly everything lives in **one file**.

---

## The one file you'll use most: `src/data/business.ts`

Open `src/data/business.ts`. This holds the phone number, address, **all
prices**, opening hours, company number and the list of areas you cover. Change
something here and it updates **everywhere** on the site at once.

### Change the phone number
Edit these three lines:
- `phoneDisplay` — how the number is shown on the page (with spaces)
- `phoneDial` — what the Call button dials (no spaces, starts `+44`)
- `whatsapp` — your number for WhatsApp (starts `44`, no `+`, no spaces)

### Change a price
Under `pricing`, edit the `from` value, e.g. change `"£35"` to `"£40"`.
When a price is real (not a placeholder), set its `isPlaceholder: false`. That
removes the "prices are indicative" note under the table.

### Set your access hours  ← important
The leaflet promises **24hr CCTV**, not 24hr *access*. The site never claims
24/7 access. To show your real hours:
1. Put them in `accessHours`, e.g. `"Mon–Sat 7am–7pm, Sun by arrangement"`
2. Change `accessHoursConfirmed` from `false` to `true`

### Fill in the `[CONFIRM]` items
Search the file for `[CONFIRM]`. Each one is a placeholder waiting for a real
answer: company number, 40ft containers, minimum term, HGV parking, insurance,
deposit. Fill them in and delete the `[CONFIRM]` note next to each.

---

## Change the colours: `src/styles/tokens.css`
The seven brand colours are at the top of this file. Change a value once and it
applies across the whole site. Keep dark text on light backgrounds so it stays
easy to read.

---

## Add your real photos

Right now the site shows labelled grey boxes like
`[PHOTO: rows of green containers · 1200×900]`. Each box is already the right
shape, so dropping in a real photo won't shift the layout.

To add a photo:
1. Put the image file in `src/assets/` (e.g. `yard-hero.jpg`).
2. Open the page that has the box (e.g. `src/pages/index.astro`).
3. Follow the short instructions at the top of
   `src/components/PhotoSlot.astro` — it shows exactly what to paste.

Astro automatically makes fast AVIF/WebP versions of your photos.

---

## The contact form
The form emails enquiries to you via a free service called **Web3Forms** — no
server needed.
1. Go to https://web3forms.com, enter your email, get a free access key.
2. Copy `.env.example` to a new file named `.env`.
3. Paste the key after `PUBLIC_WEB3FORMS_KEY=`.
Until you do this, the form shows a "not connected yet" note and the Call /
WhatsApp buttons still work.

On Cloudflare Pages you can instead add `PUBLIC_WEB3FORMS_KEY` under
**Settings → Environment variables** — same effect, no `.env` file needed.

---

## Preview your changes locally
In a terminal, from this folder:

```bash
npm run dev
```

Open the address it prints (usually http://localhost:4321). Changes show live.

---

## Publish (see DEPLOY.md)
See `DEPLOY.md` for putting the site online with Cloudflare Pages.
