import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EquipmentFilters } from "@/components/equipment/EquipmentFilters";
import { EquipmentGrid } from "@/components/equipment/EquipmentGrid";
import { equipmentList } from "@/data/equipment";

export default function Equipment() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");

  const filteredEquipment = equipmentList.filter((eq) => {
    const matchesSearch = eq.name.toLowerCase().includes(search.toLowerCase()) ||
      eq.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || eq.categoryId === category;
    const matchesLocation = location === "all" || eq.location === location;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setLocation("all");
  };

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
          </div>
        </section>

        {/* Filters & Equipment Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <EquipmentFilters
              search={search}
              onSearchChange={setSearch}
              category={category}
              onCategoryChange={setCategory}
              location={location}
              onLocationChange={setLocation}
            />

            <div className="mt-10">
              <EquipmentGrid 
                equipment={filteredEquipment} 
                onClearFilters={clearFilters}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
