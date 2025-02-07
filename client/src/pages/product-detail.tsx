
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { MainNav } from "@/components/layout/main-nav";

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
  });

  if (isLoading || !product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <MainNav />
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <div className="text-3xl font-bold">
              ${Number(product.price).toFixed(2)}
            </div>
            <p className="text-gray-600">{product.description}</p>
            <div className="text-sm text-muted-foreground">
              {product.stock} in stock
            </div>
            <Button
              size="lg"
              onClick={() => addItem(product)}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
