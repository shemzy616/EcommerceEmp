import { Star, StarHalf } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

// Mock testimonial data (replace with real data from API when available)
const testimonials = [
  {
    id: 1,
    customerName: "John Doe",
    rating: 5,
    review: "Amazing platform! The admin dashboard makes it so easy to manage products and track sales.",
    date: "2024-01-15",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    rating: 4.5,
    review: "Great features and intuitive interface. Would highly recommend for any e-commerce business.",
    date: "2024-01-20",
  },
  {
    id: 3,
    customerName: "Mike Johnson",
    rating: 5,
    review: "The analytics features are incredibly helpful for making business decisions.",
    date: "2024-01-25",
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
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">Customer Testimonials</h2>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="pt-6">
                <div className="mb-2">
                  <StarRating rating={testimonial.rating} />
                </div>
                <p className="mb-4 text-sm text-muted-foreground">
                  {testimonial.review}
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
      </CardContent>
    </Card>
  );
}
