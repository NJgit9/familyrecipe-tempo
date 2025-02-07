import React from "react";
import { Button } from "./ui/button";
import { Utensils, Heart, Share2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useNavigate } from "react-router-dom";
import { LoginDialog } from "./auth/LoginDialog";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLoginDialog, setShowLoginDialog] = React.useState(false);

  const handleStartJourney = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      setShowLoginDialog(true);
    }
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-amber-50 to-orange-50 p-8 md:p-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-[#1B2559]">
              Preserve Your{" "}
              <span className="text-[#E67E22]">Family's Recipe Legacy</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              Pass down your cherished family recipes and cooking memories to
              the next generation. Every shared moment in the kitchen becomes a
              treasured family story. Preserve your memories for generations!
            </p>
            <Button
              size="lg"
              className="bg-[#E67E22] hover:bg-[#D35400] text-white px-8 py-6 text-xl"
              onClick={handleStartJourney}
            >
              Start Your Recipe Journey
            </Button>
          </div>
          <div className="relative">
            <img
              src="https://www.peergroupinstitute.com/images/marketing/family-recipe-landing-760x540.png"
              alt="Family cooking together"
              className="rounded-2xl shadow-xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1B2559] mb-16">
          Keep Your Family's Recipes Alive
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Utensils className="w-12 h-12 text-[#E67E22]" />
            </div>
            <h3 className="text-xl font-semibold">Easy Recipe Recording</h3>
            <p className="text-gray-600">
              Document your recipes with photos, voice recordings, and detailed
              instructions
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Heart className="w-12 h-12 text-[#E67E22]" />
            </div>
            <h3 className="text-xl font-semibold">Share Family Stories</h3>
            <p className="text-gray-600">
              Add personal memories and stories behind each cherished recipe
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Share2 className="w-12 h-12 text-[#E67E22]" />
            </div>
            <h3 className="text-xl font-semibold">Connect Generations</h3>
            <p className="text-gray-600">
              Share your culinary heritage with family members near and far
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-b from-amber-50 to-orange-50 py-16 px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B2559]">
            Start Preserving Your Family's Recipe Legacy Today
          </h2>
          <p className="text-gray-600 text-lg">
            Don't let cherished family recipes fade away. Create your digital
            recipe collection now.
          </p>
          <Button
            size="lg"
            className="bg-[#E67E22] hover:bg-[#D35400] text-white px-8 py-6 text-xl"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Begin Your Collection
          </Button>
        </div>
      </section>
      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
    </div>
  );
};

export default Home;
