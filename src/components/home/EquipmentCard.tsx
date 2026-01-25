import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Printer, Hexagon, Cpu, Shirt, Scissors, Hammer, Scan, PenTool, CircleDot, Sticker, LucideIcon } from "lucide-react";

interface EquipmentCardProps {
  name: string;
  category: string;
  location: "Watt" | "Cooper";
  status: "available" | "in-use" | "offline";
  waitingCount?: number;
  trainingRequired: "quiz" | "walk-up" | "in-person";
  slug: string;
  icon: LucideIcon;
}

const statusConfig = {
  available: {
    label: "Available",
    dotClass: "bg-success",
    textClass: "text-success",
  },
  "in-use": {
    label: "In Use",
    dotClass: "bg-warning",
    textClass: "text-warning",
  },
  offline: {
    label: "Offline",
    dotClass: "bg-destructive",
    textClass: "text-destructive",
  },
};

const trainingLabels = {
  "quiz": "Quiz Required",
  "walk-up": "Walk-Up OK",
  "in-person": "In-Person Required",
};

export function EquipmentCard({
  name,
  category,
  location,
  status,
  waitingCount = 0,
  trainingRequired,
  slug,
  icon: Icon,
}: EquipmentCardProps) {
  const statusInfo = statusConfig[status];

  return (
    <div className="group card-neumorphic p-6 flex flex-col h-full">
      {/* Icon */}
      <div className="mb-4 flex items-start justify-between">
        <div className="h-14 w-14 rounded-xl bg-gradient-hero flex items-center justify-center group-hover:scale-105 transition-transform">
          <Icon className="h-7 w-7 text-primary" />
        </div>
        <Badge
          variant="secondary"
          className={cn(
            "text-xs font-medium",
            location === "Watt" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
          )}
        >
          {location}
        </Badge>
      </div>

      {/* Name & Category */}
      <h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
        {name}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">{category}</p>

      {/* Status */}
      <div className="flex items-center gap-2 mb-3">
        <span className={cn("h-2 w-2 rounded-full", statusInfo.dotClass)} />
        <span className={cn("text-sm font-medium", statusInfo.textClass)}>
          {statusInfo.label}
          {status === "in-use" && waitingCount > 0 && ` (${waitingCount} waiting)`}
        </span>
      </div>

      {/* Training Badge */}
      <Badge
        variant="outline"
        className={cn(
          "w-fit text-xs mb-6",
          trainingRequired === "walk-up" && "border-success/50 text-success",
          trainingRequired === "quiz" && "border-warning/50 text-warning",
          trainingRequired === "in-person" && "border-destructive/50 text-destructive"
        )}
      >
        {trainingLabels[trainingRequired]}
      </Badge>

      {/* Learn More Button */}
      <div className="mt-auto">
        <Button asChild variant="ghost" className="w-full justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Link to={`/equipment/${slug}`}>
            Learn More
          </Link>
        </Button>
      </div>
    </div>
  );
}

// Export icons for use in equipment data
export const equipmentIcons = {
  "3d-printer": Printer,
  "laser-cutter": Hexagon,
  "cnc": Cpu,
  "textiles": Shirt,
  "vinyl": Scissors,
  "tools": Hammer,
  "scanner": Scan,
  "pen": PenTool,
  "button": CircleDot,
  "sticker": Sticker,
};
