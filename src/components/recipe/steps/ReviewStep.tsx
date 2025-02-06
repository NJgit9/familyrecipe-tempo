import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

interface ReviewStepProps {
  onBack?: () => void;
  onConfirm?: () => void;
  recipeData?: {
    title: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    image: string;
    privacy: string;
    timing: string;
  };
}

const ReviewStep = ({
  onBack = () => {},
  onConfirm = () => {},
  recipeData = {
    title: "Grandma's Apple Pie",
    description: "A cherished family recipe passed down through generations",
    ingredients: [
      "6 cups sliced apples",
      "1 cup sugar",
      "1 teaspoon cinnamon",
      "2 pie crusts",
    ],
    instructions: [
      "Preheat oven to 375°F",
      "Mix apples with sugar and cinnamon",
      "Place mixture in pie crust",
      "Cover with top crust and bake for 45 minutes",
    ],
    image: "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5",
    privacy: "Family Only",
    timing: "Immediate",
  },
}: ReviewStepProps) => {
  return (
    <div className="w-full min-h-[700px] bg-white p-6 rounded-lg shadow-lg">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-gray-900">
            Review Your Recipe
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <Button onClick={onConfirm} className="flex items-center gap-2">
              Confirm
              <Check className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img
                src={recipeData.image}
                alt={recipeData.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="mt-4 space-y-2">
                <h3 className="text-2xl font-semibold">{recipeData.title}</h3>
                <p className="text-gray-600">{recipeData.description}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-2">Sharing Settings</h4>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Privacy:</span>{" "}
                    {recipeData.privacy}
                  </p>
                  <p>
                    <span className="font-medium">Distribution:</span>{" "}
                    {recipeData.timing}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-lg font-semibold mb-2">Ingredients</h4>
                <ScrollArea className="h-32">
                  <ul className="list-disc list-inside space-y-1">
                    {recipeData.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-gray-600">
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>

              <Separator />

              <div>
                <h4 className="text-lg font-semibold mb-2">Instructions</h4>
                <ScrollArea className="h-48">
                  <ol className="list-decimal list-inside space-y-2">
                    {recipeData.instructions.map((instruction, index) => (
                      <li key={index} className="text-gray-600">
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </ScrollArea>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReviewStep;
