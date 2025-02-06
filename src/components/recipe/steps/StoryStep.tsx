import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Camera, Mic, X } from "lucide-react";

interface StoryStepProps {
  onNext?: (data: any) => void;
  onBack?: () => void;
  initialData?: {
    storyText: string;
    memoryPhotos: string[];
    voiceRecordings: string[];
  };
}

const StoryStep = ({
  onNext = () => {},
  onBack = () => {},
  initialData = {
    storyText: "",
    memoryPhotos: [],
    voiceRecordings: [],
  },
}: StoryStepProps) => {
  const [storyText, setStoryText] = useState(initialData.storyText);
  const [photos, setPhotos] = useState(initialData.memoryPhotos);
  const [isRecording, setIsRecording] = useState(false);

  const handleAddPhoto = () => {
    // Placeholder for photo upload functionality
    const newPhoto =
      "https://images.unsplash.com/photo-1596464716127-f2a82984de30";
    setPhotos([...photos, newPhoto]);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleNext = () => {
    onNext({
      storyText,
      memoryPhotos: photos,
      voiceRecordings: [], // Would contain actual recordings in production
    });
  };

  return (
    <div className="w-full min-h-[600px] bg-white p-6">
      <Card className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-6">Recipe Story & Memories</h2>

        {/* Story Text Section */}
        <section className="mb-8">
          <Label htmlFor="story" className="text-xl font-medium block mb-4">
            Share Your Story
          </Label>
          <Textarea
            id="story"
            value={storyText}
            onChange={(e) => setStoryText(e.target.value)}
            placeholder="Share the story behind this recipe... What makes it special? What memories do you have of making or eating it? What's its origin story?"
            className="min-h-[200px] mb-2"
          />
        </section>

        {/* Memory Photos Section */}
        <section className="mb-8">
          <h3 className="text-xl font-medium mb-4">Memory Photos</h3>
          <div className="flex flex-wrap gap-4 mb-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative w-32 h-32">
                <img
                  src={photo}
                  alt={`Memory ${index + 1}`}
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

        {/* Voice Recording Section */}
        <section className="mb-8">
          <h3 className="text-xl font-medium mb-4">Voice Memories</h3>
          <div className="flex items-center gap-4">
            <Button
              onClick={toggleRecording}
              variant={isRecording ? "destructive" : "default"}
              className="flex items-center gap-2"
            >
              <Mic size={20} />
              {isRecording ? "Stop Recording" : "Record Memory"}
            </Button>
            <span className="text-sm text-gray-500">
              {isRecording
                ? "Recording in progress..."
                : "Share your memories through voice"}
            </span>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
      </Card>
    </div>
  );
};

export default StoryStep;
