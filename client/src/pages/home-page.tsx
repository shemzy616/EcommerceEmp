import { MainNav } from "@/components/layout/main-nav";
import { ProductGrid } from "@/components/products/product-grid";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to EShop
            </h1>
            <p className="text-xl mb-8">
              Discover our curated collection of quality products at amazing prices.
            </p>
            <Button size="lg" variant="secondary">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <ProductGrid />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4">About EShop</h3>
              <p className="text-muted-foreground">
                Your one-stop destination for quality products and seamless shopping experience.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <p className="text-muted-foreground">
                Email: support@eshop.com<br />
                Phone: (555) 123-4567
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Twitter
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Facebook
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
