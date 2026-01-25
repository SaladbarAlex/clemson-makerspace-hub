import { Printer, MapPin, Clock, Users } from "lucide-react";

const stats = [
  {
    icon: Printer,
    value: "12",
    label: "Equipment Types",
  },
  {
    icon: MapPin,
    value: "2",
    label: "Locations",
  },
  {
    icon: Clock,
    value: "Mon-Fri",
    label: "10am - 8pm",
  },
  {
    icon: Users,
    value: "500+",
    label: "Active Members",
  },
];

export function StatsBar() {
  return (
    <section className="bg-gradient-stats relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%200h40v40H0z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M20%200v40M0%2020h40%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.08)%22%20stroke-width%3D%221%22%2F%3E%3C%2Fsvg%3E')]" />
      
      <div className="container mx-auto px-4 py-6 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 justify-center lg:justify-start animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/10">
                <stat.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/80">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
