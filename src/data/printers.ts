export type PrinterStatus = "available" | "printing" | "offline" | "finished";

export interface Printer {
  id: number;
  name: string;
  location: "Watt" | "Cooper";
  status: PrinterStatus;
  progress?: number;
  timeRemaining?: string;
  currentJob?: string;
  lastUpdate?: string;
}

// Based on cumaker.space - 28 printers across two locations
// Adobe printers are at Cooper Library, Mini printers at Watt Innovation Center
export const printers: Printer[] = [
  // Watt Innovation Center - Prusa Mini Farm (14 printers)
  { id: 1, name: "Mini 01", location: "Watt", status: "available" },
  { id: 2, name: "Mini 02", location: "Watt", status: "printing", progress: 67, timeRemaining: "2h 15m", currentJob: "Phone Stand" },
  { id: 3, name: "Mini 03", location: "Watt", status: "printing", progress: 23, timeRemaining: "4h 45m", currentJob: "Enclosure Part A" },
  { id: 4, name: "Mini 04", location: "Watt", status: "available" },
  { id: 5, name: "Mini 05", location: "Watt", status: "printing", progress: 89, timeRemaining: "0h 35m", currentJob: "Keychain Set" },
  { id: 6, name: "Mini 06", location: "Watt", status: "finished", currentJob: "Bracket v2" },
  { id: 7, name: "Mini 07", location: "Watt", status: "available" },
  { id: 8, name: "Mini 08", location: "Watt", status: "printing", progress: 45, timeRemaining: "3h 20m", currentJob: "Gear Assembly" },
  { id: 9, name: "Mini 09", location: "Watt", status: "offline" },
  { id: 10, name: "Mini 10", location: "Watt", status: "available" },
  { id: 11, name: "Mini 11", location: "Watt", status: "printing", progress: 12, timeRemaining: "6h 10m", currentJob: "Figurine Base" },
  { id: 12, name: "Mini 12", location: "Watt", status: "available" },
  { id: 13, name: "Mini 13", location: "Watt", status: "finished", currentJob: "Cable Organizer" },
  { id: 14, name: "Mini 14", location: "Watt", status: "available" },
  
  // Cooper Library - Adobe Studio Printers (14 printers)
  { id: 15, name: "Adobe 01", location: "Cooper", status: "available" },
  { id: 16, name: "Adobe 02", location: "Cooper", status: "printing", progress: 78, timeRemaining: "1h 05m", currentJob: "Name Plate" },
  { id: 17, name: "Adobe 03", location: "Cooper", status: "available" },
  { id: 18, name: "Adobe 04", location: "Cooper", status: "printing", progress: 34, timeRemaining: "4h 00m", currentJob: "Project Box" },
  { id: 19, name: "Adobe 05", location: "Cooper", status: "finished", currentJob: "Hook Set" },
  { id: 20, name: "Adobe 06", location: "Cooper", status: "available" },
  { id: 21, name: "Adobe 07", location: "Cooper", status: "offline" },
  { id: 22, name: "Adobe 08", location: "Cooper", status: "printing", progress: 56, timeRemaining: "2h 40m", currentJob: "Dice Tower" },
  { id: 23, name: "Adobe 09", location: "Cooper", status: "available" },
  { id: 24, name: "Adobe 10", location: "Cooper", status: "printing", progress: 91, timeRemaining: "0h 20m", currentJob: "Button Cap" },
  { id: 25, name: "Adobe 11", location: "Cooper", status: "available" },
  { id: 26, name: "Adobe 12", location: "Cooper", status: "finished", currentJob: "Phone Holder" },
  { id: 27, name: "Adobe 13", location: "Cooper", status: "available" },
  { id: 28, name: "Adobe 14", location: "Cooper", status: "printing", progress: 8, timeRemaining: "7h 30m", currentJob: "Large Frame" },
];

export const printerStatusConfig = {
  available: {
    label: "Idle",
    color: "bg-success",
    textColor: "text-success",
    bgColor: "bg-success/10",
  },
  printing: {
    label: "Printing",
    color: "bg-accent",
    textColor: "text-accent",
    bgColor: "bg-accent/10",
  },
  finished: {
    label: "Finished",
    color: "bg-primary",
    textColor: "text-primary",
    bgColor: "bg-primary/10",
  },
  offline: {
    label: "Offline",
    color: "bg-destructive",
    textColor: "text-destructive",
    bgColor: "bg-destructive/10",
  },
};
