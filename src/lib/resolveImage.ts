/* =============================================================================
   RESOLVE A CMS PHOTO PATH -> ASTRO IMAGE (build-time optimised)
   -----------------------------------------------------------------------------
   Photos are picked in the CMS and stored in frontmatter as a path like
   "/src/assets/containers.png". The CMS (Tina) saves the actual image file into
   src/assets/ in the repo.

   Astro only optimises (AVIF/WebP, resized) images it can import from src/. This
   helper turns the stored path string into the imported ImageMetadata Astro's
   <Image>/<Picture> needs, so a photo swapped in the CMS is still optimised at
   build time — the client never has to crop or compress before uploading.

   import.meta.glob (eager) imports every photo in src/assets once, keyed by the
   exact "/src/assets/…" path that Tina stores, so a lookup is a direct match.
   ============================================================================= */
import type { ImageMetadata } from "astro";

const images = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/**/*.{jpeg,jpg,JPG,JPEG,png,PNG,gif,GIF,webp,WEBP,avif,AVIF}",
  { eager: true },
);

export function resolveImage(src: string): ImageMetadata {
  const mod = images[src];
  if (!mod) {
    const available = Object.keys(images).join(", ") || "(none found)";
    throw new Error(
      `Photo "${src}" was not found in src/assets. ` +
        `Check the file name chosen in the CMS. Available photos: ${available}`,
    );
  }
  return mod.default;
}
