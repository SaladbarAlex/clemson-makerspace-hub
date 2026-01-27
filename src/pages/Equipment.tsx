import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { 
  Search,
  Filter,
  Printer,
  Hexagon,
  Cpu,
  Shirt,
  Scissors,
  Wrench,
  ChevronRight,
  MapPin,
  GraduationCap
} from "lucide-react";

interface Equipment {
  id: string;
  name: string;
  category: string;
  location: "watt" | "cooper" | "cook";
  status: "available" | "in-use" | "offline";
  waitingCount?: number;
  trainingRequired: "quiz" | "in-person" | "walk-up";
  description: string;
  icon: React.ElementType;
}

const equipmentList: Equipment[] = [
  {
    id: "prusa-mk3s",
    name: "Prusa i3 MK3S+",
    category: "3d-printing",
    location: "watt",
    status: "available",
    trainingRequired: "quiz",
    description: "Reliable FDM 3D printer with auto bed leveling",
    icon: Printer
  },
  {
    id: "prusa-mini",
    name: "Prusa Mini+",
    category: "3d-printing",
    location: "watt",
    status: "in-use",
    waitingCount: 1,
    trainingRequired: "quiz",
    description: "Compact FDM printer for smaller projects",
    icon: Printer
  },
  {
    id: "form3",
    name: "Formlabs Form 3",
    category: "3d-printing",
    location: "watt",
    status: "available",
    trainingRequired: "in-person",
    description: "High-detail SLA resin printer",
    icon: Printer
  },
  {
    id: "epilog-laser",
    name: "Epilog Fusion M2",
    category: "laser-cutting",
    location: "watt",
    status: "in-use",
    waitingCount: 2,
    trainingRequired: "in-person",
    description: "Professional CO2 laser cutter and engraver",
    icon: Hexagon
  },
  {
    id: "glowforge",
    name: "Glowforge Plus",
    category: "laser-cutting",
    location: "cooper",
    status: "available",
    trainingRequired: "in-person",
    description: "User-friendly laser cutter for beginners",
    icon: Hexagon
  },
  {
    id: "cnc-mill",
    name: "Carbide 3D Shapeoko",
    category: "cnc",
    location: "watt",
    status: "offline",
    trainingRequired: "in-person",
    description: "CNC router for wood, plastic, and soft metals",
    icon: Cpu
  },
  {
    id: "3d-scanner",
    name: "EinScan Pro 2X",
    category: "cnc",
    location: "watt",
    status: "available",
    trainingRequired: "quiz",
    description: "Professional-grade 3D scanner",
    icon: Cpu
  },
  {
    id: "cricut",
    name: "Cricut Maker 3",
    category: "vinyl",
    location: "cooper",
    status: "available",
    trainingRequired: "walk-up",
    description: "Vinyl cutter for stickers and decals",
    icon: Scissors
  },
  {
    id: "sticker-printer",
    name: "Roland BN-20A",
    category: "vinyl",
    location: "cooper",
    status: "available",
    trainingRequired: "quiz",
    description: "Print and cut vinyl stickers",
    icon: Scissors
  },
  {
    id: "embroidery",
    name: "Brother PE800",
    category: "textiles",
    location: "cooper",
    status: "available",
    trainingRequired: "quiz",
    description: "Computerized embroidery machine",
    icon: Shirt
  },
  {
    id: "fabric-printer",
    name: "Epson SureColor F170",
    category: "textiles",
    location: "cooper",
    status: "in-use",
    trainingRequired: "quiz",
    description: "Dye-sublimation fabric printer",
    icon: Shirt
  },
  {
    id: "button-maker",
    name: "Badge-A-Minit",
    category: "vinyl",
    location: "cooper",
    status: "available",
    trainingRequired: "walk-up",
    description: "Manual button and pin maker",
    icon: Wrench
  },
];

