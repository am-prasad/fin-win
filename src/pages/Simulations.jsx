import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, TrendingUp, Target, PiggyBank } from "lucide-react";
import { useState } from "react";

const Simulations = () => {
  const [sipAmount, setSipAmount] = useState(15000);
  const [investmentYears, setInvestmentYears] = useState(20);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const calculateSIP = () => {
    const monthlyReturn = expectedReturn / 12 / 100;
    const totalMonths = investmentYears * 12;
    const futureValue =
      sipAmount *
      (((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn) *
        (1 + monthlyReturn));
    const totalInvestment = sipAmount * totalMonths;
    const totalReturns = futureValue - totalInvestment;

    return {
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      totalReturns: Math.round(totalReturns),
    };
  };

  const results = calculateSIP();

  return (
    <SidebarProvider>
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      <div className="min-h-screen w-full flex bg-gradient-subtle">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center px-6">
            <SidebarTrigger />
            <div className="flex-1 ml-6">
              <h1 className="text-2xl font-bold bg-gradient-financial bg-clip-text text-transparent">
                Financial Simulations
              </h1>
              <p className="text-sm text-muted-foreground">
                Model your financial scenarios and plan for the future
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 space-y-6 overflow-auto">
            {/* SIP Calculator */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="w-5 h-5 mr-2 text-primary" />
                    SIP Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sipAmount">Monthly SIP Amount (₹)</Label>
                    <Input
                      id="sipAmount"
                      type="number"
                      value={sipAmount}
                      onChange={(e) => setSipAmount(Number(e.target.value))}
                      className="text-lg font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="years">Investment Period (Years)</Label>
                    <Input
                      id="years"
                      type="number"
                      value={investmentYears}
                      onChange={(e) => setInvestmentYears(Number(e.target.value))}
                      className="text-lg font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="returns">Expected Annual Return (%)</Label>
                    <Input
                      id="returns"
                      type="number"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="text-lg font-medium"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="card-shadow bg-gradient-financial/5">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-success" />
                    Projection Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 rounded-lg bg-card/50 border">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Total Investment
                          </p>
                          <p className="text-lg font-bold text-primary">
                            ₹{(results.totalInvestment / 100000).toFixed(2)}L
                          </p>
                        </div>
                        <PiggyBank className="w-8 h-8 text-primary" />
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-card/50 border">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Total Returns
                          </p>
                          <p className="text-lg font-bold text-success">
                            ₹{(results.totalReturns / 100000).toFixed(2)}L
                          </p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-success" />
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-gradient-success/10 border border-success/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Future Value
                          </p>
                          <p className="text-2xl font-bold text-success">
                            ₹{(results.futureValue / 10000000).toFixed(2)}Cr
                          </p>
                        </div>
                        <Target className="w-10 h-10 text-success" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Scenarios */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Quick Scenarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-start space-y-2 hover:bg-gradient-financial/10"
                    onClick={() => {
                      setSipAmount(10000);
                      setInvestmentYears(25);
                      setExpectedReturn(12);
                    }}
                  >
                    <div className="font-semibold">Conservative</div>
                    <div className="text-sm text-muted-foreground">
                      ₹10K/month for 25 years
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-start space-y-2 hover:bg-gradient-financial/10"
                    onClick={() => {
                      setSipAmount(25000);
                      setInvestmentYears(20);
                      setExpectedReturn(14);
                    }}
                  >
                    <div className="font-semibold">Aggressive</div>
                    <div className="text-sm text-muted-foreground">
                      ₹25K/month for 20 years
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-start space-y-2 hover:bg-gradient-financial/10"
                    onClick={() => {
                      setSipAmount(50000);
                      setInvestmentYears(15);
                      setExpectedReturn(16);
                    }}
                  >
                    <div className="font-semibold">High Growth</div>
                    <div className="text-sm text-muted-foreground">
                      ₹50K/month for 15 years
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Simulations;
