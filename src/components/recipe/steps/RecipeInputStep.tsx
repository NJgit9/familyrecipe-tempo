import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Camera, Mic, Plus, X } from "lucide-react";

interface RecipeInputStepProps {
  onNext?: () => void;
  onBack?: () => void;
  initialData?: {
    photos: string[];
    ingredients: string[];
    directions: string[];
    voiceRecordings: string[];
  };
}

const RecipeInputStep = ({
  onNext = () => {},
  onBack = () => {},
  initialData = {
    photos: [
      "https://images.unsplash.com/photo-1495521821757-a1efb6729352",
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543",
    ],
    ingredients: ["2 cups flour", "1 cup sugar", "3 eggs"],
    directions: ["Mix dry ingredients", "Add wet ingredients", "Bake at 350°F"],
    voiceRecordings: ["recording1.mp3"],
  },
}: RecipeInputStepProps) => {
  const [photos, setPhotos] = useState(initialData.photos);
  const [ingredients, setIngredients] = useState(initialData.ingredients);
  const [directions, setDirections] = useState(initialData.directions);
  const [newIngredient, setNewIngredient] = useState("");
  const [newDirection, setNewDirection] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleAddPhoto = () => {
    // Placeholder for photo upload functionality
    const newPhoto =
      "https://images.unsplash.com/photo-1495521821757-a1efb6729352";
    setPhotos([...photos, newPhoto]);
  };

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient("");
    }
  };

  const handleAddDirection = () => {
    if (newDirection.trim()) {
      setDirections([...directions, newDirection]);
      setNewDirection("");
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleRemoveDirection = (index: number) => {
    setDirections(directions.filter((_, i) => i !== index));
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="w-full min-h-screen bg-white p-6">
      <Card className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-6">Recipe Details</h2>

        {/* Photo Upload Section */}
        <section className="mb-8">
          <h3 className="text-xl font-medium mb-4">Recipe Card Photos</h3>
          <div className="flex flex-wrap gap-4 mb-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative w-32 h-32">
                <img
                  src={photo}
                  alt={`Recipe ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={() =>
                    setPhotos(photos.filter((_, i) => i !== index))
                  }
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <Button
              onClick={handleAddPhoto}
              variant="outline"
              className="w-32 h-32 flex flex-col items-center justify-center gap-2"
            >
              <Camera size={24} />
              <span>Add Photo</span>
            </Button>
          </div>
        </section>

        {/* Ingredients Section */}
        <section className="mb-8">
          <h3 className="text-xl font-medium mb-4">Ingredients</h3>
          <div className="flex gap-2 mb-4">
            <Input
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              placeholder="Add an ingredient"
              className="flex-1"
            />
            <Button onClick={handleAddIngredient}>
              <Plus size={20} />
            </Button>
          </div>
          <ScrollArea className="h-48 w-full rounded-md border p-4">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <span>{ingredient}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
          </ScrollArea>
        </section>

        {/* Directions Section */}
        <section className="mb-8">
          <h3 className="text-xl font-medium mb-4">Directions</h3>
          <div className="flex gap-2 mb-4">
            <Textarea
              value={newDirection}
              onChange={(e) => setNewDirection(e.target.value)}
              placeholder="Add a direction"
              className="flex-1"
            />
            <Button onClick={handleAddDirection}>
              <Plus size={20} />
            </Button>
          </div>
          <ScrollArea className="h-48 w-full rounded-md border p-4">
            {directions.map((direction, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <span className="flex-1">{direction}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveDirection(index)}
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
          </ScrollArea>
        </section>

        {/* Voice Recording Section */}
        <section className="mb-8">
          <h3 className="text-xl font-medium mb-4">Voice Recording</h3>
          <div className="flex items-center gap-4">
            <Button
              onClick={toggleRecording}
              variant={isRecording ? "destructive" : "default"}
              className="flex items-center gap-2"
            >
              <Mic size={20} />
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Button>
            <span className="text-sm text-gray-500">
              {isRecording
                ? "Recording in progress..."
                : "Click to record your story"}
            </span>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext}>Next</Button>
        </div>
      </Card>
    </div>
  );
};

export default RecipeInputStep;
