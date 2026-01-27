import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Printer,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

// Mock data for charts
const weeklyVisits = [
  { day: "Mon", visits: 45 },
  { day: "Tue", visits: 52 },
  { day: "Wed", visits: 38 },
  { day: "Thu", visits: 65 },
  { day: "Fri", visits: 48 },
  { day: "Sat", visits: 22 },
  { day: "Sun", visits: 15 },
];

const equipmentUsage = [
  { name: "3D Printer (FDM)", usage: 156 },
  { name: "Laser Cutter", usage: 89 },
  { name: "Vinyl Cutter", usage: 67 },
  { name: "Embroidery", usage: 45 },
  { name: "CNC Mill", usage: 23 },
  { name: "Sticker Printer", usage: 78 },
];

const usersByCollege = [
  { name: "Engineering", value: 245, color: "hsl(14, 91%, 58%)" },
  { name: "Architecture", value: 89, color: "hsl(263, 52%, 34%)" },
  { name: "Sciences", value: 67, color: "hsl(180, 70%, 45%)" },
  { name: "Business", value: 34, color: "hsl(142, 71%, 45%)" },
  { name: "Arts", value: 56, color: "hsl(45, 93%, 47%)" },
  { name: "Other", value: 23, color: "hsl(0, 0%, 45%)" },
];

const peakHoursData = [
  { hour: "10am", Mon: 12, Tue: 15, Wed: 8, Thu: 18, Fri: 14 },
  { hour: "11am", Mon: 18, Tue: 22, Wed: 12, Thu: 25, Fri: 20 },
  { hour: "12pm", Mon: 15, Tue: 18, Wed: 20, Thu: 22, Fri: 16 },
  { hour: "1pm", Mon: 22, Tue: 25, Wed: 18, Thu: 28, Fri: 24 },
  { hour: "2pm", Mon: 28, Tue: 30, Wed: 25, Thu: 35, Fri: 28 },
  { hour: "3pm", Mon: 35, Tue: 38, Wed: 32, Thu: 42, Fri: 35 },
  { hour: "4pm", Mon: 32, Tue: 35, Wed: 28, Thu: 38, Fri: 30 },
  { hour: "5pm", Mon: 25, Tue: 28, Wed: 22, Thu: 30, Fri: 25 },
  { hour: "6pm", Mon: 18, Tue: 20, Wed: 15, Thu: 22, Fri: 18 },
  { hour: "7pm", Mon: 12, Tue: 15, Wed: 10, Thu: 18, Fri: 12 },
];

const monthlyTrend = [
  { month: "Sep", visits: 320, users: 145 },
  { month: "Oct", visits: 450, users: 189 },
  { month: "Nov", visits: 380, users: 210 },
  { month: "Dec", visits: 280, users: 198 },
  { month: "Jan", visits: 520, users: 267 },
];

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ElementType;
}

function StatCard({ title, value, change, changeType = "neutral", icon: Icon }: StatCardProps) {
  return (
    <div className="card-neumorphic p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="font-display text-2xl font-bold text-foreground">{value}</p>
          {change && (
            <p className={cn(
              "text-sm mt-1",
              changeType === "positive" && "text-success",
              changeType === "negative" && "text-destructive",
              changeType === "neutral" && "text-muted-foreground"
            )}>
              {change}
            </p>
          )}
        </div>
        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  );
}

export default function Analytics() {
  const [dateRange, setDateRange] = useState("week");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-muted-foreground">
                Track makerspace usage and trends
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-36">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="semester">This Semester</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Visits"
              value="285"
              change="+12% from last week"
              changeType="positive"
              icon={Users}
            />
            <StatCard
              title="Active Users"
              value="89"
              change="+5 new this week"
              changeType="positive"
              icon={TrendingUp}
            />
            <StatCard
              title="Equipment Sessions"
              value="156"
              change="-3% from last week"
              changeType="negative"
              icon={Printer}
            />
            <StatCard
              title="Avg. Daily Visits"
              value="41"
              change="Steady"
              changeType="neutral"
              icon={BarChart3}
            />
          </div>

          {/* Charts */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-muted">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Visits Chart */}
                <div className="card-neumorphic p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display font-semibold text-foreground">
                      Visits This Week
                    </h3>
                    <Badge variant="outline">285 total</Badge>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyVisits}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "hsl(var(--popover))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px"
                          }}
                        />
                        <Bar dataKey="visits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Users by College */}
                <div className="card-neumorphic p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display font-semibold text-foreground">
                      Users by College
                    </h3>
                    <Badge variant="outline">514 total</Badge>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={usersByCollege}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {usersByCollege.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "hsl(var(--popover))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px"
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Peak Hours Heatmap-style */}
              <div className="card-neumorphic p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-semibold text-foreground">
                    Peak Hours (Visits by Time)
                  </h3>
                  <Badge variant="outline">Busiest: Thu 3pm</Badge>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={peakHoursData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                      />
                      <Legend />
                      <Bar dataKey="Mon" fill="hsl(14, 91%, 58%)" stackId="a" />
                      <Bar dataKey="Tue" fill="hsl(263, 52%, 34%)" stackId="a" />
                      <Bar dataKey="Wed" fill="hsl(180, 70%, 45%)" stackId="a" />
                      <Bar dataKey="Thu" fill="hsl(142, 71%, 45%)" stackId="a" />
                      <Bar dataKey="Fri" fill="hsl(45, 93%, 47%)" stackId="a" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="equipment" className="space-y-6">
              <div className="card-neumorphic p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-semibold text-foreground">
                    Equipment Usage
                  </h3>
                  <Badge variant="outline">458 sessions</Badge>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={equipmentUsage} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={120} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                      />
                      <Bar dataKey="usage" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card-neumorphic p-6">
                  <h3 className="font-display font-semibold text-foreground mb-6">
                    New User Registrations
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyTrend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "hsl(var(--popover))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px"
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="users" 
                          stroke="hsl(var(--secondary))" 
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--secondary))" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="card-neumorphic p-6">
                  <h3 className="font-display font-semibold text-foreground mb-6">
                    User Distribution
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={usersByCollege}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {usersByCollege.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "hsl(var(--popover))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px"
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <div className="card-neumorphic p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-semibold text-foreground">
                    Monthly Trends
                  </h3>
                  <Badge variant="outline">5 months</Badge>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="visits" 
                        name="Total Visits"
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))" }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="users" 
                        name="Active Users"
                        stroke="hsl(var(--secondary))" 
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--secondary))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
