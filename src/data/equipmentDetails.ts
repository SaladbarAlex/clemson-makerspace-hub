// Extended equipment details for detail pages
export interface EquipmentDetails {
  whatIs: string;
  whatCanYouMake: string[];
  typicalTime: string;
  materials: string[];
  specs: { label: string; value: string }[];
  settings: { material: string; speed: string; power: string; frequency: string }[];
  tips: string[];
  faqs: { question: string; answer: string }[];
}

export const equipmentDetails: Record<string, EquipmentDetails> = {
  "epilog-laser": {
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
  },
  "glowforge": {
    whatIs: "The Glowforge Plus is a user-friendly desktop laser cutter perfect for beginners and hobbyists. It features a built-in camera for easy material placement and a web-based interface.",
    whatCanYouMake: [
      "Custom gifts and crafts",
      "Engraved jewelry",
      "Cut paper designs",
      "Leather accessories",
      "Wood decorations",
      "Personalized signs"
    ],
    typicalTime: "10-30 minutes",
    materials: ["Wood", "Acrylic", "Leather", "Paper", "Cardboard"],
    specs: [
      { label: "Work Area", value: "19.5\" x 11\" (495 x 279 mm)" },
      { label: "Laser Power", value: "45W CO2" },
      { label: "Max Material Height", value: "0.5\" (12.7mm)" },
      { label: "Interface", value: "Web-based" },
    ],
    settings: [],
    tips: [
      "Use the camera to position your design accurately",
      "Glowforge auto-detects Proofgrade materials",
      "Clean the lens regularly for best results"
    ],
    faqs: [
      {
        question: "Do I need special software?",
        answer: "No, Glowforge uses a web-based interface. Just upload your design and position it using the camera preview."
      }
    ]
  },
  "form3": {
    whatIs: "The Formlabs Form 3 is a professional SLA resin 3D printer that produces highly detailed parts with smooth surface finishes. Ideal for prototypes, jewelry, and miniatures.",
    whatCanYouMake: [
      "High-detail miniatures",
      "Jewelry prototypes",
      "Dental models",
      "Engineering prototypes",
      "Art pieces"
    ],
    typicalTime: "2-8 hours",
    materials: ["Standard Resin", "Tough Resin", "Flexible Resin", "Castable Resin"],
    specs: [
      { label: "Build Volume", value: "145 x 145 x 185 mm" },
      { label: "Layer Height", value: "25-100 microns" },
      { label: "Laser Spot Size", value: "85 microns" },
    ],
    settings: [],
    tips: [
      "Wash and cure prints after removal",
      "Handle uncured resin with gloves",
      "Orient parts at 45° for best results"
    ],
    faqs: [
      {
        question: "Why is resin printing different?",
        answer: "Resin printing uses a laser to cure liquid resin layer by layer, producing much finer details than FDM. However, prints require post-processing (washing and curing)."
      }
    ]
  },
  "cricut": {
    whatIs: "The Cricut Maker 3 is a smart cutting machine that can cut over 300 materials including vinyl, paper, fabric, and leather. Perfect for crafts, stickers, and custom projects.",
    whatCanYouMake: [
      "Custom stickers and decals",
      "Iron-on designs",
      "Paper crafts and cards",
      "Fabric patterns",
      "Leather accessories"
    ],
    typicalTime: "5-20 minutes",
    materials: ["Vinyl", "Paper", "Cardstock", "Fabric", "Leather", "Iron-on"],
    specs: [
      { label: "Max Cutting Width", value: "11.5\" (292 mm)" },
      { label: "Max Cutting Length", value: "12 ft with Smart Materials" },
      { label: "Cutting Force", value: "4 kg" },
    ],
    settings: [],
    tips: [
      "Use the correct mat for your material",
      "Mirror iron-on designs before cutting",
      "Weed carefully for detailed designs"
    ],
    faqs: [
      {
        question: "What software do I use?",
        answer: "Cricut uses Design Space, a free web and desktop app. You can upload your own designs or use the built-in library."
      }
    ]
  },
  "embroidery": {
    whatIs: "The Brother PE800 is a computerized embroidery machine that can stitch intricate designs onto fabric. Perfect for custom patches, monograms, and decorative projects.",
    whatCanYouMake: [
      "Custom patches and badges",
      "Monogrammed items",
      "Decorated apparel",
      "Quilting designs",
      "Personalized gifts"
    ],
    typicalTime: "15-60 minutes",
    materials: ["Cotton", "Polyester", "Denim", "Canvas", "Twill"],
    specs: [
      { label: "Embroidery Area", value: "5\" x 7\" (130 x 180 mm)" },
      { label: "Built-in Designs", value: "138" },
      { label: "Max Speed", value: "650 stitches/min" },
    ],
    settings: [],
    tips: [
      "Use stabilizer for best results",
      "Hoop fabric taut but not stretched",
      "Test on scrap fabric first"
    ],
    faqs: [
      {
        question: "What file format do I need?",
        answer: "The PE800 accepts PES files. Many free converters are available online, or use PE-Design software."
      }
    ]
  }
};

// Default details for equipment without specific data
export const defaultEquipmentDetails: EquipmentDetails = {
  whatIs: "This equipment is available for use at the Clemson Makerspace. Complete the required training to get started.",
  whatCanYouMake: ["Custom projects", "Prototypes", "Personal items", "Class assignments"],
  typicalTime: "Varies by project",
  materials: ["See equipment manual"],
  specs: [],
  settings: [],
  tips: ["Ask a makerspace intern for help getting started"],
  faqs: []
};
