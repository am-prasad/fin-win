import { TrendingUp, AlertTriangle, Target, PiggyBank } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const mockInsights = [
  {
    id: "1",
    type: "success",
    title: "Investment Growth",
    description:
      "Your equity portfolio outperformed the market this quarter with strong returns from technology and healthcare sectors.",
    value: "+18.5%",
    change: "+2.3%",
    priority: "high",
    actionable: true,
  },
  {
    id: "2",
    type: "warning",
    title: "Credit Utilization",
    description:
      "Your credit card usage is at 78% of the limit. Consider paying down debt to improve your credit score.",
    value: "₹1.17L / ₹1.5L",
    progress: 78,
    priority: "high",
    actionable: true,
  },
  {
    id: "3",
    type: "goal",
    title: "Emergency Fund Goal",
    description:
      "You're 70% towards your 6-month emergency fund target. Great progress! Keep building it steadily.",
    value: "₹2.1L / ₹3L",
    progress: 70,
    priority: "medium",
    actionable: true,
  },
  {
    id: "4",
    type: "info",
    title: "SIP Performance",
    description:
      "Your systematic investment plan is delivering consistent returns. Consider increasing the amount by 10%.",
    value: "₹15K/month",
    change: "+12.4%",
    priority: "medium",
    actionable: true,
  },
  {
    id: "5",
    type: "success",
    title: "Debt Reduction",
    description:
      "You've successfully reduced your home loan principal by ₹2.5L this year through prepayments.",
    value: "₹2.5L",
    change: "-8.3%",
    priority: "low",
    actionable: false,
  },
  {
    id: "6",
    type: "warning",
    title: "Tax Planning",
    description:
      "Only 2 months left for tax year. You can still save ₹46K in taxes with 80C investments.",
    value: "₹46K",
    priority: "high",
    actionable: true,
  },
];

export function InsightCards() {
  const getInsightIcon = (type) => {
    switch (type) {
      case "success":
        return <TrendingUp className="w-5 h-5 text-success" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case "goal":
        return <Target className="w-5 h-5 text-primary" />;
      default:
        return <PiggyBank className="w-5 h-5 text-accent" />;
    }
  };

  const getInsightStyles = (type) => {
    switch (type) {
      case "success":
        return "border-success/20 bg-gradient-success/10";
      case "warning":
        return "border-warning/20 bg-warning/5";
      case "goal":
        return "border-primary/20 bg-gradient-financial/10";
      default:
        return "border-accent/20 bg-accent/5";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Financial Insights</h2>
        <Badge variant="outline" className="text-sm">
          {mockInsights.filter((i) => i.actionable).length} Actionable
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockInsights.map((insight) => (
          <Card
            key={insight.id}
            className={`card-shadow hover:shadow-financial transition-all duration-300 ${getInsightStyles(
              insight.type
            )}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getInsightIcon(insight.type)}
                  <CardTitle className="text-lg">{insight.title}</CardTitle>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <Badge variant={getPriorityColor(insight.priority)} className="text-xs">
                    {insight.priority.toUpperCase()}
                  </Badge>
                  {insight.actionable && (
                    <Badge variant="outline" className="text-xs">
                      Actionable
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {insight.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-foreground">
                    {insight.value}
                  </span>
                  {insight.change && (
                    <Badge
                      variant="outline"
                      className={
                        insight.change.startsWith("+")
                          ? "text-success border-success/20"
                          : insight.change.startsWith("-") &&
                            insight.type === "success"
                          ? "text-success border-success/20"
                          : "text-destructive border-destructive/20"
                      }
                    >
                      {insight.change}
                    </Badge>
                  )}
                </div>

                {insight.progress !== undefined && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{insight.progress}%</span>
                    </div>
                    <Progress value={insight.progress} className="h-2" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
