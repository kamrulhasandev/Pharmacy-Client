import CategorySection from "@/components/HomePage/CategorySection/CategorySection";
import HeroSection from "@/components/HomePage/HeroSection/HeroSection";
import ProductSection from "@/components/HomePage/ProductSection/ProductSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <ProductSection/>
    </div>
  );
};

export default HomePage;
