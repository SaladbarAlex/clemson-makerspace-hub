import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { 
  CheckCircle, 
  Printer, 
  Hexagon, 
  Cpu, 
  Scissors, 
  Shirt,
  Building2,
  ClipboardList
} from "lucide-react";
import confetti from "canvas-confetti";

const locations = [
  { id: "watt", name: "Watt Makerspace", icon: Building2 },
  { id: "cooper", name: "Adobe Studio & Makerspace", icon: Building2 },
];

const equipmentTypes = [
  { id: "3d-fdm", name: "3D Printer (FDM)", icon: Printer },
  { id: "3d-sla", name: "3D Printer (SLA Resin)", icon: Printer },
  { id: "laser-epilog", name: "Epilog Laser Cutter", icon: Hexagon },
  { id: "laser-glowforge", name: "Glowforge Laser", icon: Hexagon },
  { id: "cnc", name: "CNC Mill", icon: Cpu },
  { id: "vinyl", name: "Vinyl Cutter (Cricut)", icon: Scissors },
  { id: "sticker", name: "Sticker Printer", icon: Scissors },
  { id: "embroidery", name: "Embroidery Machine", icon: Shirt },
  { id: "fabric", name: "Fabric Printer", icon: Shirt },
];

const projectTypes = [
  { id: "personal", name: "Personal Project" },
  { id: "class", name: "Class Project" },
  { id: "research", name: "Research" },
  { id: "organization", name: "Organization/Club" },
];

const printers = [
  "Prusa i3 MK3S #1",
  "Prusa i3 MK3S #2",
  "Prusa i3 MK3S #3",
  "Prusa i3 MK3S #4",
  "Prusa Mini #1",
  "Prusa Mini #2",
  "Ender 3 #1",
  "Ender 3 #2",
];

const printStatuses = [
  { id: "not-started", name: "Not Started" },
  { id: "in-progress", name: "In Progress" },
  { id: "success", name: "Completed Successfully" },
  { id: "failed", name: "Failed" },
];

