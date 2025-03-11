import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ScoreDisplayProps {
  score: number;
  total: number;
}

export function ScoreDisplay({ score, total }: ScoreDisplayProps) {
  const percentage = Math.round((score / total) * 100);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center">Your Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-center text-primary">
          {score}/{total}
        </div>
        <div className="text-muted-foreground text-center mt-2">
          {percentage}% Correct
        </div>
      </CardContent>
    </Card>
  );
}
