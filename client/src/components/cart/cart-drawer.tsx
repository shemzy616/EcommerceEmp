import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Minus, Plus, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CartDrawer({ children }: { children: React.ReactNode }) {
  const { items, removeItem, updateQuantity, total } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          <ScrollArea className="flex-grow py-4">
            {items.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Your cart is empty
              </p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${Number(item.price).toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <Button className="w-full" disabled={items.length === 0}>
              Checkout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
