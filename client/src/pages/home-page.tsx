import { MainNav } from "@/components/layout/main-nav";
import { ProductGrid } from "@/components/products/product-grid";
import { Button } from "@/components/ui/button";
import { Badge } from "../components/ui/badge";
import { ShoppingBag, Star } from "lucide-react";
import { TestimonialSection } from "@/components/testimonials/testimonial-section"; // Import the TestimonialSection component
import { Alert, AlertDescription } from "@/components/ui/alert"; // Added import
import { ErrorBoundary } from "@/components/ui/error-boundary"; // Added import
import { Link } from "wouter"; // Import Link component


export default function HomePage() {
  // Assuming 'products' is fetched from API and available in context or props
  const products = []; // Placeholder - replace with actual data fetching

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
            <Link to="/products">Shop Now →</Link>
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
              <Link to="/products">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Now
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Our Products</h2>
            <Badge variant="outline" className="px-4">
              {products?.length || 0} Products
            </Badge>
          </div>
          <ErrorBoundary FallbackComponent={({ error }) => (
            <Alert variant="destructive">
              <AlertDescription>
                {error.message}
              </AlertDescription>
            </Alert>
          )}>
            <ProductGrid />
          </ErrorBoundary>
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