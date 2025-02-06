
import { ProductCard } from "./product-card";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { ProductFilters } from "./product-filters";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error }: { error: Error }) {
  return (
    <Alert variant="destructive">
      <AlertDescription>
        Error loading products: {error.message}
      </AlertDescription>
    </Alert>
  );
}

export function ProductGrid() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name-asc");

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    retry: 2,
  });

  if (error) {
    return <ErrorFallback error={error as Error} />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading products...</span>
      </div>
    );
  }

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

  return (
    <div>
      <ProductFilters
        view={view}
        setView={setView}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
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
      </ErrorBoundary>
    </div>
  );
}
