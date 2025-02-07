import React from "react";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface PrivacyStepProps {
  onNext?: () => void;
  onBack?: () => void;
  privacyLevel?: "private" | "family" | "public";
  distributionType?: "immediate" | "scheduled" | "posthumous";
  scheduledDate?: Date;
}

const PrivacyStep = ({
  onNext = () => {},
  onBack = () => {},
  privacyLevel = "private",
  distributionType = "immediate",
  scheduledDate = new Date(),
}: PrivacyStepProps) => {
  const [selectedPrivacy, setSelectedPrivacy] = React.useState(privacyLevel);
  const [selectedDistribution, setSelectedDistribution] =
    React.useState(distributionType);
  const [date, setDate] = React.useState<Date | undefined>(scheduledDate);

  return (
    <div className="w-full min-h-[500px] bg-background p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-primary">Sharing Options</h2>
        <p className="text-muted-foreground text-lg">
          Choose how you want to share your cherished recipe
        </p>
      </div>
      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Sharing Level</h3>
          <RadioGroup
            defaultValue={selectedPrivacy}
            onValueChange={(value: "private" | "family" | "public") =>
              setSelectedPrivacy(value)
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private" id="private" />
              <Label htmlFor="private">Private - Only visible to me</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="select-family" id="select-family" />
              <Label htmlFor="select-family">
                Select Family and Friends - Share with specific people
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all-family" id="all-family" />
              <Label htmlFor="all-family">
                All Family and Friends - Share with everyone in your family code
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="public" id="public" />
              <Label htmlFor="public">Public - Anyone can view</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Distribution Timing</h3>
          <RadioGroup
            defaultValue={selectedDistribution}
            onValueChange={(value: "immediate" | "scheduled" | "posthumous") =>
              setSelectedDistribution(value)
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="immediate" id="immediate" />
              <Label htmlFor="immediate">Share Immediately</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="scheduled" id="scheduled" />
              <Label htmlFor="scheduled">
                Schedule (Holiday, Event, Specific Date)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="posthumous" id="posthumous" />
              <Label htmlFor="posthumous">Share Posthumously</Label>
            </div>
          </RadioGroup>

          {selectedDistribution === "scheduled" && (
            <div className="flex flex-col space-y-2">
              <Label>Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </Card>
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>Continue</Button>
      </div>
    </div>
  );
};

export default PrivacyStep;
