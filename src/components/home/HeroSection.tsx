import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Clock } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero pattern-hexagon">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-20 lg:py-28 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Makerspace Logo */}
          <div className="mb-8 animate-fade-in-up">
            <img
              src="/Makerspacelogo.png"
              alt="Clemson Makerspace Logo"
              className="h-32 sm:h-40 lg:h-48 mx-auto drop-shadow-lg"
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Student-Run</span>
            <span className="text-muted-foreground">|</span>
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Open 50+ Hours This Week</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            Clemson's hub for{" "}
            <span className="text-gradient-orange">hands-on projects</span>
            {" "}and community
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
            Free access to professional equipment for all Clemson students, faculty, and staff. Learn, create, and innovate.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
            <Button asChild variant="hero" size="xl">
              <Link to="/get-started" className="gap-2">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="hero-outline" size="xl">
              <Link to="/reservations">
                Make a Reservation
              </Link>
            </Button>
          </div>
        </div>

        {/* Hero Image/Illustration */}
        <div className="mt-16 relative animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
          <div className="relative mx-auto max-w-5xl">
            <div className="aspect-[16/7] rounded-2xl bg-gradient-to-br from-muted to-muted/50 border border-border overflow-hidden shadow-card">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-8 p-8 w-full">
                  {/* Decorative equipment icons */}
                  <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 hover:-translate-y-1 transition-transform">
                    <div className="h-16 w-16 rounded-xl bg-gradient-orange flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="h-8 w-8 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M6 12h.01M12 12h.01M18 12h.01M3 6l9-3 9 3M3 6v12l9 3 9-3V6" />
                      </svg>
                    </div>
                    <span className="font-display font-semibold text-foreground">3D Printers</span>
                    <span className="text-xs text-muted-foreground">FDM & Resin</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 hover:-translate-y-1 transition-transform">
                    <div className="h-16 w-16 rounded-xl bg-gradient-purple flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="h-8 w-8 text-secondary-foreground" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364" />
                      </svg>
                    </div>
                    <span className="font-display font-semibold text-foreground">Laser Cutters</span>
                    <span className="text-xs text-muted-foreground">Epilog & Glowforge</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 hover:-translate-y-1 transition-transform">
                    <div className="h-16 w-16 rounded-xl bg-accent flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="h-8 w-8 text-accent-foreground" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3" />
                        <circle cx="12" cy="4" r="2" />
                      </svg>
                    </div>
                    <span className="font-display font-semibold text-foreground">Textiles</span>
                    <span className="text-xs text-muted-foreground">Embroidery & More</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating decorations */}
            <div className="absolute -left-4 top-1/4 w-8 h-8 rounded-lg bg-primary/20 animate-float" />
            <div className="absolute -right-4 top-1/3 w-6 h-6 rounded-full bg-secondary/20 animate-float" style={{ animationDelay: "0.5s" }} />
            <div className="absolute left-1/4 -bottom-3 w-10 h-10 rounded-xl bg-accent/20 animate-float" style={{ animationDelay: "1s" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
