import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import Dashboard from "@/pages/admin/dashboard";
import Products from "@/pages/admin/products";
import { AuthProvider } from "@/hooks/use-auth";
import { CartProvider } from "@/hooks/use-cart";
import { ProtectedRoute } from "./lib/protected-route";
import ProductDetail from "@/pages/product-detail";
import ProductsPage from "@/pages/products";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/admin" component={Dashboard} />
      <ProtectedRoute path="/admin/products" component={Products} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Router />
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;