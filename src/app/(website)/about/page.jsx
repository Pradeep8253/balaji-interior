import CompanyIntro from "../components/CompanyIntro";
import HeroSection from "../components/HeroSection";
import WhyChooseUs from "../components/WhyChooseUs";

export default function AboutPage() {
  return (
    <div className="w-full mx-auto px-7 ">
      
      <HeroSection 
        title="About Us"
        subtitle="Learn more about our mission and values."
        image="/28.png"
      />
      <CompanyIntro />

      <div className="my-10" />
      <WhyChooseUs />
    </div>
  );
}
