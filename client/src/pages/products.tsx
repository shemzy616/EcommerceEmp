
import { MainNav } from "@/components/layout/main-nav";
import { ProductGrid } from "@/components/products/product-grid";

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <MainNav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Our Products</h1>
        <ProductGrid />
      </div>
    </div>
  );
}
