import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Camera, Mic, Plus, Trash2, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Recipient {
  id: string;
  type: "individual" | "family";
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  message?: string;
  photos?: string[];
  voiceRecording?: string;
}

interface RecipientsStepProps {
  onNext?: (data: { recipients: Recipient[] }) => void;
  onBack?: () => void;
  initialData?: {
    recipients: Recipient[];
  };
}

const RecipientsStep = ({
  onNext = () => {},
  onBack = () => {},
  initialData = {
    recipients: [],
  },
}: RecipientsStepProps) => {
  const [recipients, setRecipients] = useState<Recipient[]>(
    initialData.recipients,
  );
  const [currentRecipient, setCurrentRecipient] = useState<Recipient>({
    id: "",
    type: "individual",
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
    photos: [],
  });
  const [isRecording, setIsRecording] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleAddPhoto = (recipientId: string) => {
    const newPhoto =
      "https://images.unsplash.com/photo-1596464716127-f2a82984de30";
    setRecipients(
      recipients.map((r) =>
        r.id === recipientId
          ? { ...r, photos: [...(r.photos || []), newPhoto] }
          : r,
      ),
    );
  };

  const handleAddRecipient = () => {
    if (currentRecipient.name) {
      const newId = Date.now().toString();
      setRecipients([{ ...currentRecipient, id: newId }, ...recipients]);
      setExpandedItems([newId]); // Open only the new recipient's accordion
      setCurrentRecipient({
        id: "",
        type: "individual",
        name: "",
        email: "",
        phone: "",
        address: "",
        message: "",
        photos: [],
      });
    }
  };

  const handleRemoveRecipient = (id: string) => {
    setRecipients(recipients.filter((r) => r.id !== id));
    setExpandedItems(expandedItems.filter((item) => item !== id));
  };

  const toggleRecording = (recipientId: string) => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="w-full min-h-[600px] bg-white p-6">
      <Card className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-6">Add Recipients</h2>

        {/* Add New Recipient Form */}
        <section className="mb-8 p-4 border rounded-lg">
          <h3 className="text-xl font-medium mb-4">New Recipient</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label>Type</Label>
              <select
                className="w-full p-2 border rounded"
                value={currentRecipient.type}
                onChange={(e) =>
                  setCurrentRecipient({
                    ...currentRecipient,
                    type: e.target.value as "individual" | "family",
                  })
                }
              >
                <option value="individual">Individual</option>
                <option value="family">Family</option>
              </select>
            </div>
            <div>
              <Label>Name</Label>
              <Input
                value={currentRecipient.name}
                onChange={(e) =>
                  setCurrentRecipient({
                    ...currentRecipient,
                    name: e.target.value,
                  })
                }
                placeholder="Enter name"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={currentRecipient.email}
                onChange={(e) =>
                  setCurrentRecipient({
                    ...currentRecipient,
                    email: e.target.value,
                  })
                }
                placeholder="Enter email"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                type="tel"
                value={currentRecipient.phone}
                onChange={(e) =>
                  setCurrentRecipient({
                    ...currentRecipient,
                    phone: e.target.value,
                  })
                }
                placeholder="Enter phone number"
              />
            </div>
          </div>
          <div className="mb-4">
            <Label>Address</Label>
            <Input
              value={currentRecipient.address}
              onChange={(e) =>
                setCurrentRecipient({
                  ...currentRecipient,
                  address: e.target.value,
                })
              }
              placeholder="Enter address"
            />
          </div>
          <Button
            onClick={handleAddRecipient}
            disabled={!currentRecipient.name}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Recipient
          </Button>
        </section>

        {/* Recipients List */}
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <Accordion
            type="multiple"
            value={expandedItems}
            onValueChange={setExpandedItems}
            className="space-y-4"
          >
            {recipients.map((recipient) => (
              <AccordionItem
                key={recipient.id}
                value={recipient.id}
                className="border rounded-lg p-2"
              >
                <div className="flex items-center justify-between">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-col items-start">
                      <span className="text-lg font-semibold">
                        {recipient.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Click to expand
                      </span>
                    </div>
                  </AccordionTrigger>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveRecipient(recipient.id);
                    }}
                    className="mr-4"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <AccordionContent className="pt-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Type</Label>
                        <p className="text-sm">{recipient.type}</p>
                      </div>
                      <div>
                        <Label>Email</Label>
                        <p className="text-sm">
                          {recipient.email || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <p className="text-sm">
                          {recipient.phone || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <Label>Address</Label>
                        <p className="text-sm">
                          {recipient.address || "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label>Personal Message</Label>
                      <Textarea
                        placeholder="Add a personal message..."
                        value={recipient.message}
                        onChange={(e) =>
                          setRecipients(
                            recipients.map((r) =>
                              r.id === recipient.id
                                ? { ...r, message: e.target.value }
                                : r,
                            ),
                          )
                        }
                        className="min-h-[100px] mt-2"
                      />
                    </div>

                    <div>
                      <Label className="mb-2 block">Photos</Label>
                      <div className="flex flex-wrap gap-2">
                        {recipient.photos?.map((photo, index) => (
                          <div key={index} className="relative w-20 h-20">
                            <img
                              src={photo}
                              alt={`Memory ${index + 1}`}
                              className="w-full h-full object-cover rounded"
                            />
                            <button
                              onClick={() =>
                                setRecipients(
                                  recipients.map((r) =>
                                    r.id === recipient.id
                                      ? {
                                          ...r,
                                          photos: r.photos?.filter(
                                            (_, i) => i !== index,
                                          ),
                                        }
                                      : r,
                                  ),
                                )
                              }
                              className="absolute -top-1 -right-1 p-0.5 bg-red-500 text-white rounded-full"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddPhoto(recipient.id)}
                          className="h-20 w-20"
                        >
                          <Camera className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="mb-2 block">Voice Message</Label>
                      <div className="flex items-center gap-2">
                        <Button
                          variant={isRecording ? "destructive" : "outline"}
                          size="sm"
                          onClick={() => toggleRecording(recipient.id)}
                        >
                          <Mic className="w-4 h-4 mr-2" />
                          {isRecording ? "Stop" : "Record Message"}
                        </Button>
                        {isRecording && (
                          <span className="text-sm text-gray-500">
                            Recording...
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button
            onClick={() => onNext({ recipients })}
            disabled={recipients.length === 0}
          >
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RecipientsStep;
