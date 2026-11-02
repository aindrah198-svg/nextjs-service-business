export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/performance-baseline"],
    },
    sitemap: (process.env.SITE_URL || "http://localhost:3004") + "/sitemap.xml",
  };
}