const categories = [
  { id: "all", name: "All Equipment", icon: Wrench },
  { id: "3d-printing", name: "3D Printing", icon: Printer },
  { id: "laser-cutting", name: "Laser Cutting", icon: Hexagon },
  { id: "cnc", name: "CNC & Scanning", icon: Cpu },
  { id: "textiles", name: "Textiles", icon: Shirt },
  { id: "vinyl", name: "Vinyl & Stickers", icon: Scissors },
];

const statusConfig = {
  available: { label: "Available", className: "bg-success/10 text-success" },
  "in-use": { label: "In Use", className: "bg-warning/10 text-warning" },
  offline: { label: "Offline", className: "bg-destructive/10 text-destructive" },
};

const trainingConfig = {
  quiz: { label: "Quiz Required", icon: GraduationCap },
  "in-person": { label: "In-Person Training", icon: GraduationCap },
  "walk-up": { label: "Walk-Up OK", icon: null },
};

const locationConfig = {
  watt: { label: "Watt", className: "bg-primary/10 text-primary" },
  cooper: { label: "Cooper", className: "bg-secondary/10 text-secondary" },
  cook: { label: "Cook", className: "bg-accent/10 text-accent" },
};

export default function Equipment() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const filteredEquipment = equipmentList.filter((eq) => {
    const matchesSearch = eq.name.toLowerCase().includes(search.toLowerCase()) ||
      eq.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || eq.category === category;
    const matchesLocation = locationFilter === "all" || eq.location === locationFilter;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-hero pattern-hexagon">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4 text-center">
              Equipment Catalog
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-center mb-8">
              Browse our full range of professional maker equipment. Complete the required training to get certified.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search equipment..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>
          </div>
        </section>

        {/* Filters & Equipment Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Category Tabs */}
            <Tabs value={category} onValueChange={setCategory} className="mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <TabsList className="bg-muted flex-wrap h-auto p-1">
                  {categories.map((cat) => (
                    <TabsTrigger key={cat.id} value={cat.id} className="gap-2">
                      <cat.icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{cat.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Location Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <div className="flex gap-1">
                    {["all", "watt", "cooper"].map((loc) => (
                      <Button
                        key={loc}
                        variant={locationFilter === loc ? "default" : "outline"}
                        size="sm"
                        onClick={() => setLocationFilter(loc)}
                      >
                        {loc === "all" ? "All Locations" : loc === "watt" ? "Watt" : "Cooper"}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Equipment Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEquipment.map((equipment) => {
                  const status = statusConfig[equipment.status];
                  const training = trainingConfig[equipment.trainingRequired];
                  const location = locationConfig[equipment.location];

                  return (
                    <div
                      key={equipment.id}
                      className="card-neumorphic p-6 group"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <equipment.icon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge className={cn(location.className)}>
                          <MapPin className="h-3 w-3 mr-1" />
                          {location.label}
                        </Badge>
                      </div>

                      {/* Name & Description */}
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                        {equipment.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {equipment.description}
                      </p>

                      {/* Status & Training */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <Badge className={cn(status.className)}>
                          <span className={cn(
                            "h-2 w-2 rounded-full mr-1.5",
                            equipment.status === "available" && "bg-success",
                            equipment.status === "in-use" && "bg-warning",
                            equipment.status === "offline" && "bg-destructive"
                          )} />
                          {status.label}
                          {equipment.waitingCount && ` (${equipment.waitingCount} waiting)`}
                        </Badge>
                        
                        {training.icon && (
                          <Badge variant="outline" className="gap-1">
                            <training.icon className="h-3 w-3" />
                            {training.label}
                          </Badge>
                        )}
                      </div>

                      {/* CTA */}
                      <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Link to={`/equipment/${equipment.id}`}>
                          Learn More
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  );
                })}
              </div>

              {/* Empty State */}
              {filteredEquipment.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No equipment found matching your filters.</p>
                  <Button
                    variant="link"
                    onClick={() => {
                      setSearch("");
                      setCategory("all");
                      setLocationFilter("all");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
