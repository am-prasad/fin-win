import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, TrendingUp, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  insights?: FinancialInsight[];
  isVoice?: boolean;
}

interface FinancialInsight {
  type: "positive" | "warning" | "neutral";
  title: string;
  description: string;
  value?: string;
}

interface ChatInterfaceProps {
  className?: string;
  onSendMessage?: (message: string) => void;
}

export function ChatInterface({ className = "", onSendMessage }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hello! I'm your AI Financial Assistant. I can help you analyze your finances, plan investments, and answer any financial questions. What would you like to know?",
      timestamp: new Date(),
      insights: [
        {
          type: "positive",
          title: "Strong Financial Health",
          description: "Your net worth has grown 12% this month",
          value: "₹8.25L"
        }
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Mock AI responses with financial insights
  const generateAIResponse = (userMessage: string): { content: string; insights?: FinancialInsight[] } => {
    const responses = [
      {
        content: "Based on your current portfolio, you're well-diversified with 38% in equity funds and 23% in debt funds. Your SIP performance shows consistent 11% returns.",
        insights: [
          {
            type: "positive" as const,
            title: "Portfolio Performance",
            description: "Above average returns this year",
            value: "+11% YTD"
          },
          {
            type: "neutral" as const,
            title: "Diversification Score",
            description: "Good mix across asset classes",
            value: "8.5/10"
          }
        ]
      },
      {
        content: "Your emergency fund currently covers 4.2 months of expenses. Financial experts recommend 6-12 months. Consider increasing your liquid savings by ₹50,000.",
        insights: [
          {
            type: "warning" as const,
            title: "Emergency Fund",
            description: "Below recommended 6-month threshold",
            value: "4.2 months"
          }
        ]
      },
      {
        content: "Great question! Your retirement planning is on track. With your current SIP of ₹15,000/month, you're projected to accumulate ₹2.8 crores by age 60.",
        insights: [
          {
            type: "positive" as const,
            title: "Retirement Corpus",
            description: "On track to meet your goals",
            value: "₹2.8Cr"
          },
          {
            type: "neutral" as const,
            title: "Monthly SIP",
            description: "Consider increasing by 10% annually",
            value: "₹15,000"
          }
        ]
      }
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const addVoiceMessage = (userText: string, aiResponse: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: userText,
      timestamp: new Date(),
      isVoice: true,
    };

    const aiResponseData = generateAIResponse(userText);
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "ai",
      content: aiResponse,
      timestamp: new Date(),
      insights: aiResponseData.insights,
      isVoice: true,
    };

    setMessages(prev => [...prev, userMessage, aiMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsProcessing(true);
    onSendMessage?.(inputMessage);

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponseData = generateAIResponse(inputMessage);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponseData.content,
        timestamp: new Date(),
        insights: aiResponseData.insights,
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Expose function to parent components
  useEffect(() => {
    (window as any).addVoiceMessage = addVoiceMessage;
    return () => {
      delete (window as any).addVoiceMessage;
    };
  }, []);

  const getInsightIcon = (type: FinancialInsight["type"]) => {
    switch (type) {
      case "positive":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-warning" />;
      default:
        return <TrendingUp className="w-4 h-4 text-primary" />;
    }
  };

  const getInsightStyles = (type: FinancialInsight["type"]) => {
    switch (type) {
      case "positive":
        return "border-success/20 bg-success/5";
      case "warning":
        return "border-warning/20 bg-warning/5";
      default:
        return "border-primary/20 bg-primary/5";
    }
  };

  return (
    <Card className={`flex flex-col h-[600px] ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Bot className="w-5 h-5 mr-2 text-primary" />
          AI Financial Assistant
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                  <div className="flex items-center mb-2">
                    {message.type === "ai" ? (
                      <Bot className="w-4 h-4 mr-2 text-primary" />
                    ) : (
                      <User className="w-4 h-4 mr-2 text-foreground" />
                    )}
                    <span className="text-sm text-muted-foreground">
                      {message.type === "ai" ? "AI Assistant" : "You"}
                    </span>
                    {message.isVoice && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Voice
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground ml-auto">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <div
                    className={`p-4 rounded-lg ${
                      message.type === "user"
                        ? "bg-gradient-financial text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>

                  {/* Financial Insights */}
                  {message.insights && message.insights.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.insights.map((insight, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border ${getInsightStyles(insight.type)}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-2">
                              {getInsightIcon(insight.type)}
                              <div>
                                <h4 className="text-sm font-medium">{insight.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {insight.description}
                                </p>
                              </div>
                            </div>
                            {insight.value && (
                              <Badge variant="outline" className="text-xs">
                                {insight.value}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isProcessing && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2 p-4 bg-muted rounded-lg">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">AI is thinking...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about your finances, investments, or financial goals..."
              onKeyPress={handleKeyPress}
              disabled={isProcessing}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isProcessing}
              className="bg-gradient-financial hover:bg-gradient-financial/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}