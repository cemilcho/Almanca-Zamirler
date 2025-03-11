import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VolumeIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AudioPlayerProps {
  text: string; // Telaffuz edilecek Almanca kelime
}

export function AudioPlayer({ text }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const playAudio = () => {
    if (!window.speechSynthesis) {
      toast({
        variant: "destructive",
        title: "Ses oynatılamadı",
        description: "Tarayıcınız konuşma özelliğini desteklemiyor.",
      });
      return;
    }

    if (isPlaying) return;

    try {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE"; // Almanca dil seçeneği

      // "du" zamiri için özel hız ayarı
      utterance.rate = text.toLowerCase() === "du" ? 0.4 : 0.6;

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        toast({
          variant: "destructive",
          title: "Ses oynatılamadı",
          description: "Telaffuz sırasında bir hata oluştu.",
        });
      };

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      setIsPlaying(false);
      toast({
        variant: "destructive",
        title: "Ses oynatılamadı",
        description: "Telaffuz sırasında bir hata oluştu.",
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={playAudio}
      className={`h-8 w-8 ${isPlaying ? 'bg-primary/10' : ''}`}
      disabled={isPlaying}
    >
      <VolumeIcon className="h-4 w-4" />
    </Button>
  );
}