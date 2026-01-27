import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { 
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  FileText,
  GraduationCap,
  CheckCircle,
  Play,
  Download,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Hexagon
} from "lucide-react";

// Mock equipment data - in production this would come from API
const equipmentData: Record<string, {
  name: string;
  category: string;
  location: "watt" | "cooper";
  status: "available" | "in-use" | "offline";
  trainingRequired: "quiz" | "in-person" | "walk-up";
  description: string;
  whatIs: string;
  whatCanYouMake: string[];
  typicalTime: string;
  materials: string[];
  specs: { label: string; value: string }[];
  settings: { material: string; speed: string; power: string; frequency: string }[];
  tips: string[];
  faqs: { question: string; answer: string }[];
}> = {
  "epilog-laser": {
    name: "Epilog Fusion M2",
    category: "Laser Cutting",
    location: "watt",
    status: "available",
    trainingRequired: "in-person",
    description: "Professional CO2 laser cutter and engraver",
    whatIs: "The Epilog Fusion M2 is a professional-grade CO2 laser cutter that can cut and engrave a variety of materials. It uses a focused beam of light to cut through materials or etch designs onto surfaces.",
    whatCanYouMake: [
      "Custom signage and name plates",
      "Laser-cut jewelry and accessories",
      "Engraved wood projects",
      "Acrylic displays and stands",
      "Paper crafts and cards",
      "Leather goods and patches"
    ],
    typicalTime: "15-45 minutes",
    materials: ["Wood", "Acrylic", "Leather", "Paper", "Cardboard", "Cork", "Fabric", "Glass (engrave only)"],
    specs: [
      { label: "Work Area", value: "32\" x 20\" (813 x 508 mm)" },
      { label: "Laser Power", value: "75W CO2" },
      { label: "Resolution", value: "Up to 1200 DPI" },
      { label: "Max Material Thickness", value: "0.5\" (12.7mm)" },
      { label: "Speed", value: "Up to 165 IPS" },
    ],
    settings: [
      { material: "Wood 1/8\"", speed: "40%", power: "80%", frequency: "500 Hz" },
      { material: "Wood 1/4\"", speed: "25%", power: "100%", frequency: "500 Hz" },
      { material: "Acrylic 1/8\"", speed: "35%", power: "90%", frequency: "5000 Hz" },
      { material: "Acrylic 1/4\"", speed: "20%", power: "100%", frequency: "5000 Hz" },
      { material: "Cardboard", speed: "60%", power: "50%", frequency: "500 Hz" },
      { material: "Leather", speed: "50%", power: "70%", frequency: "500 Hz" },
    ],
    tips: [
      "Always check your material is flat before starting",
      "Run a test cut on scrap material first",
      "Vector lines should be 0.001\" stroke for cutting",
      "Use masking tape to prevent smoke staining on acrylic",
      "Keep the lid closed until ventilation clears (30 seconds after job completes)"
    ],
    faqs: [
      {
        question: "Can I bring my own materials?",
        answer: "Yes! However, all materials must be laser-safe. Never use PVC, vinyl, or ABS plastic as they release toxic fumes. If you're unsure, ask an intern to verify."
      },
      {
        question: "What file format do I need?",
        answer: "We accept .SVG, .PDF, and .AI files. Make sure your design is vector-based for cutting. Raster images will only engrave."
      },
      {
        question: "How do I schedule time on the laser?",
        answer: "Laser cutter time is first-come, first-served during open hours. For large projects, contact us to arrange a time."
      },
      {
        question: "What's the difference between cutting and engraving?",
        answer: "Cutting goes all the way through the material, while engraving only marks the surface. In your design, cutting paths should be thin lines (0.001\") and engraving areas should be filled shapes."
      }
    ]
  },
  "prusa-mk3s": {
    name: "Prusa i3 MK3S+",
    category: "3D Printing",
    location: "watt",
    status: "available",
    trainingRequired: "quiz",
    description: "Reliable FDM 3D printer with auto bed leveling",
    whatIs: "The Prusa i3 MK3S+ is one of the most popular FDM 3D printers in the world, known for its reliability and print quality. It builds objects layer by layer from PLA filament.",
    whatCanYouMake: [
      "Prototypes and functional parts",
      "Phone cases and accessories",
      "Miniatures and figurines",
      "Organizational tools and containers",
      "Replacement parts",
      "Art and sculptures"
    ],
    typicalTime: "1-12 hours",
    materials: ["PLA", "PETG", "ASA", "TPU (Flexible)"],
    specs: [
      { label: "Build Volume", value: "250 x 210 x 210 mm" },
      { label: "Layer Height", value: "0.05 - 0.30 mm" },
      { label: "Nozzle Diameter", value: "0.4 mm" },
      { label: "Max Nozzle Temp", value: "300°C" },
      { label: "Max Bed Temp", value: "120°C" },
    ],
    settings: [
      { material: "PLA", speed: "Standard", power: "215°C nozzle", frequency: "60°C bed" },
      { material: "PETG", speed: "Standard", power: "240°C nozzle", frequency: "85°C bed" },
    ],
    tips: [
      "Use 20% infill for most prints - it's a good balance of strength and speed",
      "Add supports for overhangs greater than 45°",
      "First layer is crucial - make sure it sticks well",
      "Let your print cool before removing from the bed"
    ],
    faqs: [
      {
        question: "How long will my print take?",
        answer: "Print time depends on size, layer height, and infill. The slicer software will give you an estimate. Small items take 1-2 hours, larger ones can take 10+ hours."
      },
      {
        question: "Can I leave my print running overnight?",
        answer: "Yes! Our printers run 24/7. Make sure to log your print in our system so we can notify you when it's done."
      }
    ]
  }
};

