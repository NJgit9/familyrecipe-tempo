import React from "react";
import RecipeWizard from "./recipe/RecipeWizard";
import RecipeCard from "./recipe/RecipeCard";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ChefHat, Heart, Plus } from "lucide-react";

const Dashboard = () => {
  // Mock data for recipes - in a real app, this would come from your backend
  const recipes = [
    {
      title: "Grandma's Apple Pie",
      image: "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5",
      sharedWith: "Family",
      shareDate: "2024-02-06",
      shareType: "immediate",
      story:
        "This recipe has been in our family for five generations. My grandmother taught me how to make this pie when I was just eight years old. Every Thanksgiving, we would wake up early and spend the whole morning in the kitchen together, carefully preparing the crust and filling. The smell of cinnamon and apples would fill the entire house. She always said the secret was in the love we put into making it together.",
      memoryPhotos: [
        "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078",
        "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38",
      ],
    },
    {
      title: "Mom's Secret Meatballs",
      image: "https://images.unsplash.com/photo-1529042410759-befb1204b468",
      sharedWith: "Private",
      shareDate: "2024-02-05",
      shareType: "posthumous",
      story:
        "Mom would make these meatballs every Sunday. The recipe came from her mother in Italy, and she always said that the secret ingredient was patience. We'd spend hours in the kitchen, and she'd tell stories about her childhood while the sauce simmered. Now, every time I make them, I feel like she's right there with me.",
      memoryPhotos: [
        "https://images.unsplash.com/photo-1515516969-d4008cc6241a",
        "https://images.unsplash.com/photo-1546549032-9571cd6b27df",
      ],
    },
    {
      title: "Aunt Mary's Christmas Cookies",
      image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9",
      sharedWith: "Extended Family",
      shareDate: "2024-02-04",
      shareType: "scheduled",
      story:
        "Aunt Mary's Christmas cookies were legendary in our family. Every December, she'd invite all the kids over to help decorate them. The kitchen would be covered in sprinkles and icing, and we'd always end up with more sugar on us than on the cookies! These memories are what Christmas tastes like to me.",
      memoryPhotos: [
        "https://images.unsplash.com/photo-1545015451-7ff6e9998383",
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35",
      ],
    },
  ];

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

        {/* Recipes Grid Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Your Recipe Collection
            </h2>
            <Button
              onClick={() =>
                window.scrollTo({
                  top: document.getElementById("recipe-wizard")?.offsetTop,
                  behavior: "smooth",
                })
              }
              className="bg-amber-600 hover:bg-amber-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Recipe
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} {...recipe} />
            ))}
          </div>
        </div>

        {/* Recipe Wizard Section */}
        <div id="recipe-wizard" className="scroll-mt-8">
          <Card className="p-6 bg-white/90 backdrop-blur w-full max-w-[1400px] mx-auto">
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

export default Dashboard;
