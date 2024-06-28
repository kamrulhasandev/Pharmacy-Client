import AboutSection from "@/components/AboutSection/AboutSection";
import ContactUs from "@/components/ContactUs/ContactUs";
import CategorySection from "@/components/HomePage/CategorySection/CategorySection";
import HeroSection from "@/components/HomePage/HeroSection/HeroSection";
import ProductSection from "@/components/HomePage/ProductSection/ProductSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <ProductSection />
      <AboutSection />
      <ContactUs/>
    </div>
  );
};

export default HomePage;
