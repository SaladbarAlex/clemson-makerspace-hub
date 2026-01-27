import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  ExternalLink,
  Printer,
  Hexagon,
  Shirt,
  Scissors,
  Cpu,
  ChevronRight
} from "lucide-react";

const locations = [
  {
    id: "watt",
    name: "Watt Family Innovation Center",
    shortName: "Watt Makerspace",
    address: "405 S Palmetto Blvd, Clemson, SC 29634",
    mapUrl: "https://maps.google.com/?q=Watt+Family+Innovation+Center+Clemson",
    hours: [
      { day: "Monday", time: "10:00 AM - 8:00 PM" },
      { day: "Tuesday", time: "10:00 AM - 8:00 PM" },
      { day: "Wednesday", time: "10:00 AM - 8:00 PM" },
      { day: "Thursday", time: "10:00 AM - 8:00 PM" },
      { day: "Friday", time: "10:00 AM - 6:00 PM" },
      { day: "Saturday", time: "12:00 PM - 4:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
    equipment: [
      { name: "3D Printers (FDM)", icon: Printer },
      { name: "3D Printers (SLA)", icon: Printer },
      { name: "Epilog Laser Cutter", icon: Hexagon },
      { name: "CNC Mill", icon: Cpu },
      { name: "3D Scanner", icon: Cpu },
    ],
    contact: {
      phone: "(864) 656-1234",
      email: "watt-makerspace@clemson.edu",
    },
    description: "Our main makerspace located in the Watt Center, featuring professional-grade equipment for 3D printing, laser cutting, and CNC machining.",
    isOpen: true,
  },
  {
    id: "cooper",
    name: "Adobe Digital Studio & Makerspace",
    shortName: "Adobe Studio",
    address: "Cooper Library, Clemson, SC 29634",
    mapUrl: "https://maps.google.com/?q=Cooper+Library+Clemson",
    hours: [
      { day: "Monday", time: "9:00 AM - 9:00 PM" },
      { day: "Tuesday", time: "9:00 AM - 9:00 PM" },
      { day: "Wednesday", time: "9:00 AM - 9:00 PM" },
      { day: "Thursday", time: "9:00 AM - 9:00 PM" },
      { day: "Friday", time: "9:00 AM - 5:00 PM" },
      { day: "Saturday", time: "1:00 PM - 5:00 PM" },
      { day: "Sunday", time: "2:00 PM - 9:00 PM" },
    ],
    equipment: [
      { name: "Glowforge Laser", icon: Hexagon },
      { name: "Vinyl Cutter", icon: Scissors },
      { name: "Sticker Printer", icon: Scissors },
      { name: "Embroidery Machine", icon: Shirt },
      { name: "Fabric Printer", icon: Shirt },
      { name: "Button Maker", icon: Scissors },
    ],
    contact: {
      phone: "(864) 656-5678",
      email: "adobe-studio@clemson.edu",
    },
    description: "Located in Cooper Library, this space focuses on textiles, vinyl cutting, and creative design tools. Perfect for custom apparel and stickers.",
    isOpen: true,
  },
];

const cookLocation = {
  name: "Cook Engineering Lab",
  description: "Additional CNC equipment available by appointment only.",
  address: "Cook Engineering Building, Clemson, SC 29634",
  equipment: ["CNC Router"],
};

function getCurrentDayHours(hours: { day: string; time: string }[]) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = days[new Date().getDay()];
  const todayHours = hours.find(h => h.day === today);
  return todayHours?.time || "Closed";
}

export default function Locations() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero pattern-geometric">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Our Locations
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Two convenient locations on campus, each with unique equipment and capabilities.
            </p>
          </div>
        </section>

        {/* Locations Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {locations.map((location) => {
                const todayHours = getCurrentDayHours(location.hours);
                const isClosed = todayHours === "Closed";

                return (
                  <div key={location.id} className="card-neumorphic overflow-hidden">
                    {/* Header with status */}
                    <div className="h-3 bg-gradient-stats" />
                    
                    <div className="p-8">
                      {/* Title & Status */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                            {location.shortName}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {location.name}
                          </p>
                        </div>
                        <Badge className={cn(
                          isClosed ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"
                        )}>
                          {isClosed ? "Closed" : "Open Now"}
                        </Badge>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-6">
                        {location.description}
                      </p>

                      {/* Address */}
                      <div className="flex items-start gap-3 mb-4">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-foreground">{location.address}</p>
                          <a 
                            href={location.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                          >
                            Get Directions
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>

                      {/* Today's Hours */}
                      <div className="flex items-start gap-3 mb-6">
                        <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-foreground font-medium">
                            Today: {todayHours}
                          </p>
                        </div>
                      </div>

                      {/* Full Hours */}
                      <div className="mb-6">
                        <h3 className="font-semibold text-foreground mb-3">Weekly Hours</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {location.hours.map((schedule) => (
                            <div 
                              key={schedule.day}
                              className={cn(
                                "flex justify-between text-sm py-1.5 px-2 rounded",
                                schedule.day === ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()] && "bg-primary/5"
                              )}
                            >
                              <span className="text-muted-foreground">{schedule.day}</span>
                              <span className="font-mono text-foreground">{schedule.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Equipment Available */}
                      <div className="mb-6">
                        <h3 className="font-semibold text-foreground mb-3">Equipment Available</h3>
                        <div className="flex flex-wrap gap-2">
                          {location.equipment.map((eq) => (
                            <Badge key={eq.name} variant="outline" className="gap-1">
                              <eq.icon className="h-3 w-3" />
                              {eq.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="flex flex-wrap gap-4 mb-6">
                        <a 
                          href={`tel:${location.contact.phone}`}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                          <Phone className="h-4 w-4" />
                          {location.contact.phone}
                        </a>
                        <a 
                          href={`mailto:${location.contact.email}`}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                          <Mail className="h-4 w-4" />
                          {location.contact.email}
                        </a>
                      </div>

                      {/* CTA */}
                      <Button asChild variant="hero" className="w-full">
                        <a href={location.mapUrl} target="_blank" rel="noopener noreferrer">
                          <MapPin className="h-4 w-4 mr-2" />
                          View on Map
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cook Engineering Lab */}
            <div className="mt-8">
              <div className="card-neumorphic p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                      {cookLocation.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {cookLocation.description}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Equipment: {cookLocation.equipment.join(", ")}
                    </p>
                  </div>
                  <Button variant="outline">
                    Contact for Access
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">
              Campus Map
            </h2>
            <div className="h-96 rounded-2xl bg-muted flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive map coming soon</p>
                <Button variant="outline" className="mt-4" asChild>
                  <a href="https://maps.google.com/?q=Clemson+University" target="_blank" rel="noopener noreferrer">
                    Open Google Maps
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
