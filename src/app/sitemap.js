import { services } from "@/lib/data";

export const dynamic = "force-dynamic";

export const revalidate = 0;

export default async function sitemap() {
  try {
    const serviceUrls = services?.map((service) => ({
      url: `https://balajiluxuryinteriordesigners.in/services/${service.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
    }));

    return [
      {
        url: "https://balajiluxuryinteriordesigners.in",
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: "https://balajiluxuryinteriordesigners.in/services",
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: "https://balajiluxuryinteriordesigners.in/about",
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: "https://balajiluxuryinteriordesigners.in/contact",
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: "https://balajiluxuryinteriordesigners.in/portfolio",
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 1,
      },
      ...serviceUrls,
    ];
  } catch (error) {
    console.error("Failed to generate sitemap:", error);

    return [
      {
        url: "https://balajiluxuryinteriordesigners.in",
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: "https://balajiluxuryinteriordesigners.in/services",
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 1,
      },
    ];
  }
}
