import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, User, ChevronDown, Printer, Scissors, Cpu, Shirt, Hexagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const equipmentCategories = [
  { name: "3D Printing", icon: Printer, href: "/equipment?category=3d-printing" },
  { name: "Laser Cutting", icon: Hexagon, href: "/equipment?category=laser-cutting" },
  { name: "CNC & Scanning", icon: Cpu, href: "/equipment?category=cnc" },
  { name: "Textiles", icon: Shirt, href: "/equipment?category=textiles" },
  { name: "Vinyl & Stickers", icon: Scissors, href: "/equipment?category=vinyl" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Equipment", href: "/equipment", hasDropdown: true },
  { name: "Get Started", href: "/get-started" },
  { name: "Reservations", href: "/reservations" },
  { name: "Workshops", href: "/workshops" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [equipmentDropdownOpen, setEquipmentDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-orange">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 text-primary-foreground"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <span className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              Clemson Makerspace
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setEquipmentDropdownOpen(true)}
                    onMouseLeave={() => setEquipmentDropdownOpen(false)}
                  >
                    <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-lg hover:bg-muted">
                      {link.name}
                      <ChevronDown className={cn("h-4 w-4 transition-transform", equipmentDropdownOpen && "rotate-180")} />
                    </button>
                    
                    {/* Equipment Dropdown */}
                    <div
                      className={cn(
                        "absolute top-full left-0 mt-1 w-64 rounded-xl border border-border bg-popover p-3 shadow-card transition-all duration-200",
                        equipmentDropdownOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
                      )}
                    >
                      <div className="grid gap-1">
                        {equipmentCategories.map((category) => (
                          <Link
                            key={category.name}
                            to={category.href}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
                          >
                            <category.icon className="h-5 w-5 text-primary" />
                            {category.name}
                          </Link>
                        ))}
                        <div className="my-1 border-t border-border" />
                        <Link
                          to="/equipment"
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-primary hover:bg-muted transition-colors"
                        >
                          View All Equipment →
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.href}
                    className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-lg hover:bg-muted"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden sm:flex"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Sign In Button */}
            <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
              <User className="h-4 w-4" />
              Sign In
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 z-50 bg-background border-b border-border transition-all duration-300",
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="block px-4 py-3 text-base font-medium text-foreground rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-border">
            <Button variant="outline" className="w-full justify-center gap-2">
              <User className="h-4 w-4" />
              Sign In
            </Button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-card animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search equipment, tutorials, workshops..."
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