export default function LogEquipment() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    location: "",
    equipment: "",
    projectName: "",
    projectType: "",
    classNumber: "",
    professorName: "",
    advisorName: "",
    projectSponsor: "",
    organizationName: "",
    printerName: "",
    estimatedDuration: "",
    durationUnit: "minutes",
    estimatedMass: "",
    printStatus: "",
    printNotes: "",
    itemCount: "",
  });

  const is3DPrinting = formData.equipment === "3d-fdm" || formData.equipment === "3d-sla";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        username: "",
        location: "",
        equipment: "",
        projectName: "",
        projectType: "",
        classNumber: "",
        professorName: "",
        advisorName: "",
        projectSponsor: "",
        organizationName: "",
        printerName: "",
        estimatedDuration: "",
        durationUnit: "minutes",
        estimatedMass: "",
        printStatus: "",
        printNotes: "",
        itemCount: "",
      });
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center animate-scale-in">
            <div className="mx-auto h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mb-6">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Project Logged!
            </h1>
            <p className="text-muted-foreground mb-4">
              {is3DPrinting && formData.printStatus === "in-progress" 
                ? "We'll email you when your print is complete!"
                : "Thanks for logging your project."}
            </p>
            <p className="text-sm text-muted-foreground">
              Returning to form in 3 seconds...
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <ClipboardList className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Log Your Project
            </h1>
            <p className="text-muted-foreground">
              Help us track equipment usage and improve our services
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="card-neumorphic p-6">
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                Basic Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">Clemson Username</Label>
                  <Input
                    id="username"
                    placeholder="e.g., jsmith"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Location</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {locations.map((loc) => (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, location: loc.id })}
                        className={cn(
                          "p-4 rounded-lg border-2 transition-all text-left",
                          formData.location === loc.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <loc.icon className="h-5 w-5 text-primary mb-2" />
                        <span className="font-medium text-sm">{loc.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Equipment Type</Label>
                  <Select
                    value={formData.equipment}
                    onValueChange={(value) => setFormData({ ...formData, equipment: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select equipment" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {equipmentTypes.map((eq) => (
                        <SelectItem key={eq.id} value={eq.id}>
                          <div className="flex items-center gap-2">
                            <eq.icon className="h-4 w-4" />
                            {eq.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="card-neumorphic p-6">
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                Project Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    placeholder="e.g., Custom Phone Stand"
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Project Type</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {projectTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, projectType: type.id })}
                        className={cn(
                          "p-3 rounded-lg border-2 transition-all text-center",
                          formData.projectType === type.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <span className="text-sm font-medium">{type.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {formData.projectType === "class" && (
              <div className="card-neumorphic p-6 animate-fade-in">
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                  Class Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="classNumber">Class Number</Label>
                    <Input
                      id="classNumber"
                      placeholder="e.g., ARCH 2040"
                      value={formData.classNumber}
                      onChange={(e) => setFormData({ ...formData, classNumber: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="professorName">Professor Name</Label>
                    <Input
                      id="professorName"
                      placeholder="e.g., Dr. Smith"
                      value={formData.professorName}
                      onChange={(e) => setFormData({ ...formData, professorName: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.projectType === "research" && (
              <div className="card-neumorphic p-6 animate-fade-in">
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                  Research Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="advisorName">Advisor Name</Label>
                    <Input
                      id="advisorName"
                      placeholder="e.g., Dr. Johnson"
                      value={formData.advisorName}
                      onChange={(e) => setFormData({ ...formData, advisorName: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="projectSponsor">Project Sponsor</Label>
                    <Input
                      id="projectSponsor"
                      placeholder="e.g., NSF Grant"
                      value={formData.projectSponsor}
                      onChange={(e) => setFormData({ ...formData, projectSponsor: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.projectType === "organization" && (
              <div className="card-neumorphic p-6 animate-fade-in">
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                  Organization Information
                </h2>
                <div>
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input
                    id="organizationName"
                    placeholder="e.g., Robotics Club"
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            {is3DPrinting && (
              <div className="card-neumorphic p-6 animate-fade-in">
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                  3D Print Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label>Printer Name</Label>
                    <Select
                      value={formData.printerName}
                      onValueChange={(value) => setFormData({ ...formData, printerName: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select printer" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {printers.map((printer) => (
                          <SelectItem key={printer} value={printer}>
                            {printer}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="duration">Estimated Duration</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="duration"
                          type="number"
                          placeholder="0"
                          value={formData.estimatedDuration}
                          onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
                        />
                        <Select
                          value={formData.durationUnit}
                          onValueChange={(value) => setFormData({ ...formData, durationUnit: value })}
                        >
                          <SelectTrigger className="w-28">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border">
                            <SelectItem value="minutes">min</SelectItem>
                            <SelectItem value="hours">hrs</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="mass">Estimated Mass (g)</Label>
                      <Input
                        id="mass"
                        type="number"
                        placeholder="0"
                        value={formData.estimatedMass}
                        onChange={(e) => setFormData({ ...formData, estimatedMass: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Print Status</Label>
                    <Select
                      value={formData.printStatus}
                      onValueChange={(value) => setFormData({ ...formData, printStatus: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {printStatuses.map((status) => (
                          <SelectItem key={status.id} value={status.id}>
                            {status.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="notes">Notes (optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any issues or special settings used..."
                      value={formData.printNotes}
                      onChange={(e) => setFormData({ ...formData, printNotes: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.equipment && !is3DPrinting && (
              <div className="card-neumorphic p-6 animate-fade-in">
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                  Output Details
                </h2>
                <div>
                  <Label htmlFor="itemCount">Number of Items Made</Label>
                  <Input
                    id="itemCount"
                    type="number"
                    placeholder="e.g., 5"
                    value={formData.itemCount}
                    onChange={(e) => setFormData({ ...formData, itemCount: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={!formData.username || !formData.location || !formData.equipment || !formData.projectName || !formData.projectType}
            >
              Log Project
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
