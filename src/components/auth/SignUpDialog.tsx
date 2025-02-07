import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SignUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignUpDialog({ open, onOpenChange }: SignUpDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [familyOption, setFamilyOption] = useState<"create" | "join">("create");
  const [familyName, setFamilyName] = useState("");
  const [familyCode, setFamilyCode] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleSignUp = async () => {
    // Validation for required fields
    if (!email || !username || !password || !confirmPassword) {
      setError("Please fill in all required fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (familyOption === "create" && !familyName) {
      setError("Please enter a family name");
      return;
    }
    if (familyOption === "join" && !familyCode) {
      setError("Please enter a family code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1. Create user account with auto-confirmation for development
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            first_name: firstName || undefined,
            last_name: lastName || undefined,
            phone_number: phone || undefined,
            terms_accepted: termsAccepted,
            privacy_accepted: privacyAccepted,
            pending_family_action:
              familyOption === "create" ? familyName : familyCode,
            pending_family_type: familyOption,
          },
        },
      });

      if (authError) throw authError;

      // For development, sign in immediately after sign up
      if (authData?.user) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;

        // 2. Handle family creation/joining after sign in
        if (familyOption === "create") {
          const { error: familyError } = await supabase.rpc("create_family", {
            family_name: familyName,
            user_id: authData.user.id,
          });
          if (familyError) throw familyError;
        } else {
          const { error: joinError } = await supabase.rpc(
            "join_family_by_code",
            {
              family_code: familyCode,
            },
          );
          if (joinError) throw joinError;
        }
      }

      onOpenChange(false);
      toast({
        title: "Welcome to Family Recipe Legacy! 🎉",
        description:
          "Please check your email to verify your account and start preserving your cherished recipes.",
        className: "bg-amber-50 border-amber-200",
      });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Your Account</DialogTitle>
          <DialogDescription>
            Fill in your details to get started
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="username">
              Username <span className="text-red-500">*</span>
            </Label>
            <Input
              id="username"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">
                Confirm Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <Label>
              Family Details <span className="text-red-500">*</span>
            </Label>
            <Tabs
              value={familyOption}
              onValueChange={(v: "create" | "join") => setFamilyOption(v)}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="create">Create Family</TabsTrigger>
                <TabsTrigger value="join">Join Family</TabsTrigger>
              </TabsList>
              <TabsContent value="create" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="family-name">
                    Family Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="family-name"
                    placeholder="Enter your family name"
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                    required
                  />
                </div>
              </TabsContent>
              <TabsContent value="join" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="family-code">
                    Family Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="family-code"
                    placeholder="Enter the family code"
                    value={familyCode}
                    onChange={(e) => setFamilyCode(e.target.value)}
                    required
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked: boolean) =>
                  setTermsAccepted(checked)
                }
              />
              <Label htmlFor="terms" className="text-sm">
                I accept the terms and conditions
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="privacy"
                checked={privacyAccepted}
                onCheckedChange={(checked: boolean) =>
                  setPrivacyAccepted(checked)
                }
              />
              <Label htmlFor="privacy" className="text-sm">
                I accept the privacy policy
              </Label>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            type="button"
            className="w-full"
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
