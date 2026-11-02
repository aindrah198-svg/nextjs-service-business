import { services } from "../lib/services";
export default function sitemap() {
  return [
    "/",
    "/services",
    "/work",
    "/about",
    "/contact",
    ...services.map((s) => "/services/" + s.slug),
  ].map((path) => ({
    url: (process.env.SITE_URL || "http://localhost:3004") + path,
  }));
}
