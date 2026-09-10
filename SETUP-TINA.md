# Turning on the CMS — one-time setup

The code is done. To make the `/admin` login work, the site needs to be on
GitHub and connected to a free Tina Cloud project. These are account steps only
you can do (they need your logins). Takes about 15 minutes.

## 1. Put the project on GitHub

The project is already a Git repo with commits. Create an empty repo on GitHub
(no README), then from the project folder:

```bash
git remote add origin https://github.com/<your-username>/sturry-storage.git
git push -u origin main
git push origin add-tina-cms
```

> The CMS work is on the `add-tina-cms` branch. Once you've tested it (checklist
> below), merge it into `main`.

## 2. Create a Tina Cloud project

1. Go to **https://app.tina.io** and sign in with GitHub.
2. **Create a project** → connect the `sturry-storage` GitHub repo.
3. From the project **Overview**, copy the **Client ID**.
4. Go to **Tokens**, create a **read-only token**, and copy it.

## 3. Point Netlify at GitHub (instead of drag-and-drop)

The current site was drag-dropped. To let the CMS save changes, Netlify needs to
build from GitHub:

1. Netlify → your site → **Site configuration → Build & deploy → Link repository**
   (or create a new site **from Git** and pick the repo).
2. Set the build settings exactly:
   - **Build command:** `npm run build:tina`
   - **Publish directory:** `dist`
3. **Environment variables** — add these (Site configuration → Environment variables):

   | Key | Value |
   |---|---|
   | `TINA_PUBLIC_CLIENT_ID` | the Client ID from step 2 |
   | `TINA_TOKEN` | the read-only token from step 2 |
   | `PUBLIC_WEB3FORMS_KEY` | your Web3Forms key (so the enquiry form emails you) |

4. Trigger a deploy.

That's it — `https://<your-site>/admin` will now let you log in and edit.

> **Important:** don't switch the build command to `npm run build:tina` until the
> two `TINA_` variables are set, or the build will fail. The plain `npm run build`
> (Astro only) keeps working without Tina if you ever need it.

---

# Test checklist (run this before handing the login to the client)

Do each one in `/admin`, save, wait ~1–2 minutes, then check the live site.

- [ ] **Change a price** — Prices → 20ft container → change *Price from* to a new
      number → Save. Confirm the pricing table and the hero line ("from £… a week")
      both update.
- [ ] **Edit a business detail** — Business details → change *Phone number (as shown)*
      → Save. Confirm it changes in the top bar, buttons and footer.
- [ ] **Toggle a row off** — Prices → 40ft container → turn off *Show this row* →
      Save. Confirm the 40ft row disappears from the table.
- [ ] **Turn off the indicative note** — Business details → *Show 'prices are
      indicative' note* off → Save. Confirm the small note under the table is gone.
- [ ] **Hours toggle** — Business details → type real *Access hours* and turn on
      *Show access hours* → Save. Confirm they appear in the Security section and
      footer.

Set anything you changed back to the real value when you're done testing.

---

# What's editable now vs later

**Now:** all business/contact details (phone, WhatsApp, address, hours, company
number) and the full pricing table.

**Next (on your go-ahead):** swapping the photos, and editing the headings and
paragraph wording on each page. These are the remaining items from the brief;
they're deliberately staged after the high-value details so each step could be
verified against the live design.
