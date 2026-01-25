import { Button } from "@/components/ui/button";
import { MapPin, Clock, ExternalLink } from "lucide-react";

const locations = [
  {
    name: "Watt Family Innovation Center",
    shortName: "Watt Makerspace",
    address: "405 S. Palmetto Blvd, Clemson, SC 29634",
    mapUrl: "https://maps.google.com/?q=Watt+Family+Innovation+Center+Clemson",
    hours: [
      { day: "Monday", time: "10:00 AM - 8:00 PM" },
      { day: "Tuesday", time: "10:00 AM - 8:00 PM" },
      { day: "Wednesday", time: "10:00 AM - 8:00 PM" },
      { day: "Thursday", time: "10:00 AM - 8:00 PM" },
      { day: "Friday", time: "10:00 AM - 6:00 PM" },
      { day: "Saturday", time: "12:00 PM - 5:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
    equipment: ["3D Printers", "Laser Cutters", "CNC Mill", "3D Scanner"],
    color: "primary",
  },
  {
    name: "Cooper Library Adobe Studio",
    shortName: "Adobe Studio & Makerspace",
    address: "Cooper Library, Clemson, SC 29634",
    mapUrl: "https://maps.google.com/?q=Cooper+Library+Clemson",
    hours: [
      { day: "Monday", time: "9:00 AM - 9:00 PM" },
      { day: "Tuesday", time: "9:00 AM - 9:00 PM" },
      { day: "Wednesday", time: "9:00 AM - 9:00 PM" },
      { day: "Thursday", time: "9:00 AM - 9:00 PM" },
      { day: "Friday", time: "9:00 AM - 5:00 PM" },
      { day: "Saturday", time: "1:00 PM - 5:00 PM" },
      { day: "Sunday", time: "2:00 PM - 8:00 PM" },
    ],
    equipment: ["Glowforge", "Vinyl Cutter", "Embroidery", "Button Maker"],
    color: "secondary",
  },
];

export function LocationsSection() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Locations & Hours
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We have two makerspace locations on campus, each with unique equipment offerings.
          </p>
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {locations.map((location, index) => {
            const todayHours = location.hours.find((h) => h.day === today);
            
            return (
              <div
                key={location.name}
                className="card-neumorphic p-8 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`h-14 w-14 rounded-xl flex items-center justify-center bg-${location.color}/10`}>
                    <MapPin className={`h-7 w-7 text-${location.color}`} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {location.shortName}
                    </h3>
                    <p className="text-sm text-muted-foreground">{location.address}</p>
                  </div>
                </div>

                {/* Today's Hours */}
                <div className="mb-6 p-4 rounded-xl bg-muted">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Today ({today})</span>
                  </div>
                  <p className="text-lg font-display font-bold text-foreground">
                    {todayHours?.time || "Hours not available"}
                  </p>
                </div>

                {/* Equipment */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-2">Available Equipment</h4>
                  <div className="flex flex-wrap gap-2">
                    {location.equipment.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-background border border-border text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 gap-2" asChild>
                    <a href={location.mapUrl} target="_blank" rel="noopener noreferrer">
                      <MapPin className="h-4 w-4" />
                      Get Directions
                    </a>
                  </Button>
                  <Button variant="ghost" className="gap-2">
                    Full Schedule
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
