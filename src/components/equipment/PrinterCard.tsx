import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Printer, printerStatusConfig } from "@/data/printers";

interface PrinterCardProps {
  printer: Printer;
  index: number;
}

export function PrinterCard({ printer, index }: PrinterCardProps) {
  const status = printerStatusConfig[printer.status];

  return (
    <div
      className={cn(
        "card-glass p-4 animate-fade-in-up transition-all duration-200",
        printer.status === "offline" && "opacity-60"
      )}
      style={{ animationDelay: `${index * 0.03}s` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-display font-semibold text-foreground text-sm">
            {printer.name}
          </h3>
          <span className="text-xs text-muted-foreground">{printer.location}</span>
        </div>
        <Badge className={cn("text-xs", status.bgColor, status.textColor)}>
          <span className={cn("h-1.5 w-1.5 rounded-full mr-1.5", status.color)} />
          {status.label}
        </Badge>
      </div>

      {/* Printing Status */}
      {printer.status === "printing" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground truncate max-w-[100px]">
              {printer.currentJob}
            </span>
            <span className="font-mono text-foreground">{printer.progress}%</span>
          </div>
          <Progress value={printer.progress} className="h-1.5" />
          <p className="text-xs text-muted-foreground">
            ~{printer.timeRemaining} remaining
          </p>
        </div>
      )}

      {/* Finished Status */}
      {printer.status === "finished" && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground truncate">
            {printer.currentJob}
          </p>
          <p className="text-xs text-primary font-medium">Ready for pickup</p>
        </div>
      )}

      {/* Available */}
      {printer.status === "available" && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full mt-2 text-primary hover:text-primary hover:bg-primary/10"
        >
          Reserve Now
        </Button>
      )}

      {/* Offline */}
      {printer.status === "offline" && (
        <p className="text-xs text-muted-foreground mt-2">
          Maintenance in progress
        </p>
      )}
    </div>
  );
}
