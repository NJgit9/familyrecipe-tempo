import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RecipeInputStep from "./steps/RecipeInputStep";
import StoryStep from "./steps/StoryStep";
import PresentationStep from "./steps/PresentationStep";
import PrivacyStep from "./steps/PrivacyStep";
import RecipientsStep from "./steps/RecipientsStep";
import ReviewStep from "./steps/ReviewStep";

type PrivacyLevel = "private" | "select-family" | "all-family" | "public";
type DistributionType = "immediate" | "scheduled" | "posthumous";

interface RecipeFormData {
  recipeInput: {
    photos: string[];
    ingredients: string[];
    directions: string[];
    voiceRecordings: string[];
  };
  story: {
    storyText: string;
    memoryPhotos: string[];
    voiceRecordings: string[];
  };
  presentation: {
    photo: string;
  };
  privacy: {
    privacyLevel: PrivacyLevel;
    distributionType: DistributionType;
    scheduledDate?: Date;
  };
  recipients?: {
    recipients: Array<{
      id: string;
      type: "individual" | "family";
      name: string;
      email?: string;
      phone?: string;
      address?: string;
      message?: string;
      photos?: string[];
      voiceRecording?: string;
    }>;
  };
}

interface RecipeWizardProps {
  onComplete?: (data: RecipeFormData) => void;
  initialData?: Partial<RecipeFormData>;
}

const RecipeWizard = ({
  onComplete = () => {},
  initialData = {},
}: RecipeWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<RecipeFormData>({
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
        title: "Sharing Options",
        component: PrivacyStep,
        props: {
          ...formData.privacy,
          onNext: (data: any) => {
            setFormData({ ...formData, privacy: data });
            // If select-family is chosen, go to recipients step, otherwise go to review
            setCurrentStep(data.privacyLevel === "select-family" ? 4 : 5);
          },
          onBack: () => setCurrentStep(2),
        },
      },
    ];

    // Add Recipients step if privacy level is select-family
    if (formData.privacy.privacyLevel === "select-family") {
      baseSteps.push({
        title: "Recipients",
        component: RecipientsStep,
        props: {
          initialData: formData.recipients,
          onNext: (data: any) => {
            setFormData({ ...formData, recipients: data });
            setCurrentStep(5);
          },
          onBack: () => setCurrentStep(3),
        },
      });
    }

    // Always add Review as the final step
    baseSteps.push({
      title: "Review",
      component: ReviewStep,
      props: {
        recipeData: {
          ...formData.recipeInput,
          ...formData.story,
          ...formData.presentation,
          ...formData.privacy,
          ...(formData.recipients && { recipients: formData.recipients }),
        },
        onConfirm: () => onComplete(formData),
        onBack: () =>
          setCurrentStep(
            formData.privacy.privacyLevel === "select-family" ? 4 : 3,
          ),
      },
    });

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
