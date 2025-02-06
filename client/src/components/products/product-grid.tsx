
import { ProductCard } from "./product-card";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { ProductFilters } from "./product-filters";

export function ProductGrid() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name-asc");

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const sortedProducts = [...(products || [])].sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "price-asc":
        return Number(a.price) - Number(b.price);
      case "price-desc":
        return Number(b.price) - Number(a.price);
      default:
        return 0;
    }
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
    <div>
      <ProductFilters
        view={view}
        setView={setView}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "flex flex-col gap-4"
        }
      >
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} view={view} />
        ))}
      </div>
    </div>
  );
}
