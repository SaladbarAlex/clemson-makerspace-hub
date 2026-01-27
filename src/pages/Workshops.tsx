import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ChevronRight,
  Sparkles,
  Lightbulb,
  ExternalLink
} from "lucide-react";

interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  instructor: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  spotsTotal: number;
  spotsFilled: number;
  category: string;
  image?: string;
  isPast?: boolean;
}

const workshops: Workshop[] = [
  {
    id: "1",
    title: "Intro to 3D Printing",
    description: "Learn the basics of FDM 3D printing, from file preparation to your first successful print.",
    date: "Feb 5, 2026",
    time: "2:00 PM - 4:00 PM",
    location: "Watt Makerspace",
    instructor: "Alex Johnson",
    difficulty: "beginner",
    spotsTotal: 20,
    spotsFilled: 15,
    category: "3D Printing"
  },
  {
    id: "2",
    title: "Laser Cutting Certification",
    description: "Required in-person training for laser cutter access. Covers safety, materials, and hands-on practice.",
    date: "Feb 8, 2026",
    time: "10:00 AM - 12:00 PM",
    location: "Watt Makerspace",
    instructor: "Sam Patel",
    difficulty: "beginner",
    spotsTotal: 12,
    spotsFilled: 12,
    category: "Laser Cutting"
  },
  {
    id: "3",
    title: "Advanced Fusion 360 Modeling",
    description: "Take your CAD skills to the next level with parametric design and assembly techniques.",
    date: "Feb 12, 2026",
    time: "3:00 PM - 5:00 PM",
    location: "Adobe Studio",
    instructor: "Jordan Lee",
    difficulty: "advanced",
    spotsTotal: 15,
    spotsFilled: 8,
    category: "Design"
  },
  {
    id: "4",
    title: "Embroidery Machine Basics",
    description: "Create custom embroidered designs for apparel, bags, and more using our Brother machines.",
    date: "Feb 15, 2026",
    time: "1:00 PM - 3:00 PM",
    location: "Adobe Studio",
    instructor: "Taylor Chen",
    difficulty: "beginner",
    spotsTotal: 8,
    spotsFilled: 5,
    category: "Textiles"
  },
  {
    id: "5",
    title: "CNC Milling Workshop",
    description: "Hands-on introduction to CNC milling. Design and machine your own project from wood or acrylic.",
    date: "Feb 20, 2026",
    time: "10:00 AM - 2:00 PM",
    location: "Watt Makerspace",
    instructor: "Morgan Smith",
    difficulty: "intermediate",
    spotsTotal: 6,
    spotsFilled: 4,
    category: "CNC"
  },
  // Past workshops
  {
    id: "6",
    title: "Sticker Making 101",
    description: "Design and print your own vinyl stickers using the Cricut and sticker printer.",
    date: "Jan 25, 2026",
    time: "2:00 PM - 3:30 PM",
    location: "Adobe Studio",
    instructor: "Riley Kim",
    difficulty: "beginner",
    spotsTotal: 12,
    spotsFilled: 12,
    category: "Vinyl",
    isPast: true
  },
  {
    id: "7",
    title: "Resin Printing Masterclass",
    description: "Advanced techniques for high-detail SLA printing, including supports and post-processing.",
    date: "Jan 18, 2026",
    time: "3:00 PM - 5:00 PM",
    location: "Watt Makerspace",
    instructor: "Alex Johnson",
    difficulty: "advanced",
    spotsTotal: 10,
    spotsFilled: 10,
    category: "3D Printing",
    isPast: true
  },
];

const difficultyColors = {
  beginner: "bg-success/10 text-success",
  intermediate: "bg-warning/10 text-warning",
  advanced: "bg-destructive/10 text-destructive",
};

function WorkshopCard({ workshop, isPast = false }: { workshop: Workshop; isPast?: boolean }) {
  const spotsLeft = workshop.spotsTotal - workshop.spotsFilled;
  const isFull = spotsLeft === 0;

  return (
    <div className={cn(
      "card-neumorphic overflow-hidden transition-all",
      isPast && "opacity-70"
    )}>
      {/* Category Header */}
      <div className="h-2 bg-gradient-stats" />
      
      <div className="p-6">
        {/* Date Badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-primary font-medium">
            <Calendar className="h-4 w-4" />
            {workshop.date}
          </div>
          <Badge className={cn(difficultyColors[workshop.difficulty], "capitalize")}>
            {workshop.difficulty}
          </Badge>
        </div>

        {/* Title & Description */}
        <h3 className="font-display text-lg font-semibold text-foreground mb-2">
          {workshop.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {workshop.description}
        </p>

        {/* Meta Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {workshop.time}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {workshop.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            {isPast ? (
              `${workshop.spotsFilled} attended`
            ) : isFull ? (
              <span className="text-warning">Waitlist available</span>
            ) : (
              `${spotsLeft} of ${workshop.spotsTotal} spots left`
            )}
          </div>
        </div>

        {/* Instructor */}
        <p className="text-sm text-muted-foreground mb-4">
          Instructor: <span className="font-medium text-foreground">{workshop.instructor}</span>
        </p>

        {/* CTA */}
        {isPast ? (
          <Button variant="outline" className="w-full" disabled>
            View Gallery
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button 
            variant={isFull ? "outline" : "hero"} 
            className="w-full"
          >
            {isFull ? "Join Waitlist" : "Register"}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default function Workshops() {
  const upcomingWorkshops = workshops.filter(w => !w.isPast);
  const pastWorkshops = workshops.filter(w => w.isPast);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero pattern-geometric">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Workshops & Events
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Hands-on learning sessions led by trained student interns. All skill levels welcome!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" asChild>
                <a href="#upcoming">
                  <Sparkles className="h-4 w-4 mr-2" />
                  View Upcoming
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#suggest">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Suggest a Workshop
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Workshops Content */}
        <section id="upcoming" className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="upcoming" className="space-y-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <TabsList className="bg-muted">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past Workshops</TabsTrigger>
                </TabsList>
                
                <Button variant="outline" size="sm" asChild>
                  <a href="https://calendar.google.com" target="_blank" rel="noopener noreferrer">
                    <Calendar className="h-4 w-4 mr-2" />
                    Add to Calendar
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </a>
                </Button>
              </div>

              <TabsContent value="upcoming" className="mt-0">
                {upcomingWorkshops.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingWorkshops.map((workshop) => (
                      <WorkshopCard key={workshop.id} workshop={workshop} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No upcoming workshops at this time.</p>
                    <p className="text-sm text-muted-foreground mt-2">Check back soon or suggest one below!</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="past" className="mt-0">
                {pastWorkshops.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastWorkshops.map((workshop) => (
                      <WorkshopCard key={workshop.id} workshop={workshop} isPast />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No past workshops to display.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Suggest Workshop Section */}
        <section id="suggest" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                <Lightbulb className="h-8 w-8 text-secondary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Have a Workshop Idea?
              </h2>
              <p className="text-muted-foreground mb-8">
                We're always looking for new topics! Whether it's a skill you want to learn or one you'd like to teach, let us know.
              </p>
              <Button variant="hero-outline" size="lg">
                Suggest a Workshop
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Want to Lead Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="card-neumorphic p-8 md:p-12 text-center max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Want to Lead a Workshop?
              </h2>
              <p className="text-muted-foreground mb-6">
                If you're passionate about making and want to share your skills with the Clemson community, 
                we'd love to have you! Workshop leaders receive volunteer hours and exclusive makerspace perks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero">
                  Apply to Lead
                </Button>
                <Button variant="outline">
                  Learn More
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
