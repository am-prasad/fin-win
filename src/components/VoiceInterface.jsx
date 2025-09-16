import { useState, useRef, useCallback } from "react";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function VoiceInterface({ onTranscriptionReceived, onVoiceCommandProcessed, className = "" }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const mediaRecorderRef = useRef(null);
  const { toast } = useToast();

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 44100 } 
      });
      
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
      const audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        await processAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);

      toast({
        title: "🎙️ Listening...",
        description: "Speak your financial query now",
      });
    } catch (error) {
      toast({
        title: "Microphone Error",
        description: "Unable to access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  const processAudio = async (audioBlob) => {
    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockTranscriptions = [
        "What's my current net worth?",
        "Show me my investment portfolio performance",
        "How much should I save for retirement?",
        "Analyze my spending patterns this month",
        "What's the best SIP amount for my goals?"
      ];

      const transcription = mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
      onTranscriptionReceived?.(transcription);

      const mockResponses = [
        "Your current net worth is ₹12.5 lakhs, up 8% from last month.",
        "Your portfolio is performing well with 12% returns this year.",
        "Based on your age and goals, I recommend saving ₹25,000 monthly.",
        "You've spent ₹45,000 this month, mostly on essentials and investments.",
        "For your goals, a ₹15,000 monthly SIP would be optimal."
      ];

      const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];

      if (audioEnabled) {
        toast({
          title: "🔊 Speaking Response",
          description: response,
        });
      }

      onVoiceCommandProcessed?.(transcription, response);
    } catch (error) {
      toast({
        title: "Processing Error",
        description: "Failed to process your voice command",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className={`fixed bottom-6 right-6 p-4 bg-card/95 backdrop-blur-sm border-border/50 shadow-voice ${className}`}>
      <div className="flex items-center space-x-3">
        <Button
          variant={isRecording ? "destructive" : "default"}
          size="lg"
          className={`
            relative w-14 h-14 rounded-full
            ${isRecording 
              ? "bg-voice-recording hover:bg-voice-recording/90 voice-recording" 
              : "bg-gradient-financial hover:bg-gradient-financial/90 shadow-financial"
            }
            ${isProcessing ? "animate-pulse" : ""}
          `}
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : isRecording ? (
            <MicOff className="w-6 h-6" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
          
          {isRecording && (
            <div className="absolute inset-0 rounded-full bg-voice-recording/20 voice-pulse" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setAudioEnabled(!audioEnabled)}
          className="w-10 h-10 rounded-full"
        >
          {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </Button>
      </div>

      {(isRecording || isProcessing) && (
        <div className="mt-3 text-center">
          <p className="text-xs text-muted-foreground">
            {isRecording ? "Listening..." : "Processing..."}
          </p>
        </div>
      )}
    </Card>
  );
}
