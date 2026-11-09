/*
  Cloudflare Pages runs this on every request.
  It sends anyone who visits www.sturrystorage.co.uk to sturrystorage.co.uk
  (permanent 301 redirect), keeping the page and any ?query on the end, so
  Google only ever sees one version of the site.
  Everything else passes straight through to the normal static pages.
*/
export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname.startsWith("www.")) {
    url.hostname = url.hostname.slice(4);
    url.protocol = "https:";
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
