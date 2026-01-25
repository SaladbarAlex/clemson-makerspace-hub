import { useState } from "react";
import { EquipmentCard, equipmentIcons } from "./EquipmentCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "All" },
  { id: "3d-printing", label: "3D Printing" },
  { id: "laser-cutting", label: "Laser Cutting" },
  { id: "textiles", label: "Textiles" },
  { id: "cnc-scanning", label: "CNC & Scanning" },
];

const locations = [
  { id: "all", label: "All Locations" },
  { id: "watt", label: "Watt" },
  { id: "cooper", label: "Cooper" },
];

const equipmentData = [
  {
    name: "FDM 3D Printers",
    category: "3D Printing",
    categoryId: "3d-printing",
    location: "Watt" as const,
    status: "available" as const,
    trainingRequired: "quiz" as const,
    slug: "fdm-3d-printers",
    icon: equipmentIcons["3d-printer"],
  },
  {
    name: "SLA Resin Printers",
    category: "3D Printing",
    categoryId: "3d-printing",
    location: "Watt" as const,
    status: "in-use" as const,
    waitingCount: 2,
    trainingRequired: "quiz" as const,
    slug: "sla-printers",
    icon: equipmentIcons["3d-printer"],
  },
  {
    name: "Epilog Laser Cutter",
    category: "Laser Cutting",
    categoryId: "laser-cutting",
    location: "Watt" as const,
    status: "available" as const,
    trainingRequired: "in-person" as const,
    slug: "epilog-laser",
    icon: equipmentIcons["laser-cutter"],
  },
  {
    name: "Glowforge Laser",
    category: "Laser Cutting",
    categoryId: "laser-cutting",
    location: "Cooper" as const,
    status: "available" as const,
    trainingRequired: "quiz" as const,
    slug: "glowforge",
    icon: equipmentIcons["laser-cutter"],
  },
  {
    name: "CNC Mill",
    category: "CNC & Scanning",
    categoryId: "cnc-scanning",
    location: "Watt" as const,
    status: "offline" as const,
    trainingRequired: "in-person" as const,
    slug: "cnc-mill",
    icon: equipmentIcons["cnc"],
  },
  {
    name: "3D Scanner",
    category: "CNC & Scanning",
    categoryId: "cnc-scanning",
    location: "Watt" as const,
    status: "available" as const,
    trainingRequired: "walk-up" as const,
    slug: "3d-scanner",
    icon: equipmentIcons["scanner"],
  },
  {
    name: "Vinyl Cutter (Cricut)",
    category: "Vinyl & Stickers",
    categoryId: "textiles",
    location: "Cooper" as const,
    status: "available" as const,
    trainingRequired: "walk-up" as const,
    slug: "vinyl-cutter",
    icon: equipmentIcons["vinyl"],
  },
  {
    name: "Embroidery Machine",
    category: "Textiles",
    categoryId: "textiles",
    location: "Cooper" as const,
    status: "in-use" as const,
    waitingCount: 1,
    trainingRequired: "quiz" as const,
    slug: "embroidery",
    icon: equipmentIcons["textiles"],
  },
  {
    name: "Fabric Printer",
    category: "Textiles",
    categoryId: "textiles",
    location: "Cooper" as const,
    status: "available" as const,
    trainingRequired: "quiz" as const,
    slug: "fabric-printer",
    icon: equipmentIcons["textiles"],
  },
  {
    name: "Sticker Printer",
    category: "Vinyl & Stickers",
    categoryId: "textiles",
    location: "Watt" as const,
    status: "available" as const,
    trainingRequired: "walk-up" as const,
    slug: "sticker-printer",
    icon: equipmentIcons["sticker"],
  },
  {
    name: "Button Maker",
    category: "Crafts",
    categoryId: "textiles",
    location: "Cooper" as const,
    status: "available" as const,
    trainingRequired: "walk-up" as const,
    slug: "button-maker",
    icon: equipmentIcons["button"],
  },
  {
    name: "Hand Tools",
    category: "General",
    categoryId: "cnc-scanning",
    location: "Watt" as const,
    status: "available" as const,
    trainingRequired: "walk-up" as const,
    slug: "hand-tools",
    icon: equipmentIcons["tools"],
  },
];

export function EquipmentShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLocation, setActiveLocation] = useState("all");

  const filteredEquipment = equipmentData.filter((item) => {
    const categoryMatch = activeCategory === "all" || item.categoryId === activeCategory;
    const locationMatch = activeLocation === "all" || item.location.toLowerCase() === activeLocation;
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
                  "rounded-full",
                  activeCategory === category.id && "bg-primary text-primary-foreground"
                )}
              >
                {category.label}
              </Button>
            ))}
          </div>

          <div className="hidden sm:block h-6 w-px bg-border" />

          {/* Location Filter */}
          <div className="flex items-center gap-2">
            {locations.map((location) => (
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
              key={item.slug}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <EquipmentCard {...item} />
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
