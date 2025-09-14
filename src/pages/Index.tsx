import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { VoiceInterface } from "@/components/VoiceInterface";
import { FinancialDashboard } from "@/components/FinancialDashboard";
import { ChatInterface } from "@/components/ChatInterface";
import { InsightCards } from "@/components/InsightCards";
import { useState } from "react";

const Index = () => {
  const [voiceMessages, setVoiceMessages] = useState<Array<{ user: string; ai: string }>>([]);

  const handleVoiceCommand = (userText: string, aiResponse: string) => {
    setVoiceMessages(prev => [...prev, { user: userText, ai: aiResponse }]);
    
    // Send to chat interface if available
    if ((window as any).addVoiceMessage) {
      (window as any).addVoiceMessage(userText, aiResponse);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-gradient-subtle">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center px-6">
            <SidebarTrigger />
            <div className="flex-1 ml-6">
              <h1 className="text-2xl font-bold bg-gradient-financial bg-clip-text text-transparent">
                Financial Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Voice-powered AI financial insights and management
              </p>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 space-y-8 overflow-auto">
            {/* Dashboard Overview */}
            <FinancialDashboard />
            
            {/* Insights Section */}
            <InsightCards />
            
            {/* Chat Interface */}
            <div className="max-w-4xl mx-auto">
              <ChatInterface />
            </div>
          </main>
        </div>

        {/* Voice Interface - Floating */}
        <VoiceInterface 
          onVoiceCommandProcessed={handleVoiceCommand}
          onTranscriptionReceived={(text) => console.log("Voice input:", text)}
        />
      </div>
    </SidebarProvider>
  );
};

export default Index;
