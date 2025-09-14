import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, CreditCard, Target } from "lucide-react";

// Mock financial data
const netWorthData = [
  { month: "Jan", assets: 850000, liabilities: 320000, netWorth: 530000 },
  { month: "Feb", assets: 890000, liabilities: 315000, netWorth: 575000 },
  { month: "Mar", assets: 920000, liabilities: 310000, netWorth: 610000 },
  { month: "Apr", assets: 980000, liabilities: 305000, netWorth: 675000 },
  { month: "May", assets: 1050000, liabilities: 300000, netWorth: 750000 },
  { month: "Jun", assets: 1120000, liabilities: 295000, netWorth: 825000 },
];

const portfolioData = [
  { name: "Equity Funds", value: 450000, color: "hsl(var(--primary))" },
  { name: "Debt Funds", value: 280000, color: "hsl(var(--secondary))" },
  { name: "Gold", value: 120000, color: "hsl(var(--accent))" },
  { name: "Real Estate", value: 350000, color: "hsl(var(--success))" },
  { name: "Fixed Deposits", value: 150000, color: "hsl(var(--muted-foreground))" },
];

const sipPerformanceData = [
  { month: "Jan", investment: 15000, value: 14800, returns: -200 },
  { month: "Feb", investment: 30000, value: 31200, returns: 1200 },
  { month: "Mar", investment: 45000, value: 47800, returns: 2800 },
  { month: "Apr", investment: 60000, value: 64500, returns: 4500 },
  { month: "May", investment: 75000, value: 82300, returns: 7300 },
  { month: "Jun", investment: 90000, value: 99800, returns: 9800 },
];

const expenseData = [
  { category: "Housing", amount: 25000, budget: 30000 },
  { category: "Food", amount: 12000, budget: 15000 },
  { category: "Transport", amount: 8000, budget: 10000 },
  { category: "Utilities", amount: 5000, budget: 6000 },
  { category: "Entertainment", amount: 7000, budget: 8000 },
  { category: "Shopping", amount: 15000, budget: 12000 },
];

const financialMetrics = [
  {
    title: "Net Worth",
    value: "₹8.25L",
    change: "+12.3%",
    trend: "up",
    icon: TrendingUp,
    color: "text-success",
  },
  {
    title: "Monthly Income",
    value: "₹85K",
    change: "+5.2%",
    trend: "up",
    icon: DollarSign,
    color: "text-primary",
  },
  {
    title: "Total Savings",
    value: "₹4.2L",
    change: "+18.7%",
    trend: "up",
    icon: PiggyBank,
    color: "text-secondary",
  },
  {
    title: "Credit Score",
    value: "785",
    change: "+15",
    trend: "up",
    icon: CreditCard,
    color: "text-accent",
  },
];

export function FinancialDashboard() {
  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {financialMetrics.map((metric, index) => (
          <Card key={index} className="card-shadow hover:shadow-financial transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                  <p className={`text-sm mt-1 ${metric.color} flex items-center`}>
                    {metric.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {metric.change}
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-subtle`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Net Worth Trend */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-success" />
              Net Worth Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={netWorthData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="month" 
                  className="text-muted-foreground"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  className="text-muted-foreground"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`₹${(value / 100000).toFixed(2)}L`, ""]}
                />
                <defs>
                  <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="netWorth"
                  stroke="hsl(var(--success))"
                  strokeWidth={3}
                  fill="url(#netWorthGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Portfolio Distribution */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary" />
              Investment Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`₹${(value / 100000).toFixed(2)}L`, ""]}
                />
                <Legend 
                  wrapperStyle={{ fontSize: "12px" }}
                  formatter={(value) => <span className="text-muted-foreground">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* SIP Performance */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PiggyBank className="w-5 h-5 mr-2 text-secondary" />
              SIP Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sipPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="month" 
                  className="text-muted-foreground"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  className="text-muted-foreground"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number, name: string) => [
                    `₹${(value / 1000).toFixed(1)}K`, 
                    name === "investment" ? "Invested" : name === "value" ? "Current Value" : "Returns"
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="investment"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Expenses vs Budget */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-accent" />
              Expenses vs Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={expenseData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  type="number"
                  className="text-muted-foreground"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                />
                <YAxis 
                  type="category"
                  dataKey="category"
                  className="text-muted-foreground"
                  tick={{ fontSize: 12 }}
                  width={80}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number, name: string) => [
                    `₹${(value / 1000).toFixed(1)}K`, 
                    name === "amount" ? "Spent" : "Budget"
                  ]}
                />
                <Bar dataKey="budget" fill="hsl(var(--muted))" />
                <Bar dataKey="amount" fill="hsl(var(--accent))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}