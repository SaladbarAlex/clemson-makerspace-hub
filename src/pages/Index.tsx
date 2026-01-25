import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsBar } from "@/components/home/StatsBar";
import { EquipmentShowcase } from "@/components/home/EquipmentShowcase";
import { GettingStarted } from "@/components/home/GettingStarted";
import { PrinterStatus } from "@/components/home/PrinterStatus";
import { LocationsSection } from "@/components/home/LocationsSection";
import { WorkshopsPreview } from "@/components/home/WorkshopsPreview";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsBar />
        <EquipmentShowcase />
        <GettingStarted />
        <PrinterStatus />
        <LocationsSection />
        <WorkshopsPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
