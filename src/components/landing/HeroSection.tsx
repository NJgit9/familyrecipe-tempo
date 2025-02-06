import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const HeroSection = ({
  title = "Transform Your Cooking Experience",
  subtitle = "Join our community of home chefs and discover the joy of creating delicious, authentic recipes passed down through generations.",
  ctaText = "Get Started Free",
  onCtaClick = () => console.log("CTA clicked"),
}: HeroSectionProps) => {
  return (
    <div className="relative min-h-[800px] w-full bg-background">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background/80" />

      {/* Hero content */}
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl">
            {subtitle}
          </p>

          <Button size="lg" onClick={onCtaClick} className="group text-lg">
            {ctaText}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {[
              {
                title: "Family Recipes",
                description: "Access thousands of authentic family recipes",
              },
              {
                title: "Step-by-Step Guidance",
                description:
                  "Clear instructions for perfect results every time",
              },
              {
                title: "Community Support",
                description: "Connect with passionate home chefs worldwide",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default HeroSection;
