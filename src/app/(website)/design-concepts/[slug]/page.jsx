import { designIdeas } from "@/lib/data";
import DesginCard from "../DesginCard";

export async function generateStaticParams() {
  return Object.keys(designIdeas).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const design = designIdeas[slug];

  if (!design) {
    return {
      title: "Balaji Luxury Interior Designers",
      description: "Sorry, the requested design category could not be found.",
    };
  }

  const canonicalUrl = `https://balajiluxuryinteriordesigners.in/design-concepts/${slug}`;

  return {
    title: `${design.title} | Balaji Luxury Interior Designers`,
    description: design.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: design.title,
      description: design.description,
      url: canonicalUrl,
      images: design.items.map((item) => ({
        url: item.image,
        width: 1200,
        height: 630,
        alt: item.title,
      })),
    },
  };
}

function Page({ params }) {
  const slug = params?.slug;
  return <DesginCard slug={slug} />;
}

export default Page;
