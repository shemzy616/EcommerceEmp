import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Link } from "wouter";
import { Store, ShoppingCart, User } from "lucide-react";

export function MainNav() {
  const { user, logoutMutation } = useAuth();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2 text-xl font-bold">
            <Store className="h-6 w-6" />
            <span>EShop</span>
          </a>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              {user.isAdmin && (
                <Link href="/admin">
                  <Button variant="ghost">Admin Dashboard</Button>
                </Link>
              )}
              <Button
                variant="ghost"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
              >
                <User className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <Link href="/auth">
              <Button variant="ghost">
                <User className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
          <CartDrawer>
            <Button variant="outline">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </CartDrawer>
        </div>
      </div>
    </nav>
  );
}