import React from "react";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Star } from "lucide-react";

interface TestimonialProps {
  testimonials?: Array<{
    id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    avatar: string;
    rating: number;
  }>;
}

const defaultTestimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    content:
      "This platform has transformed how we handle our daily operations. The efficiency gains are remarkable!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    rating: 5,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Product Manager",
    company: "InnovateLabs",
    content:
      "The features and user experience are unmatched. It's been a game-changer for our team.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    rating: 5,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "CEO",
    company: "StartupX",
    content:
      "We've seen a 40% increase in productivity since implementing this solution. Highly recommended!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    rating: 4,
  },
];

const TestimonialsSection = ({
  testimonials = defaultTestimonials,
}: TestimonialProps) => {
  return (
    <section className="w-full py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from some of our satisfied
            customers about their experience with our platform.
          </p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 fill-yellow-400 text-yellow-400"
                          />
                        ),
                      )}
                    </div>
                    <p className="text-gray-700">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
