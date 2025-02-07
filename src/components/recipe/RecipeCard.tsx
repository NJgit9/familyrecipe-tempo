import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  Share2,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  Camera,
  BookOpen,
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

interface RecipeCardProps {
  title: string;
  image: string;
  sharedWith: string;
  shareDate: string;
  shareType: "immediate" | "scheduled" | "posthumous";
  story?: string;
  memoryPhotos?: string[];
}

const RecipeCard = ({
  title = "Grandma's Apple Pie",
  image = "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5",
  sharedWith = "Family",
  shareDate = "2024-02-06",
  shareType = "immediate",
  story = "This recipe has been in our family for generations. My grandmother taught me how to make this pie when I was just a little girl. Every Thanksgiving, we would wake up early and spend the whole morning in the kitchen together, carefully preparing the crust and filling. The smell of cinnamon and apples would fill the entire house...",
  memoryPhotos = [
    "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078",
    "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38",
  ],
}: RecipeCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 space-y-3">
        <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>Shared with {sharedWith}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{new Date(shareDate).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Share2 className="w-4 h-4" />
          <span className="capitalize">{shareType} sharing</span>
        </div>

        <Button
          variant="ghost"
          className="w-full flex items-center gap-2 mt-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" /> Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" /> Show Story & Memories
            </>
          )}
        </Button>

        {isExpanded && (
          <div className="pt-4 border-t space-y-4">
            {/* Story Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-900">
                <BookOpen className="w-4 h-4" />
                <h4 className="font-medium">Recipe Story</h4>
              </div>
              <ScrollArea className="h-32">
                <p className="text-gray-600 text-sm">{story}</p>
              </ScrollArea>
            </div>

            {/* Memory Photos Section */}
            {memoryPhotos && memoryPhotos.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-900">
                  <Camera className="w-4 h-4" />
                  <h4 className="font-medium">Memory Photos</h4>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {memoryPhotos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Memory ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default RecipeCard;
