import ServiceCard from "../components/services/ServiceCard";
import axios from "axios";

export const metadata = {
  title: `Interior Design & Renovation Services in Bangalore | Balaji Luxury Interior Designers`,
  description: `Discover professional interior design, modular kitchen, POP ceiling, and renovation services in Bangalore by Balaji Luxury Interior Designers. Tailored for homes, offices, and commercial spaces.`,
  openGraph: {
    title: `Top Interior & Renovation Services in Bangalore | Balaji Luxury Interior Designers`,
    description: `Explore modular interiors, custom furniture, wall cladding, lighting, and more. Serving all areas of Bangalore with personalized design solutions.`,
    url: `https://balajiluxuryinteriordesigners.in/services`,
    images: [
      {
        url: "https://res.cloudinary.com/dnekarzit/image/upload/v1752933755/logo_zgrywd.jpg",
        width: 1200,
        height: 630,
        alt: "Balaji Luxury Interior Designers Services",
      },
    ],
  },
  alternates: {
    canonical: `https://balajiluxuryinteriordesigners.in/services`,
  },
  keywords: [
    "interior designers in Bangalore",
    "modular kitchen Bangalore",
    "false ceiling work",
    "POP design Bangalore",
    "wardrobe design",
    "complete home interiors",
    "Balaji Luxury Interiors",
    "affordable interior design",
    "residential and commercial interiors",
    "custom furniture makers near me",
  ],
};

const getCategories = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/service-categories/get`
    );

    return res?.data?.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

async function Page() {
  const categories = await getCategories();

  return <ServiceCard category={categories} isHome={false} />;
}

export default Page;
