import axios from "axios";

import InteriorDesignerCarousel from "./components/carousel/InteriorDesignerCarousel";
import CompanyIntro from "./components/CompanyIntro";
import Faq from "./components/Faq";
import HeroSection from "./components/HeroSection";
import HeroSlider from "./components/hero/HeroSlider";
import ProcessGrid from "./components/ProcessGrid";
import ServiceCard from "./components/services/ServiceCard";
import WhyChooseUs from "./components/WhyChooseUs";
import HeroTicker from "./components/hero/HeroTicker";
import GlobalQueryForm from "./components/GlobalQueryForm";

async function getCategories() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/service-categories/get`,
      { headers: { "Cache-Control": "no-store" } }
    );
    return res.data?.data || [];
  } catch (error) {
    console.error("Error fetching service categories:", error.message);
    return [];
  }
}

export default async function Home() {
  const categories = await getCategories();

  return (
    <div>
      <HeroSlider />
      <HeroTicker />

      <GlobalQueryForm />

      <div>
        <CompanyIntro />
      </div>

      <div className="hidden md:block">
        <ProcessGrid />
      </div>

      <div>
        <HeroSection
          title="Explore Our Commencement"
          subtitle="Choose from our curated selection of comfortable and luxurious stays."
          image="/32.png"
        />
      </div>

      <div>
        <ServiceCard category={categories} isHome={true} />
      </div>

      <div className="hidden md:block">
        <InteriorDesignerCarousel />
      </div>

      <div className="hidden md:block">
        <WhyChooseUs />
      </div>

      <div className="hidden md:block">
        <Faq />
      </div>
    </div>
  );
}
