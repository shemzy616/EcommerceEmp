
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
  view: "grid" | "list";
}

export function ProductCard({ product, view }: ProductCardProps) {
  const { addItem } = useCart();

  if (view === "list") {
    return (
      <Card className="flex flex-row">
        <div className="w-48 h-48">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover w-full h-full rounded-l-lg"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
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
              onClick={() => addItem(product)}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </CardFooter>
        </div>
      </Card>
    );
  }

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
