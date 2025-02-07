import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, ChefHat, Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isCurrentPath = (path: string) => location.pathname === path;

  return (
    <div className="pb-12 w-64 bg-gradient-to-b from-amber-50 to-orange-50 border-r border-amber-200/60 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 px-4 mb-4">
            <ChefHat className="h-8 w-8 text-amber-600" />
            <h2 className="text-2xl font-semibold">Recipe Legacy</h2>
          </div>
          <div className="space-y-1">
            <Button
              variant={isCurrentPath("/") ? "secondary" : "ghost"}
              className="w-full justify-start text-xl py-6"
              onClick={() => navigate("/")}
            >
              <Home className="mr-2 h-6 w-6" />
              Home
            </Button>
            <Button
              variant={isCurrentPath("/dashboard") ? "secondary" : "ghost"}
              className="w-full justify-start text-xl py-6"
              onClick={() => navigate("/dashboard")}
            >
              <ChefHat className="mr-2 h-6 w-6" />
              Dashboard
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <div className="px-4 text-xl font-medium mb-2 flex items-center gap-2">
            Create New Recipe
          </div>
          <div className="space-y-1 px-2">
            <Button
              variant="ghost"
              className="w-full justify-start pl-8 text-lg py-4"
              onClick={() => navigate("/recipe/input")}
            >
              Recipe Details
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start pl-8 text-lg py-4"
              onClick={() => navigate("/recipe/story")}
            >
              Story & Memories
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start pl-8 text-lg py-4"
              onClick={() => navigate("/recipe/presentation")}
            >
              Presentation
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start pl-8 text-lg py-4"
              onClick={() => navigate("/recipe/privacy")}
            >
              Sharing Options
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start pl-8 text-lg py-4"
              onClick={() => navigate("/recipe/review")}
            >
              Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
