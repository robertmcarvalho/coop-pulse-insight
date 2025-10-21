import { 
  LayoutDashboard, 
  Building2, 
  TrendingDown, 
  Wallet, 
  BarChart3, 
  Upload,
  MessageSquare
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { 
    title: "Visão Executiva", 
    url: "/", 
    icon: LayoutDashboard,
    description: "Overview geral"
  },
  { 
    title: "Análise por Filial", 
    url: "/filiais", 
    icon: Building2,
    description: "Performance das filiais"
  },
  { 
    title: "Análise de Despesas", 
    url: "/despesas", 
    icon: TrendingDown,
    description: "Breakdown de custos"
  },
  { 
    title: "Fluxo de Caixa", 
    url: "/caixa", 
    icon: Wallet,
    description: "Cash flow e projeções"
  },
  { 
    title: "Análise Operacional", 
    url: "/operacional", 
    icon: BarChart3,
    description: "KPIs operacionais"
  },
];

const toolsItems = [
  { 
    title: "Importar Dados", 
    url: "/ingest", 
    icon: Upload,
    description: "Upload de CSV"
  },
  { 
    title: "Chat IA", 
    url: "/ai", 
    icon: MessageSquare,
    description: "Assistente financeiro"
  },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent>
        {/* Logo */}
        <div className="px-6 py-4 border-b border-sidebar-border">
          <h1 className={`font-bold text-lg text-sidebar-foreground transition-opacity ${!open && "opacity-0"}`}>
            CoopMob Analytics
          </h1>
        </div>

        {/* Menu Principal */}
        <SidebarGroup>
          <SidebarGroupLabel>Dashboards</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {open && (
                        <div className="flex-1">
                          <div className="text-sm">{item.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {item.description}
                          </div>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Ferramentas */}
        <SidebarGroup>
          <SidebarGroupLabel>Ferramentas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {open && (
                        <div className="flex-1">
                          <div className="text-sm">{item.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {item.description}
                          </div>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
