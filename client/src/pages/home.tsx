import { useQuery } from "@tanstack/react-query";
import { ExerciseCard } from "@/components/exercise-card";
import { ScoreDisplay } from "@/components/score-display";
import { apiRequest } from "@/lib/queryClient";
import type { Exercise } from "@shared/schema";

export default function Home() {
  const { data: exercises, isLoading } = useQuery<Exercise[]>({
    queryKey: ["/api/exercises"],
  });

  const handleComplete = async (answers: { [key: number]: string }) => {
    const correctAnswers = exercises?.reduce((count, exercise) => {
      return count + (answers[exercise.id] === exercise.germanPronoun ? 1 : 0);
    }, 0) || 0;

    await apiRequest("POST", "/api/scores", {
      score: correctAnswers,
      timestamp: new Date().toISOString(),
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!exercises || exercises.length === 0) {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-red-600">Alıştırmalar bulunamadı</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Almanca Kişi Zamirleri
          </h1>
          <h2 className="text-xl text-center text-muted-foreground">
            Yalın Hal - Nominativ
          </h2>
          <hr className="border-t border-border w-32 mx-auto" />
        </div>
        <ExerciseCard exercises={exercises} onComplete={handleComplete} />
      </div>
    </div>
  );
}