import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Equipment from "./pages/Equipment";
import EquipmentDetail from "./pages/EquipmentDetail";
import Training from "./pages/Training";
import LogEquipment from "./pages/LogEquipment";
import Workshops from "./pages/Workshops";
import Analytics from "./pages/Analytics";
import Locations from "./pages/Locations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="clemson-makerspace-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/equipment/:id" element={<EquipmentDetail />} />
          <Route path="/training/:equipment" element={<Training />} />
          <Route path="/log-equipment" element={<LogEquipment />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/locations" element={<Locations />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
