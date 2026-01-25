import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ExternalLink, RefreshCw } from "lucide-react";

const printers = [
  {
    id: 1,
    name: "Prusa MK3S #1",
    status: "available" as const,
    location: "Watt",
  },
  {
    id: 2,
    name: "Prusa MK3S #2",
    status: "printing" as const,
    location: "Watt",
    progress: 65,
    timeRemaining: "2h 34m",
    project: "Phone Stand",
  },
  {
    id: 3,
    name: "Prusa MK3S #3",
    status: "printing" as const,
    location: "Watt",
    progress: 12,
    timeRemaining: "5h 15m",
    project: "Enclosure Part",
  },
  {
    id: 4,
    name: "Prusa MK3S #4",
    status: "available" as const,
    location: "Watt",
  },
  {
    id: 5,
    name: "Ender 3 #1",
    status: "offline" as const,
    location: "Cooper",
  },
  {
    id: 6,
    name: "Ender 3 #2",
    status: "available" as const,
    location: "Cooper",
  },
  {
    id: 7,
    name: "Prusa Mini #1",
    status: "printing" as const,
    location: "Watt",
    progress: 89,
    timeRemaining: "0h 45m",
    project: "Keychain",
  },
  {
    id: 8,
    name: "Prusa Mini #2",
    status: "available" as const,
    location: "Watt",
  },
];

const statusConfig = {
  available: {
    label: "Available",
    color: "bg-success",
    textColor: "text-success",
    bgColor: "bg-success/10",
  },
  printing: {
    label: "Printing",
    color: "bg-accent",
    textColor: "text-accent",
    bgColor: "bg-accent/10",
  },
  offline: {
    label: "Offline",
    color: "bg-destructive",
    textColor: "text-destructive",
    bgColor: "bg-destructive/10",
  },
};

export function PrinterStatus() {
  const lastUpdated = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
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
            <a href="https://docs.google.com/spreadsheets/d/example" target="_blank" rel="noopener noreferrer">
              View Full Status
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Printer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {printers.map((printer, index) => {
            const status = statusConfig[printer.status];
            
            return (
              <div
                key={printer.id}
                className={cn(
                  "card-glass p-4 animate-fade-in-up",
                  printer.status === "offline" && "opacity-60"
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-sm">
                      {printer.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">{printer.location}</span>
                  </div>
                  <Badge className={cn("text-xs", status.bgColor, status.textColor)}>
                    <span className={cn("h-1.5 w-1.5 rounded-full mr-1.5", status.color)} />
                    {status.label}
                  </Badge>
                </div>

                {/* Status Content */}
                {printer.status === "printing" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground truncate max-w-[120px]">
                        {printer.project}
                      </span>
                      <span className="font-mono text-foreground">{printer.progress}%</span>
                    </div>
                    <Progress value={printer.progress} className="h-1.5" />
                    <p className="text-xs text-muted-foreground">
                      ~{printer.timeRemaining} remaining
                    </p>
                  </div>
                )}

                {printer.status === "available" && (
                  <Button variant="ghost" size="sm" className="w-full mt-2 text-primary hover:text-primary hover:bg-primary/10">
                    Reserve Now
                  </Button>
                )}

                {printer.status === "offline" && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Currently unavailable for maintenance
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
