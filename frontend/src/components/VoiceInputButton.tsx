import { Mic, Square, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { useToast } from '@/components/ui/use-toast';

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
}

export const VoiceInputButton = ({ onTranscript }: VoiceInputButtonProps) => {
  const { isRecording, isProcessing, startRecording, stopRecording } = useVoiceInput();
  const { toast } = useToast();

  const handleClick = async () => {
    if (isRecording) {
      try {
        const transcript = await stopRecording();
        if (transcript) {
          onTranscript(transcript);
          toast({
            title: 'Transcrição concluída',
            description: 'O áudio foi convertido em texto com sucesso',
          });
        }
      } catch (error) {
        console.error('Error stopping recording:', error);
      }
    } else {
      await startRecording();
    }
  };

  return (
    <Button
      type="button"
      size="icon"
      variant={isRecording ? "destructive" : "outline"}
      className={`shrink-0 ${isRecording ? 'animate-pulse' : ''}`}
      onClick={handleClick}
      disabled={isProcessing}
    >
      {isProcessing ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isRecording ? (
        <Square className="h-4 w-4" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  );
};
