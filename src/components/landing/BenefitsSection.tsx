import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

interface BenefitProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  isReversed?: boolean;
}

interface BenefitsSectionProps {
  benefits?: BenefitProps[];
}

const defaultBenefits: BenefitProps[] = [
  {
    title: "Easy to Use",
    description:
      "Our platform is designed with simplicity in mind, making it accessible for everyone regardless of technical expertise.",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60",
    imageAlt: "Person using laptop easily",
  },
  {
    title: "Powerful Analytics",
    description:
      "Get deep insights into your data with our advanced analytics tools and visualization capabilities.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    imageAlt: "Analytics dashboard",
    isReversed: true,
  },
  {
    title: "24/7 Support",
    description:
      "Our dedicated support team is always available to help you with any questions or issues you may have.",
    imageUrl:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60",
    imageAlt: "Customer support representative",
  },
];

const BenefitCard = ({
  title,
  description,
  imageUrl,
  imageAlt,
  isReversed = false,
}: BenefitProps) => {
  const contentOrder = isReversed ? "order-2" : "order-1";
  const imageOrder = isReversed ? "order-1" : "order-2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row items-center gap-8 py-12 px-4"
    >
      <div className={`w-full md:w-1/2 ${contentOrder}`}>
        <h3 className="text-3xl font-bold mb-4">{title}</h3>
        <p className="text-lg text-gray-600 mb-6">{description}</p>
        <Button variant="secondary">Learn More</Button>
      </div>
      <div className={`w-full md:w-1/2 ${imageOrder}`}>
        <img
          src={imageUrl}
          alt={imageAlt}
          className="rounded-lg shadow-xl w-full h-[300px] object-cover"
        />
      </div>
    </motion.div>
  );
};

const BenefitsSection = ({
  benefits = defaultBenefits,
}: BenefitsSectionProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-xl text-gray-600">
            Discover the advantages that set us apart
          </p>
        </div>
        <div className="space-y-16">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
