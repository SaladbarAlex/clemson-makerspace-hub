import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, RefreshCw, MapPin } from "lucide-react";
import { printers } from "@/data/printers";
import { PrinterCard } from "./PrinterCard";

export function PrinterStatusDashboard() {
  const [locationFilter, setLocationFilter] = useState<"all" | "Watt" | "Cooper">("all");
  const lastUpdated = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const filteredPrinters = locationFilter === "all" 
    ? printers 
    : printers.filter(p => p.location === locationFilter);

  // Stats
  const stats = {
    total: filteredPrinters.length,
    available: filteredPrinters.filter(p => p.status === "available").length,
    printing: filteredPrinters.filter(p => p.status === "printing").length,
    finished: filteredPrinters.filter(p => p.status === "finished").length,
    offline: filteredPrinters.filter(p => p.status === "offline").length,
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
              3D Printer Status
            </h2>
            <p className="text-muted-foreground flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Last updated: {lastUpdated}
            </p>
          </div>
          <Button variant="outline" className="gap-2" asChild>
            <a 
              href="https://docs.google.com/spreadsheets/d/13ukI4J5AQtzbRLEfyYABIhA7jCMH7g53veYQPVC5CWU" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View Full Status
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="card-glass p-4 text-center">
            <p className="text-2xl font-bold text-success">{stats.available}</p>
            <p className="text-sm text-muted-foreground">Available</p>
          </div>
          <div className="card-glass p-4 text-center">
            <p className="text-2xl font-bold text-accent">{stats.printing}</p>
            <p className="text-sm text-muted-foreground">Printing</p>
          </div>
          <div className="card-glass p-4 text-center">
            <p className="text-2xl font-bold text-primary">{stats.finished}</p>
            <p className="text-sm text-muted-foreground">Finished</p>
          </div>
          <div className="card-glass p-4 text-center">
            <p className="text-2xl font-bold text-destructive">{stats.offline}</p>
            <p className="text-sm text-muted-foreground">Offline</p>
          </div>
        </div>

        {/* Location Tabs */}
        <Tabs value={locationFilter} onValueChange={(v) => setLocationFilter(v as typeof locationFilter)} className="mb-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="all" className="gap-2">
              <MapPin className="h-4 w-4" />
              All Locations ({printers.length})
            </TabsTrigger>
            <TabsTrigger value="Watt" className="gap-2">
              Watt ({printers.filter(p => p.location === "Watt").length})
            </TabsTrigger>
            <TabsTrigger value="Cooper" className="gap-2">
              Cooper ({printers.filter(p => p.location === "Cooper").length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Printer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
          {filteredPrinters.map((printer, index) => (
            <PrinterCard key={printer.id} printer={printer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
