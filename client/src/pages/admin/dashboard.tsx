import { useAuth } from "@/hooks/use-auth";
import { MainNav } from "@/components/layout/main-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Package, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { TestimonialSection } from "@/components/testimonials/testimonial-section";

// Mock data for charts
const salesData = [
  { name: "Jan", sales: 4000, target: 2400 },
  { name: "Feb", sales: 3000, target: 2400 },
  { name: "Mar", sales: 2000, target: 2400 },
  { name: "Apr", sales: 2780, target: 2400 },
  { name: "May", sales: 1890, target: 2400 },
  { name: "Jun", sales: 2390, target: 2400 },
];

const productPerformance = [
  { name: "Electronics", sales: 3200, profit: 1200 },
  { name: "Clothing", sales: 2100, profit: 800 },
  { name: "Books", sales: 1500, profit: 600 },
  { name: "Home", sales: 2800, profit: 1100 },
];

export default function Dashboard() {
  const { user } = useAuth();
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  if (!user?.isAdmin) {
    return <div>Access denied</div>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const totalProducts = products?.length || 0;
  const totalValue = products?.reduce(
    (sum, product) => sum + Number(product.price) * product.stock,
    0
  );
  const lowStockProducts = products?.filter((product) => product.stock < 10).length || 0;

  return (
    <div className="min-h-screen">
      <MainNav />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Link href="/admin/products">
            <Button>
              <Package className="mr-2 h-4 w-4" />
              Manage Products
            </Button>
          </Link>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                Active products in catalog
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalValue?.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Total value of stock
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,234</div>
              <p className="text-xs text-muted-foreground">
                +8.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Alert</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lowStockProducts}</div>
              <p className="text-xs text-muted-foreground">
                Products below threshold
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="mb-8">
  <Card>
    <CardHeader>
      <CardTitle>Active Promotions</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {promotions?.map((promotion) => (
          <div key={promotion.id} className="flex items-center justify-between p-4 border rounded">
            <div>
              <h3 className="font-semibold">{promotion.title}</h3>
              <p className="text-sm text-muted-foreground">{promotion.description}</p>
              <p className="text-sm">Discount: {promotion.discount}%</p>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Starts: {new Date(promotion.startDate).toLocaleDateString()}</p>
              <p>Ends: {new Date(promotion.endDate).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="hsl(var(--muted))"
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="hsl(var(--primary))" />
                    <Bar dataKey="profit" fill="hsl(var(--secondary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials Section */}
        <div className="mb-8">
          <TestimonialSection />
        </div>
      </div>
    </div>
  );
}