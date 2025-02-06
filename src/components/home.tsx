import React from "react";
import RecipeWizard from "./recipe/RecipeWizard";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ChefHat, Heart } from "lucide-react";

const Home = () => {
  const handleRecipeComplete = (data: any) => {
    console.log("Recipe completed:", data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <Card className="mb-8 p-8 text-center bg-white/80 backdrop-blur">
          <ChefHat className="w-16 h-16 mx-auto mb-4 text-amber-600" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Family Recipe Legacy
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Preserve and share your cherished family recipes for generations to
            come
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700"
              onClick={() =>
                window.scrollTo({
                  top: document.getElementById("recipe-wizard")?.offsetTop,
                  behavior: "smooth",
                })
              }
            >
              Start Preserving
            </Button>
          </div>
        </Card>

        {/* Recipe Wizard Section */}
        <div id="recipe-wizard" className="scroll-mt-8">
          <Card className="p-6 bg-white/90 backdrop-blur">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Create Your Legacy Recipe
              </h2>
            </div>
            <RecipeWizard onComplete={handleRecipeComplete} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
