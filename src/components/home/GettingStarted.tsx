import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Shield, Wrench, Award, Rocket, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: Shield,
    title: "Complete Safety Training",
    description: "15-minute online course covering makerspace rules and safety protocols",
    details: "Our safety training covers basic shop safety, emergency procedures, and conduct policies. It's quick, easy, and only needs to be done once!",
    cta: "Start Training",
    href: "/get-started#safety",
    color: "bg-success/10 text-success",
  },
  {
    icon: Wrench,
    title: "Choose Your Equipment",
    description: "Watch tutorials and complete quizzes for the machines you want to use",
    details: "Each piece of equipment has specific training requirements. Browse our equipment catalog and watch the tutorial videos before taking the certification quiz.",
    cta: "Browse Equipment",
    href: "/equipment",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Award,
    title: "Pass the Quiz",
    description: "Some equipment requires passing a knowledge check. Laser cutters need in-person training.",
    details: "Quizzes are open-book and you can retake them as many times as needed. For laser cutters and CNC machines, you'll also need to attend an in-person training session.",
    cta: "View Requirements",
    href: "/get-started#requirements",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Rocket,
    title: "Visit & Create",
    description: "Stop by during open hours. Our interns are here to help!",
    details: "Once you're certified, just walk in during open hours and start making! Our friendly student interns are always available to help with questions or troubleshoot issues.",
    cta: "See Locations",
    href: "/locations",
    color: "bg-accent/10 text-accent",
  },
];

export function GettingStarted() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <section className="py-20 bg-muted/30 pattern-geometric">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How to Get Started
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From first visit to first project—here's your path to becoming a certified maker.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          {/* Progress Line (Desktop) */}
          <div className="hidden lg:block relative mb-8">
            <div className="absolute top-6 left-[10%] right-[10%] h-1 bg-border rounded-full">
              <div className="absolute inset-y-0 left-0 w-0 bg-gradient-stats rounded-full" />
            </div>
          </div>

          {/* Step Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Step Number */}
                <div className="hidden lg:flex absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 items-center justify-center rounded-full bg-background border-2 border-primary text-primary font-display font-bold text-sm z-10">
                  {index + 1}
                </div>

                {/* Card */}
                <div
                  className={cn(
                    "card-neumorphic p-6 cursor-pointer transition-all",
                    expandedStep === index && "ring-2 ring-primary"
                  )}
                  onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                >
                  {/* Mobile Step Number */}
                  <div className="lg:hidden flex items-center gap-3 mb-4">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      Step {index + 1}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center mb-4", step.color)}>
                    <step.icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4">
                    {step.description}
                  </p>

                  {/* Expand Indicator */}
                  <div className="flex items-center justify-between">
                    <Button asChild variant="link" size="sm" className="p-0 h-auto text-primary">
                      <Link to={step.href}>{step.cta}</Link>
                    </Button>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform",
                        expandedStep === index && "rotate-180"
                      )}
                    />
                  </div>

                  {/* Expanded Details */}
                  <div
                    className={cn(
                      "grid transition-all duration-300",
                      expandedStep === index ? "grid-rows-[1fr] mt-4 pt-4 border-t border-border" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm text-muted-foreground">
                        {step.details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
