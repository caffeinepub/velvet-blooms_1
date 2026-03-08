import { Footer } from "../components/storefront/Footer";
import { HeroSection } from "../components/storefront/HeroSection";
import { HowToOrder } from "../components/storefront/HowToOrder";
import { InstagramSection } from "../components/storefront/InstagramSection";
import { NewArrivals } from "../components/storefront/NewArrivals";
import { ProductGrid } from "../components/storefront/ProductGrid";

export function StorefrontPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ProductGrid />
      <HowToOrder />
      <NewArrivals />
      <InstagramSection />
      <Footer />
    </div>
  );
}
