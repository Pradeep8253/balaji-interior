import axios from "axios";
import ServiceDetail from "../../components/services/ServiceDetail";

async function fetchServiceBySlug(slug) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/get-slug/${slug}`
    );

    return res?.data || null;
  } catch (error) {
    console.error(`Error fetching service with slug ${slug}:`, error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/getall`
    );

    const services = res?.data || [];
    return services?.map((service) => ({ slug: service?.slug })) || [];
  } catch (error) {
    console.error("Error fetching all services for params:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = params ?? {};
  const service = await fetchServiceBySlug(slug);

  if (!service) {
    return {
      title: "Balaji Luxury Interior Designers",
      description: "The requested service could not be found.",
    };
  }

  const canonicalUrl = `https://balajiluxuryinteriordesigners.in/services/${slug}`;

  return {
    title: service?.title || "Balaji Luxury Interior Designers",
    description: service?.description || "",
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: service?.title,
      description: service?.description,
      url: canonicalUrl,
      images: Array.isArray(service?.image)
        ? service?.image
        : service?.image
        ? [service?.image]
        : [],
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = params ?? {};
  const service = await fetchServiceBySlug(slug);

  if (!service) {
    return (
      <div className="text-center py-20 text-red-600">Service not found</div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service?.title ?? "",
    description: service?.description ?? "",
    image: Array.isArray(service?.image)
      ? service?.image?.[0]
      : service?.image ?? "",
    logo: "https://res.cloudinary.com/dnekarzit/image/upload/v1752933755/logo_zgrywd.jpg",
    url: `https://balajiluxuryinteriordesigners.in/services/${service?.slug}`,
    category: service?.category ?? "",
    areaServed: { "@type": "Place", name: "Bangalore" },
    provider: {
      "@type": "LocalBusiness",
      name: "Balaji Luxury Interior Designers",
      url: "https://balajiluxuryinteriordesigners.in",
      telephone: "+91-9980238628",
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "No. 4, Skanda Nilaya, near Bangalore One, Subramanyapura Main Road, Uttarahalli",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560061",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 12.901436,
        longitude: 77.537375,
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "What's Included",
      itemListElement:
        service?.features?.map((feature) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: feature },
        })) ?? [],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ServiceDetail service={service} />
    </>
  );
}
