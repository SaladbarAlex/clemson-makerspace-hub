import { Button } from "@/components/ui/button";
import { EquipmentCard } from "./EquipmentCard";
import { Equipment } from "@/data/equipment";

interface EquipmentGridProps {
  equipment: Equipment[];
  onClearFilters: () => void;
}

export function EquipmentGrid({ equipment, onClearFilters }: EquipmentGridProps) {
  if (equipment.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground mb-4">No equipment found matching your filters.</p>
        <Button variant="outline" onClick={onClearFilters}>
          Clear filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {equipment.map((item, index) => (
        <div
          key={item.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <EquipmentCard equipment={item} />
        </div>
      ))}
    </div>
  );
}
