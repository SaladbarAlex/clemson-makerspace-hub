import { Printer, Hexagon, Cpu, Shirt, Scissors, Wrench, Scan, CircleDot, Sticker, LucideIcon } from "lucide-react";

export type EquipmentStatus = "available" | "in-use" | "offline";
export type TrainingType = "quiz" | "in-person" | "walk-up";
export type Location = "watt" | "cooper" | "cook";

export interface Equipment {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  location: Location;
  status: EquipmentStatus;
  waitingCount?: number;
  trainingRequired: TrainingType;
  description: string;
  icon: LucideIcon;
}

export const equipmentList: Equipment[] = [
  {
    id: "prusa-mk3s",
    name: "Prusa i3 MK3S+",
    category: "3D Printing",
    categoryId: "3d-printing",
    location: "watt",
    status: "available",
    trainingRequired: "quiz",
    description: "Reliable FDM 3D printer with auto bed leveling",
    icon: Printer,
  },
  {
    id: "prusa-mini",
    name: "Prusa Mini+",
    category: "3D Printing",
    categoryId: "3d-printing",
    location: "watt",
    status: "in-use",
    waitingCount: 1,
    trainingRequired: "quiz",
    description: "Compact FDM printer for smaller projects",
    icon: Printer,
  },
  {
    id: "form3",
    name: "Formlabs Form 3",
    category: "3D Printing",
    categoryId: "3d-printing",
    location: "watt",
    status: "available",
    trainingRequired: "in-person",
    description: "High-detail SLA resin printer",
    icon: Printer,
  },
  {
    id: "epilog-laser",
    name: "Epilog Fusion M2",
    category: "Laser Cutting",
    categoryId: "laser-cutting",
    location: "watt",
    status: "in-use",
    waitingCount: 2,
    trainingRequired: "in-person",
    description: "Professional CO2 laser cutter and engraver",
    icon: Hexagon,
  },
  {
    id: "glowforge",
    name: "Glowforge Plus",
    category: "Laser Cutting",
    categoryId: "laser-cutting",
    location: "cooper",
    status: "available",
    trainingRequired: "in-person",
    description: "User-friendly laser cutter for beginners",
    icon: Hexagon,
  },
  {
    id: "cnc-mill",
    name: "Carbide 3D Shapeoko",
    category: "CNC & Scanning",
    categoryId: "cnc",
    location: "watt",
    status: "offline",
    trainingRequired: "in-person",
    description: "CNC router for wood, plastic, and soft metals",
    icon: Cpu,
  },
  {
    id: "3d-scanner",
    name: "EinScan Pro 2X",
    category: "CNC & Scanning",
    categoryId: "cnc",
    location: "watt",
    status: "available",
    trainingRequired: "quiz",
    description: "Professional-grade 3D scanner",
    icon: Scan,
  },
  {
    id: "cricut",
    name: "Cricut Maker 3",
    category: "Vinyl & Stickers",
    categoryId: "vinyl",
    location: "cooper",
    status: "available",
    trainingRequired: "walk-up",
    description: "Vinyl cutter for stickers and decals",
    icon: Scissors,
  },
  {
    id: "sticker-printer",
    name: "Roland BN-20A",
    category: "Vinyl & Stickers",
    categoryId: "vinyl",
    location: "cooper",
    status: "available",
    trainingRequired: "quiz",
    description: "Print and cut vinyl stickers",
    icon: Sticker,
  },
  {
    id: "embroidery",
    name: "Brother PE800",
    category: "Textiles",
    categoryId: "textiles",
    location: "cooper",
    status: "available",
    trainingRequired: "quiz",
    description: "Computerized embroidery machine",
    icon: Shirt,
  },
  {
    id: "fabric-printer",
    name: "Epson SureColor F170",
    category: "Textiles",
    categoryId: "textiles",
    location: "cooper",
    status: "in-use",
    trainingRequired: "quiz",
    description: "Dye-sublimation fabric printer",
    icon: Shirt,
  },
  {
    id: "button-maker",
    name: "Badge-A-Minit",
    category: "Crafts",
    categoryId: "vinyl",
    location: "cooper",
    status: "available",
    trainingRequired: "walk-up",
    description: "Manual button and pin maker",
    icon: CircleDot,
  },
];

export const categories = [
  { id: "all", name: "All Equipment", icon: Wrench },
  { id: "3d-printing", name: "3D Printing", icon: Printer },
  { id: "laser-cutting", name: "Laser Cutting", icon: Hexagon },
  { id: "cnc", name: "CNC & Scanning", icon: Cpu },
  { id: "textiles", name: "Textiles", icon: Shirt },
  { id: "vinyl", name: "Vinyl & Stickers", icon: Scissors },
];

export const statusConfig = {
  available: { 
    label: "Available", 
    dotClass: "bg-success",
    badgeClass: "bg-success/10 text-success border-success/20" 
  },
  "in-use": { 
    label: "In Use", 
    dotClass: "bg-warning",
    badgeClass: "bg-warning/10 text-warning border-warning/20" 
  },
  offline: { 
    label: "Offline", 
    dotClass: "bg-destructive",
    badgeClass: "bg-destructive/10 text-destructive border-destructive/20" 
  },
};

export const trainingConfig = {
  quiz: { label: "Quiz Required", badgeClass: "border-warning/50 text-warning" },
  "in-person": { label: "In-Person Training", badgeClass: "border-destructive/50 text-destructive" },
  "walk-up": { label: "Walk-Up OK", badgeClass: "border-success/50 text-success" },
};

export const locationConfig = {
  watt: { label: "Watt", badgeClass: "bg-primary/10 text-primary" },
  cooper: { label: "Cooper", badgeClass: "bg-secondary/10 text-secondary" },
  cook: { label: "Cook", badgeClass: "bg-accent/10 text-accent" },
};