const locationConfig = {
  watt: { label: "Watt Makerspace", className: "bg-primary/10 text-primary" },
  cooper: { label: "Adobe Studio", className: "bg-secondary/10 text-secondary" },
};

export default function EquipmentDetail() {
  const { id } = useParams<{ id: string }>();
  const equipment = id ? equipmentData[id] : null;

  // Fallback for equipment not in our mock data
  if (!equipment) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground mb-4">
              Equipment Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              This equipment page is under construction.
            </p>
            <Button asChild variant="hero">
              <Link to="/equipment">Browse All Equipment</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const location = locationConfig[equipment.location];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 py-4 border-b border-border">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Link to="/equipment" className="text-muted-foreground hover:text-foreground">Equipment</Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground font-medium">{equipment.name}</span>
            </nav>
          </div>
        </div>

        {/* Header Section */}
        <section className="py-12 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge className={cn(location.className)}>
                    <MapPin className="h-3 w-3 mr-1" />
                    {location.label}
                  </Badge>
                  <Badge className={cn(
                    equipment.status === "available" && "bg-success/10 text-success",
                    equipment.status === "in-use" && "bg-warning/10 text-warning",
                    equipment.status === "offline" && "bg-destructive/10 text-destructive"
                  )}>
                    {equipment.status === "available" ? "Available Now" : 
                     equipment.status === "in-use" ? "In Use" : "Offline"}
                  </Badge>
                </div>

                <h1 className="font-display text-4xl font-bold text-foreground mb-4">
                  {equipment.name}
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  {equipment.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button asChild variant="hero" size="lg">
                    <a href="https://clemson.libcal.com" target="_blank" rel="noopener noreferrer">
                      Make a Reservation
                    </a>
                  </Button>
                  {equipment.trainingRequired !== "walk-up" && (
                    <Button asChild variant="hero-outline" size="lg">
                      <Link to={`/training/${id}`}>
                        <GraduationCap className="h-4 w-4 mr-2" />
                        Start Training
                      </Link>
                    </Button>
                  )}
                </div>
              </div>

              {/* Placeholder for equipment image */}
              <div className="h-80 rounded-2xl bg-muted/50 flex items-center justify-center">
                <Hexagon className="h-24 w-24 text-muted-foreground/30" />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Info Cards */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card-neumorphic p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Training Required</p>
                    <p className="font-semibold text-foreground">
                      {equipment.trainingRequired === "quiz" && "Quiz Only"}
                      {equipment.trainingRequired === "in-person" && "Quiz + In-Person"}
                      {equipment.trainingRequired === "walk-up" && "Walk-Up OK"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-neumorphic p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Typical Project Time</p>
                    <p className="font-semibold text-foreground">{equipment.typicalTime}</p>
                  </div>
                </div>
              </div>

              <div className="card-neumorphic p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Materials</p>
                    <p className="font-semibold text-foreground">{equipment.materials.slice(0, 3).join(", ")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabbed Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <Tabs defaultValue="overview" className="space-y-8">
                  <TabsList className="bg-muted">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="training">Training</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-8">
                    {/* What Is */}
                    <div className="card-neumorphic p-6">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                        What is the {equipment.name}?
                      </h3>
                      <p className="text-muted-foreground">{equipment.whatIs}</p>
                    </div>

                    {/* What Can You Make */}
                    <div className="card-neumorphic p-6">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                        What can you make?
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {equipment.whatCanYouMake.map((item, index) => (
                          <li key={index} className="flex items-center gap-2 text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technical Specs */}
                    <div className="card-neumorphic p-6">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                        Technical Specifications
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {equipment.specs.map((spec, index) => (
                          <div key={index} className="flex justify-between py-2 border-b border-border last:border-0">
                            <span className="text-muted-foreground">{spec.label}</span>
                            <span className="font-mono text-sm text-foreground">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="training" className="space-y-8">
                    {/* Video Placeholder */}
                    <div className="card-neumorphic p-6">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                        Training Video
                      </h3>
                      <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                        <div className="text-center">
                          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                            <Play className="h-8 w-8 text-primary" />
                          </div>
                          <p className="text-muted-foreground">Training video coming soon</p>
                        </div>
                      </div>
                    </div>

                    {/* Take Quiz CTA */}
                    <div className="card-neumorphic p-6 bg-gradient-hero">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                            Ready to get certified?
                          </h3>
                          <p className="text-muted-foreground">
                            Complete the quiz to unlock this equipment.
                          </p>
                        </div>
                        <Button asChild variant="hero" size="lg">
                          <Link to={`/training/${id}`}>
                            Start Quiz
                            <ChevronRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-8">
                    {/* Settings Table */}
                    <div className="card-neumorphic p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display text-xl font-semibold text-foreground">
                          Recommended Settings
                        </h3>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-3 px-2 font-medium text-muted-foreground">Material</th>
                              <th className="text-left py-3 px-2 font-medium text-muted-foreground">Speed</th>
                              <th className="text-left py-3 px-2 font-medium text-muted-foreground">Power</th>
                              <th className="text-left py-3 px-2 font-medium text-muted-foreground">Frequency</th>
                            </tr>
                          </thead>
                          <tbody>
                            {equipment.settings.map((setting, index) => (
                              <tr key={index} className="border-b border-border last:border-0">
                                <td className="py-3 px-2 font-medium">{setting.material}</td>
                                <td className="py-3 px-2 font-mono text-sm">{setting.speed}</td>
                                <td className="py-3 px-2 font-mono text-sm">{setting.power}</td>
                                <td className="py-3 px-2 font-mono text-sm">{setting.frequency}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Pro Tips */}
                    <div className="card-neumorphic p-6">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-warning" />
                        Pro Tips
                      </h3>
                      <ul className="space-y-3">
                        {equipment.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-3 text-muted-foreground">
                            <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="faq">
                    <div className="card-neumorphic p-6">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-primary" />
                        Frequently Asked Questions
                      </h3>
                      <Accordion type="single" collapsible className="w-full">
                        {equipment.faqs.map((faq, index) => (
                          <AccordionItem key={index} value={`faq-${index}`}>
                            <AccordionTrigger className="text-left">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Status Widget */}
                <div className="card-neumorphic p-6 sticky top-24">
                  <h4 className="font-semibold text-foreground mb-4">Current Status</h4>
                  <div className={cn(
                    "rounded-lg p-4 mb-4",
                    equipment.status === "available" && "bg-success/10",
                    equipment.status === "in-use" && "bg-warning/10",
                    equipment.status === "offline" && "bg-destructive/10"
                  )}>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "h-3 w-3 rounded-full",
                        equipment.status === "available" && "bg-success",
                        equipment.status === "in-use" && "bg-warning",
                        equipment.status === "offline" && "bg-destructive"
                      )} />
                      <span className={cn(
                        "font-medium",
                        equipment.status === "available" && "text-success",
                        equipment.status === "in-use" && "text-warning",
                        equipment.status === "offline" && "text-destructive"
                      )}>
                        {equipment.status === "available" ? "Available Now" : 
                         equipment.status === "in-use" ? "In Use" : "Offline for Maintenance"}
                      </span>
                    </div>
                  </div>

                  <Button asChild variant="hero" className="w-full mb-3">
                    <a href="https://clemson.libcal.com" target="_blank" rel="noopener noreferrer">
                      Make a Reservation
                    </a>
                  </Button>

                  <Button variant="outline" className="w-full">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Need Help?
                  </Button>

                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="font-semibold text-foreground mb-3">Related Equipment</h4>
                    <div className="space-y-2">
                      <Link to="/equipment/glowforge" className="block text-sm text-muted-foreground hover:text-primary">
                        Glowforge Plus →
                      </Link>
                      <Link to="/equipment/prusa-mk3s" className="block text-sm text-muted-foreground hover:text-primary">
                        Prusa i3 MK3S+ →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="card-neumorphic p-8 text-center max-w-2xl mx-auto">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Ready to use the {equipment.name}?
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                <Badge className="bg-success/10 text-success">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Safety Training
                </Badge>
                <Badge className={cn(
                  equipment.trainingRequired === "walk-up" 
                    ? "bg-success/10 text-success"
                    : "bg-muted text-muted-foreground"
                )}>
                  {equipment.trainingRequired === "walk-up" ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <AlertTriangle className="h-3 w-3 mr-1" />
                  )}
                  Equipment Quiz
                </Badge>
                {equipment.trainingRequired === "in-person" && (
                  <Badge className="bg-muted text-muted-foreground">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    In-Person Session
                  </Badge>
                )}
              </div>
              <Button asChild variant="hero" size="lg">
                <Link to={`/training/${id}`}>
                  Check Your Progress
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
