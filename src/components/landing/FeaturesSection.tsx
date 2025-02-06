import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight, Code, Layers, Zap, Shield, Users } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeaturesSectionProps {
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    title: "Lightning Fast",
    description:
      "Experience blazing fast performance with our optimized platform.",
    icon: <Zap className="w-8 h-8 text-primary" />,
  },
  {
    title: "Secure by Design",
    description: "Built with security first mindset to protect your data.",
    icon: <Shield className="w-8 h-8 text-primary" />,
  },
  {
    title: "Modern Stack",
    description: "Built using the latest technologies and best practices.",
    icon: <Code className="w-8 h-8 text-primary" />,
  },
  {
    title: "Scalable Architecture",
    description: "Designed to grow with your needs from day one.",
    icon: <Layers className="w-8 h-8 text-primary" />,
  },
  {
    title: "Team Collaboration",
    description: "Built for teams to work together seamlessly.",
    icon: <Users className="w-8 h-8 text-primary" />,
  },
  {
    title: "Easy Integration",
    description: "Integrates easily with your existing workflow.",
    icon: <ArrowRight className="w-8 h-8 text-primary" />,
  },
];

const FeaturesSection = ({
  features = defaultFeatures,
}: FeaturesSectionProps) => {
  return (
    <section className="w-full py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build and grow your project, all in one
            place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border border-border hover:border-primary transition-colors duration-300"
            >
              <CardContent className="p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
