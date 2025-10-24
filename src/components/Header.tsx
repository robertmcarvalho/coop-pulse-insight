import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Moon, Sun, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        setUserEmail(session.user.email);
      }
    });
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Erro ao sair");
    } else {
      toast.success("Logout realizado com sucesso");
      navigate("/auth");
    }
  };

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            Dashboard Financeiro
          </h2>
          <p className="text-xs text-muted-foreground">
            Análise completa de performance
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Alternar tema"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="px-2 py-1.5 text-sm text-muted-foreground">
              {userEmail}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-danger cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
