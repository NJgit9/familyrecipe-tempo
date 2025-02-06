import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Wand2 } from "lucide-react";

interface PresentationStepProps {
  onNext?: () => void;
  onBack?: () => void;
  initialPhoto?: string;
}

const PresentationStep = ({
  onNext = () => {},
  onBack = () => {},
  initialPhoto = "",
}: PresentationStepProps) => {
  const [photo, setPhoto] = useState(initialPhoto);
  const [loading, setLoading] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real implementation, this would handle file upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAIGenerate = () => {
    setLoading(true);
    // Simulate AI generation with a placeholder image
    setTimeout(() => {
      setPhoto("https://images.unsplash.com/photo-1546069901-ba9599a7e63c");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full min-h-[600px] bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8">
        Final Dish Presentation
      </h2>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Photo
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Wand2 className="w-4 h-4" />
            AI Generate
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card className="p-6">
            <div className="space-y-4">
              <Label htmlFor="photo-upload">
                Upload a photo of your finished dish
              </Label>
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="mb-4"
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="ai">
          <Card className="p-6">
            <div className="space-y-4">
              <Label>Generate an AI representation of your dish</Label>
              <Button
                onClick={handleAIGenerate}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Generating..." : "Generate Image"}
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {photo && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Preview</h3>
          <div className="w-full h-64 rounded-lg overflow-hidden">
            <img
              src={photo}
              alt="Dish preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!photo}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PresentationStep;
