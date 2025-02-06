import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

interface FooterSectionProps {
  navigationLinks?: Array<{ label: string; href: string }>;
  socialLinks?: Array<{ icon: React.ReactNode; href: string }>;
  onNewsletterSubmit?: (email: string) => void;
}

const FooterSection = ({
  navigationLinks = [
    { label: "About", href: "#" },
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Privacy", href: "#" },
  ],
  socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#" },
    { icon: <Twitter className="h-5 w-5" />, href: "#" },
    { icon: <Instagram className="h-5 w-5" />, href: "#" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#" },
  ],
  onNewsletterSubmit = (email: string) =>
    console.log("Newsletter signup:", email),
}: FooterSectionProps) => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNewsletterSubmit(email);
    setEmail("");
  };

  return (
    <footer className="bg-background w-full py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Company Name</h3>
            <p className="text-muted-foreground">
              Making the world a better place through innovative solutions.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              {navigationLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" variant="secondary">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect With Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Company Name. All rights reserved.
            </p>
            <Button variant="link" className="text-sm text-muted-foreground">
              Get Started Now
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
