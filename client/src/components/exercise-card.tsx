import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AudioPlayer } from "./audio-player";
import type { Exercise } from "@shared/schema";

interface ExerciseCardProps {
  exercises: Exercise[];
  onComplete: (answers: { [key: number]: string }) => void;
}

export function ExerciseCard({ exercises, onComplete }: ExerciseCardProps) {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (id: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
    onComplete(answers);
  };

  const isAnswerCorrect = (exercise: Exercise, answer: string) => {
    // Tam eşleşme kontrolü yapıyoruz, büyük/küçük harf duyarlı
    return answer === exercise.germanPronoun;
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardContent className="space-y-4 pt-6">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="flex items-center space-x-4">
            <div className="w-32 font-medium">{exercise.englishPronoun}</div>
            <Input
              placeholder="Almanca karşılığını yazın..."
              value={answers[exercise.id] || ""}
              onChange={(e) => handleAnswerChange(exercise.id, e.target.value)}
              disabled={showResults}
              className="w-48"
            />
            <AudioPlayer text={exercise.germanPronoun} />
            {showResults && (
              <div className={`ml-2 ${isAnswerCorrect(exercise, answers[exercise.id] || '') ? 'text-green-600' : 'text-red-600'}`}>
                {isAnswerCorrect(exercise, answers[exercise.id] || '') 
                  ? "✓" 
                  : `✗ (${exercise.germanPronoun})`}
              </div>
            )}
          </div>
        ))}

        {!showResults && (
          <Button className="w-full mt-6" onClick={handleSubmit}>
            Cevapları Kontrol Et
          </Button>
        )}
      </CardContent>
    </Card>
  );
}