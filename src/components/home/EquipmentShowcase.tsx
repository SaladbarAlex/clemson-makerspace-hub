import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { equipmentList, categories, locationConfig } from "@/data/equipment";
import { EquipmentCard } from "@/components/equipment/EquipmentCard";

const locationFilters = [
  { id: "all", label: "All Locations" },
  { id: "watt", label: "Watt" },
  { id: "cooper", label: "Cooper" },
];

export function EquipmentShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLocation, setActiveLocation] = useState("all");

  const filteredEquipment = equipmentList.filter((item) => {
    const categoryMatch = activeCategory === "all" || item.categoryId === activeCategory;
    const locationMatch = activeLocation === "all" || item.location === activeLocation;
    return categoryMatch && locationMatch;
  });

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Explore Our Equipment
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From 3D printers to laser cutters, we have everything you need to bring your ideas to life.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "rounded-full gap-2",
                  activeCategory === category.id && "bg-primary text-primary-foreground"
                )}
              >
                <category.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.name}</span>
              </Button>
            ))}
          </div>

          <div className="hidden sm:block h-6 w-px bg-border" />

          {/* Location Filter */}
          <div className="flex items-center gap-2">
            {locationFilters.map((location) => (
              <Button
                key={location.id}
                variant={activeLocation === location.id ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveLocation(location.id)}
                className="rounded-full"
              >
                {location.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEquipment.map((item, index) => (
            <div
              key={item.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <EquipmentCard equipment={item} />
            </div>
          ))}
        </div>

        {filteredEquipment.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No equipment found matching your filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}
