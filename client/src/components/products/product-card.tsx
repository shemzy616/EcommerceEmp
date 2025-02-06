import { Product } from "@shared/schema";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <Card className="h-full flex flex-col">
      <div className="aspect-square relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover w-full h-full rounded-t-lg"
        />
      </div>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-2xl font-bold">
          ${Number(product.price).toFixed(2)}
        </div>
        <div className="text-sm text-muted-foreground">
          {product.stock} in stock
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => addItem(product)}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
