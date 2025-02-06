import { MainNav } from "@/components/layout/main-nav";
import { ProductGrid } from "@/components/products/product-grid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Star } from "lucide-react";
import { TestimonialSection } from "@/components/testimonials/testimonial-section"; // Import the TestimonialSection component

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />

      {/* Promotional Banner */}
      <div className="bg-secondary/10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-medium">
              New
            </span>
            <p className="text-sm">Special offer: Get 20% off on all electronics!</p>
          </div>
          <Button variant="link" size="sm">
            Shop Now →
          </Button>
        </div>
      </div>

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
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">Hot Deals</Badge>
              <Badge variant="secondary">Best Sellers</Badge>
            </div>
          </div>

          {/* Promotional Deals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-secondary/10 rounded-lg p-6 flex items-center justify-between">
              <div>
                <Badge variant="destructive" className="mb-2">Limited Time</Badge>
                <h3 className="text-2xl font-bold mb-2">Summer Sale</h3>
                <p className="text-muted-foreground mb-4">Up to 40% off on selected items</p>
                <Button>View Deals</Button>
              </div>
              <div className="hidden md:block">
                <ShoppingBag className="h-16 w-16 text-primary" />
              </div>
            </div>
            <div className="bg-primary/10 rounded-lg p-6 flex items-center justify-between">
              <div>
                <Badge className="mb-2">New Arrival</Badge>
                <h3 className="text-2xl font-bold mb-2">Premium Collection</h3>
                <p className="text-muted-foreground mb-4">Discover our latest products</p>
                <Button variant="secondary">Explore</Button>
              </div>
              <div className="hidden md:block">
                <Star className="h-16 w-16 text-primary" />
              </div>
            </div>
          </div>

          <ProductGrid />
        </div>
      </section>

      <TestimonialSection /> {/* Added TestimonialSection */}

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