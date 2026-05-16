import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, LogOut, Moon, Sun, User as UserIcon, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const { profile, role, user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    navigate("/auth", { replace: true });
  };

  const initial = (profile?.name || user?.email || "U").charAt(0).toUpperCase();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <SidebarProvider>
      <div className="min-h-[100dvh] flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 sm:h-14 flex items-center justify-between border-b border-border px-3 sm:px-4 bg-card/50 backdrop-blur-sm sticky top-0 z-30">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-9 sm:w-9 text-muted-foreground hover:text-foreground">
                <Bell className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 text-muted-foreground hover:text-foreground" onClick={() => setDark(!dark)}>
                {dark ? <Sun className="h-4 w-4 sm:h-[18px] sm:w-[18px]" /> : <Moon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="h-7 w-7 sm:h-8 sm:w-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold ml-1 hover:opacity-90 transition-opacity">
                    {initial}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium truncate">{profile?.name || "Account"}</span>
                      <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                      {role && (
                        <span className="text-[10px] uppercase tracking-wide mt-1 text-primary font-semibold">{role}</span>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile"><UserIcon className="h-4 w-4 mr-2" />Profile</Link>
                  </DropdownMenuItem>
                  {role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin"><ShieldCheck className="h-4 w-4 mr-2" />Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
