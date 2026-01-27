import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Search, MapPin } from "lucide-react";
import { categories } from "@/data/equipment";

interface EquipmentFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  location: string;
  onLocationChange: (value: string) => void;
}

const locations = [
  { id: "all", label: "All Locations" },
  { id: "watt", label: "Watt" },
  { id: "cooper", label: "Cooper" },
];

export function EquipmentFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  location,
  onLocationChange,
}: EquipmentFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="max-w-xl mx-auto relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search equipment..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 h-12 text-base bg-background"
        />
      </div>

      {/* Category & Location Filters */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <Tabs value={category} onValueChange={onCategoryChange}>
          <TabsList className="bg-muted/80 flex-wrap h-auto p-1 gap-1">
            {categories.map((cat) => (
              <TabsTrigger 
                key={cat.id} 
                value={cat.id} 
                className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <cat.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{cat.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Location Pills */}
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <div className="flex gap-1">
            {locations.map((loc) => (
              <Button
                key={loc.id}
                variant={location === loc.id ? "default" : "outline"}
                size="sm"
                onClick={() => onLocationChange(loc.id)}
                className={cn(
                  "rounded-full",
                  location === loc.id && "bg-primary text-primary-foreground"
                )}
              >
                {loc.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
