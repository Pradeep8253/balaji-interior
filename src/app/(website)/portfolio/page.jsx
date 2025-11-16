import Portfolio from "./Portfolio.jsx";
import axios from "axios";

export const metadata = {
  title: "Interior Design Portfolio ",
  description:
    "Explore the premium interior design portfolio by Balaji Luxury Interior Designers. View luxury projects including modular kitchens, false ceilings, wardrobes, and more in Bangalore.",
  keywords: [
    "interior design portfolio",
    "luxury interiors Bangalore",
    "modular kitchen designs",
    "false ceiling work",
    "wardrobe interior design",
    "Balaji Luxury Interior Designers",
    "Bangalore interior design showcase",
    "custom furniture portfolio",
    "home office interior",
    "TV unit and entertainment wall",
  ],
  openGraph: {
    title: "Luxury Interior Design Portfolio ",
    description:
      "Discover our signature interior projects with stunning visuals of living rooms, bedrooms, modular kitchens, wardrobes, and more.",
    url: "https://balajiluxuryinteriordesigners.in/portfolio",
    images: [
      {
        url: "https://res.cloudinary.com/dnekarzit/image/upload/v1752933755/logo_zgrywd.jpg",
        width: 1200,
        height: 630,
        alt: "Balaji Luxury Interior Designers Portfolio",
      },
    ],
  },
  alternates: {
    canonical: "https://balajiluxuryinteriordesigners.in/portfolio",
  },
};

export default async function Page() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/portfolio/get`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const portfolioItems = res?.data?.data;

    return <Portfolio data={portfolioItems} />;
  } catch (error) {
    console.error("Error fetching portfolio data:", error.message);
    return <div className="flex justify-center py-12">No Portfolio found </div>;
  }
}
