import { ProductCard } from "./product-card";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Loader2 } from "lucide-react";

export function ProductGrid() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No products available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
