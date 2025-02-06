
import { Star, StarHalf, Quote } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Mock testimonial data (replace with real data from API when available)
const testimonials = [
  {
    id: 1,
    customerName: "John Doe",
    rating: 5,
    review: "Amazing platform! The admin dashboard makes it so easy to manage products and track sales.",
    date: "2024-01-15",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    rating: 4.5,
    review: "Great features and intuitive interface. Would highly recommend for any e-commerce business.",
    date: "2024-01-20",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  },
  {
    id: 3,
    customerName: "Mike Johnson",
    rating: 5,
    review: "The analytics features are incredibly helpful for making business decisions.",
    date: "2024-01-25",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
  },
  {
    id: 4,
    customerName: "Sarah Williams",
    rating: 4.5,
    review: "Customer support is fantastic. They helped me set up my store quickly.",
    date: "2024-02-01",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex items-center gap-1 text-yellow-400">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
      {hasHalfStar && <StarHalf className="h-4 w-4 fill-current" />}
    </div>
  );
}

export function TestimonialSection() {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative">
              <CardContent className="pt-6">
                <Quote className="absolute top-4 right-4 h-6 w-6 text-primary/20" />
                <div className="mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.customerName}
                    className="w-12 h-12 rounded-full mb-2"
                  />
                  <StarRating rating={testimonial.rating} />
                </div>
                <p className="mb-4 text-sm text-muted-foreground italic">
                  "{testimonial.review}"
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{testimonial.customerName}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(testimonial.date).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
