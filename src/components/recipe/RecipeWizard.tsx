import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RecipeInputStep from "./steps/RecipeInputStep";
import StoryStep from "./steps/StoryStep";
import PresentationStep from "./steps/PresentationStep";
import PrivacyStep from "./steps/PrivacyStep";
import RecipientsStep from "./steps/RecipientsStep";
import ReviewStep from "./steps/ReviewStep";

interface RecipeWizardProps {
  onComplete?: (data: any) => void;
  initialData?: any;
}

const RecipeWizard = ({
  onComplete = () => {},
  initialData = {},
}: RecipeWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    recipeInput: {
      photos: [],
      ingredients: [],
      directions: [],
      voiceRecordings: [],
    },
    story: {
      storyText: "",
      memoryPhotos: [],
      voiceRecordings: [],
    },
    presentation: {
      photo: "",
    },
    privacy: {
      privacyLevel: "private",
      distributionType: "immediate",
      scheduledDate: new Date(),
    },
    recipients: {
      recipients: [],
    },
    ...initialData,
  });

  const getSteps = () => {
    const baseSteps = [
      {
        title: "Recipe Details",
        component: RecipeInputStep,
        props: {
          initialData: formData.recipeInput,
          onNext: (data: any) => {
            setFormData({ ...formData, recipeInput: data });
            setCurrentStep(1);
          },
        },
      },
      {
        title: "Story",
        component: StoryStep,
        props: {
          initialData: formData.story,
          onNext: (data: any) => {
            setFormData({ ...formData, story: data });
            setCurrentStep(2);
          },
          onBack: () => setCurrentStep(0),
        },
      },
      {
        title: "Presentation",
        component: PresentationStep,
        props: {
          initialPhoto: formData.presentation.photo,
          onNext: (data: any) => {
            setFormData({ ...formData, presentation: data });
            setCurrentStep(3);
          },
          onBack: () => setCurrentStep(1),
        },
      },
      {
        title: "Privacy Settings",
        component: PrivacyStep,
        props: {
          ...formData.privacy,
          onNext: (data: any) => {
            setFormData({ ...formData, privacy: data });
            setCurrentStep(4);
          },
          onBack: () => setCurrentStep(2),
        },
      },
      {
        title: "Review",
        component: ReviewStep,
        props: {
          recipeData: {
            ...formData.recipeInput,
            ...formData.story,
            ...formData.presentation,
            ...formData.privacy,
          },
          onConfirm: () => onComplete(formData),
          onBack: () => setCurrentStep(3),
        },
      },
    ];

    // Insert Recipients step before Review if privacy level is family
    if (formData.privacy.privacyLevel === "family") {
      baseSteps.splice(baseSteps.length - 1, 0, {
        title: "Recipients",
        component: RecipientsStep,
        props: {
          initialData: formData.recipients,
          onNext: (data: any) => {
            setFormData({ ...formData, recipients: data });
            setCurrentStep(currentStep + 1);
          },
          onBack: () => setCurrentStep(currentStep - 1),
        },
      });
    }

    return baseSteps;
  };

  const steps = getSteps();
  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Card className="max-w-6xl mx-auto bg-white">
        <div className="p-6">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`text-sm font-medium ${
                    index <= currentStep ? "text-primary" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </div>
              ))}
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Step Content */}
          <CurrentStepComponent {...steps[currentStep].props} />
        </div>
      </Card>
    </div>
  );
};

export default RecipeWizard;
