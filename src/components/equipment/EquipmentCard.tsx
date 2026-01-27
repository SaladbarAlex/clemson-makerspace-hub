import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MapPin, ChevronRight } from "lucide-react";
import { Equipment, statusConfig, trainingConfig, locationConfig } from "@/data/equipment";

interface EquipmentCardProps {
  equipment: Equipment;
}

export function EquipmentCard({ equipment }: EquipmentCardProps) {
  const status = statusConfig[equipment.status];
  const training = trainingConfig[equipment.trainingRequired];
  const location = locationConfig[equipment.location];
  const Icon = equipment.icon;

  return (
    <div className="group card-neumorphic p-5 flex flex-col h-full transition-all duration-200 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="h-12 w-12 rounded-xl bg-gradient-hero flex items-center justify-center group-hover:scale-105 transition-transform">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <Badge variant="secondary" className={cn("text-xs", location.badgeClass)}>
          <MapPin className="h-3 w-3 mr-1" />
          {location.label}
        </Badge>
      </div>

      {/* Name & Category */}
      <h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
        {equipment.name}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {equipment.description}
      </p>

      {/* Status & Training Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge variant="outline" className={cn("text-xs gap-1.5", status.badgeClass)}>
          <span className={cn("h-2 w-2 rounded-full", status.dotClass)} />
          {status.label}
          {equipment.waitingCount && equipment.waitingCount > 0 && ` (${equipment.waitingCount} waiting)`}
        </Badge>
        
        <Badge variant="outline" className={cn("text-xs", training.badgeClass)}>
          {training.label}
        </Badge>
      </div>

      {/* CTA */}
      <div className="mt-auto">
        <Button 
          asChild 
          variant="ghost" 
          className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          <Link to={`/equipment/${equipment.id}`}>
            Learn More
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
