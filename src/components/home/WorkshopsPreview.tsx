import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const workshops = [
  {
    id: 1,
    title: "Intro to 3D Printing",
    date: "Feb 15, 2025",
    time: "2:00 PM - 4:00 PM",
    instructor: "Alex Chen",
    spotsLeft: 5,
    totalSpots: 20,
    difficulty: "Beginner",
    image: "🖨️",
  },
  {
    id: 2,
    title: "Laser Cutting Workshop",
    date: "Feb 18, 2025",
    time: "3:00 PM - 5:00 PM",
    instructor: "Jordan Lee",
    spotsLeft: 2,
    totalSpots: 12,
    difficulty: "Intermediate",
    image: "✂️",
  },
  {
    id: 3,
    title: "Custom Sticker Making",
    date: "Feb 22, 2025",
    time: "1:00 PM - 3:00 PM",
    instructor: "Sam Patel",
    spotsLeft: 8,
    totalSpots: 15,
    difficulty: "Beginner",
    image: "🏷️",
  },
  {
    id: 4,
    title: "Embroidery Basics",
    date: "Feb 25, 2025",
    time: "4:00 PM - 6:00 PM",
    instructor: "Taylor Kim",
    spotsLeft: 0,
    totalSpots: 10,
    difficulty: "Beginner",
    image: "🧵",
  },
];

const difficultyColors = {
  Beginner: "bg-success/10 text-success",
  Intermediate: "bg-warning/10 text-warning",
  Advanced: "bg-destructive/10 text-destructive",
};

export function WorkshopsPreview() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Workshops & Events
            </h2>
            <p className="text-muted-foreground">
              Learn new skills with our hands-on workshops led by trained interns.
            </p>
          </div>
          <Button variant="outline" asChild className="gap-2">
            <Link to="/workshops">
              View All Workshops
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative -mx-4 px-4">
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin snap-x snap-mandatory">
            {workshops.map((workshop, index) => (
              <div
                key={workshop.id}
                className="flex-shrink-0 w-[320px] snap-start animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-neumorphic p-6 h-full flex flex-col">
                  {/* Date Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{workshop.image}</div>
                    <Badge variant="secondary" className="font-mono text-xs">
                      {workshop.date}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {workshop.title}
                  </h3>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {workshop.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      Instructor: {workshop.instructor}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-2 mb-6">
                    <Badge className={difficultyColors[workshop.difficulty as keyof typeof difficultyColors]}>
                      {workshop.difficulty}
                    </Badge>
                    <Badge variant="outline" className={workshop.spotsLeft === 0 ? "border-destructive/50 text-destructive" : ""}>
                      {workshop.spotsLeft === 0 ? "Waitlist" : `${workshop.spotsLeft} spots left`}
                    </Badge>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <Button
                      variant={workshop.spotsLeft === 0 ? "outline" : "default"}
                      className="w-full"
                    >
                      {workshop.spotsLeft === 0 ? "Join Waitlist" : "Register"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* View All Card */}
            <div className="flex-shrink-0 w-[200px] snap-start">
              <Link
                to="/workshops"
                className="h-full min-h-[300px] card-glass p-6 flex flex-col items-center justify-center gap-4 text-center hover:border-primary/50 transition-colors"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <span className="font-display font-semibold text-foreground">
                  View All Workshops
                </span>
                <ArrowRight className="h-5 w-5 text-primary" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
