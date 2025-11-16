export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/user", "/admin"],
    },
    sitemap: "https://balajiluxuryinteriordesigners.in/sitemap.xml",
    host: "https://balajiluxuryinteriordesigners.in/",
  };
}
