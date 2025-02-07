import { ProductCard } from "./product-card";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { ProductFilters } from "./product-filters";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ErrorBoundary } from "react-error-boundary";
// Added import for Promotion type.  Replace with your actual import path.
import { Promotion } from "@shared/schema";


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
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 30000,
    onError: (error) => {
      console.error("Product fetch error:", error);
    },
    queryFn: async () => {
      const response = await fetch("/api/products", {
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }
      return response.json();
    }
  });

  // Added query for promotions. Replace Promotion[] with your actual type if different.
  const { data: promotions, isLoading: promotionsLoading, error: promotionsError } = useQuery<Promotion[]>({
    queryKey: ["/api/promotions"],
    retry: 2,
  });

  const getProductPromotion = (productId: number) => {
    return promotions?.find(promo => promo.productId === productId);
  };


  if (error || promotionsError) {
    return <ErrorFallback error={error || promotionsError as Error} />;
  }

  if (isLoading || promotionsLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading products and promotions...</span>
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
      {/* Placeholder for promotional banner section */}
      <div className="bg-gray-100 p-4 mb-4">
        <h2 className="text-xl font-bold mb-2">Promotional Banner</h2>
        {/*  Implementation for featured product highlights and current offers/deals would go here.
             This section needs backend support and more detailed UI design.  */}
        <p>Featured Products:  (Implementation needed)</p>
        <p>Current Offers: (Implementation needed)</p>
      </div>
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
            <ProductCard key={product.id} product={product} view={view} promotion={getProductPromotion(product.id)} />
          ))}
        </div>
      </ErrorBoundary>
    </div>
  );
}