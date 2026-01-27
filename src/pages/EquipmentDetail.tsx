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
  ChevronRight,
  MapPin,
  Clock,
  FileText,
  GraduationCap,
  CheckCircle,
  Play,
  Download,
  Lightbulb,
  Hexagon
} from "lucide-react";
import { equipmentList, statusConfig, trainingConfig, locationConfig } from "@/data/equipment";
import { equipmentDetails, defaultEquipmentDetails } from "@/data/equipmentDetails";

export default function EquipmentDetail() {
  const { id } = useParams<{ id: string }>();
  
  // Find equipment from shared data
  const equipment = id ? equipmentList.find(e => e.id === id) : null;
  const details = id ? (equipmentDetails[id] || defaultEquipmentDetails) : defaultEquipmentDetails;

  // Fallback for equipment not found
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
  const status = statusConfig[equipment.status];
  const training = trainingConfig[equipment.trainingRequired];
  const Icon = equipment.icon;

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
                  <Badge variant="secondary" className={cn(location.badgeClass)}>
                    <MapPin className="h-3 w-3 mr-1" />
                    {location.label}
                  </Badge>
                  <Badge variant="outline" className={cn(status.badgeClass)}>
                    <span className={cn("h-2 w-2 rounded-full mr-1.5", status.dotClass)} />
                    {status.label}
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

              {/* Equipment Icon/Image Placeholder */}
              <div className="h-80 rounded-2xl bg-muted/50 flex items-center justify-center">
                <div className="h-32 w-32 rounded-2xl bg-gradient-hero flex items-center justify-center">
                  <Icon className="h-16 w-16 text-primary" />
                </div>
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
                    <p className="font-semibold text-foreground">{training.label}</p>
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
                    <p className="font-semibold text-foreground">{details.typicalTime}</p>
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
                    <p className="font-semibold text-foreground">{details.materials.slice(0, 3).join(", ")}</p>
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
                      <p className="text-muted-foreground">{details.whatIs}</p>
                    </div>

                    {/* What Can You Make */}
                    <div className="card-neumorphic p-6">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                        What can you make?
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {details.whatCanYouMake.map((item, index) => (
                          <li key={index} className="flex items-center gap-2 text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technical Specs */}
                    {details.specs.length > 0 && (
                      <div className="card-neumorphic p-6">
                        <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                          Technical Specifications
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {details.specs.map((spec, index) => (
                            <div key={index} className="flex justify-between py-2 border-b border-border last:border-0">
                              <span className="text-muted-foreground">{spec.label}</span>
                              <span className="font-mono text-sm text-foreground">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
                    {details.settings.length > 0 ? (
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
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-border">
                                <th className="text-left py-3 px-2 font-semibold text-foreground">Material</th>
                                <th className="text-left py-3 px-2 font-semibold text-foreground">Speed</th>
                                <th className="text-left py-3 px-2 font-semibold text-foreground">Power</th>
                                <th className="text-left py-3 px-2 font-semibold text-foreground">Frequency</th>
                              </tr>
                            </thead>
                            <tbody>
                              {details.settings.map((setting, index) => (
                                <tr key={index} className="border-b border-border last:border-0">
                                  <td className="py-3 px-2 text-foreground">{setting.material}</td>
                                  <td className="py-3 px-2 font-mono text-muted-foreground">{setting.speed}</td>
                                  <td className="py-3 px-2 font-mono text-muted-foreground">{setting.power}</td>
                                  <td className="py-3 px-2 font-mono text-muted-foreground">{setting.frequency}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="card-neumorphic p-6">
                        <p className="text-muted-foreground">Settings information coming soon. Ask a makerspace intern for recommendations.</p>
                      </div>
                    )}

                    {/* Pro Tips */}
                    {details.tips.length > 0 && (
                      <div className="card-neumorphic p-6">
                        <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                          Pro Tips
                        </h3>
                        <div className="space-y-3">
                          {details.tips.map((tip, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                              <Lightbulb className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                              <p className="text-muted-foreground text-sm">{tip}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="faq" className="space-y-8">
                    {details.faqs.length > 0 ? (
                      <div className="card-neumorphic p-6">
                        <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                          Frequently Asked Questions
                        </h3>
                        <Accordion type="single" collapsible className="w-full">
                          {details.faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`faq-${index}`}>
                              <AccordionTrigger className="text-left hover:no-underline">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-muted-foreground">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    ) : (
                      <div className="card-neumorphic p-6">
                        <p className="text-muted-foreground">No FAQs available yet. Have a question? Ask a makerspace intern!</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-4">
                  {/* Status Widget */}
                  <div className="card-neumorphic p-4">
                    <h4 className="font-semibold text-foreground mb-3">Current Status</h4>
                    <Badge variant="outline" className={cn("w-full justify-center py-2", status.badgeClass)}>
                      <span className={cn("h-2 w-2 rounded-full mr-2", status.dotClass)} />
                      {status.label}
                    </Badge>
                  </div>

                  {/* Quick Actions */}
                  <div className="card-neumorphic p-4 space-y-3">
                    <Button asChild variant="hero" className="w-full">
                      <a href="https://clemson.libcal.com" target="_blank" rel="noopener noreferrer">
                        Make a Reservation
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full">
                      Need Help?
                    </Button>
                  </div>

                  {/* Related Equipment */}
                  <div className="card-neumorphic p-4">
                    <h4 className="font-semibold text-foreground mb-3">Related Equipment</h4>
                    <div className="space-y-2">
                      {equipmentList
                        .filter(e => e.categoryId === equipment.categoryId && e.id !== equipment.id)
                        .slice(0, 3)
                        .map(related => (
                          <Link 
                            key={related.id}
                            to={`/equipment/${related.id}`}
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors text-sm"
                          >
                            <related.icon className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground hover:text-foreground">{related.name}</span>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
