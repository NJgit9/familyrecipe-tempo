import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabase";
import React from "react";
import { ChefHatIcon } from "lucide-react";
import { LogOut, User } from "lucide-react";

export default function TopNav() {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = () => {
    setShowLoginDialog(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="border-b border-amber-200/60">
      <div className="flex h-14 items-center px-4 bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="flex flex-1 items-center justify-between">
          <nav className="flex items-center space-x-6">
            {/* Add navigation links here if needed */}
          </nav>
          <div className="flex items-center space-x-2">
            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-10 w-10 rounded-full"
                      >
                        <Avatar className="h-10 w-10 bg-slate-800 text-white">
                          <AvatarImage
                            src={user.user_metadata?.avatar_url}
                            alt={user.user_metadata?.first_name}
                          />
                          <AvatarFallback className="font-semibold text-xs bg-[#CD7F32]">
                            {(
                              user.user_metadata?.first_name?.[0] || ""
                            ).toUpperCase()}
                            <ChefHatIcon />
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {`${user.user_metadata?.first_name || ""} ${user.user_metadata?.last_name || ""}`}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleLogin}
                    className="gap-2 text-xl"
                  >
                    <User className="h-4 w-4" />
                    Login
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
    </div>
  );
}
