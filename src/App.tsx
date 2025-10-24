import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Filiais from "./pages/Filiais";
import Despesas from "./pages/Despesas";
import Caixa from "./pages/Caixa";
import Operacional from "./pages/Operacional";
import Estrategico from "./pages/Estrategico";
import Ingest from "./pages/Ingest";
import AI from "./pages/AI";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/" element={<Index />} />
            <Route path="/filiais" element={<Filiais />} />
            <Route path="/despesas" element={<Despesas />} />
            <Route path="/caixa" element={<Caixa />} />
            <Route path="/operacional" element={<Operacional />} />
            <Route path="/estrategico" element={<Estrategico />} />
            <Route path="/ingest" element={<Ingest />} />
            <Route path="/ai" element={<AI />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
