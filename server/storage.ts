import { exercises, scores, type Exercise, type InsertExercise, type Score, type InsertScore } from "@shared/schema";

const INITIAL_EXERCISES: InsertExercise[] = [
  {
    germanPronoun: "ich",
    englishPronoun: "ben",
    audioUrl: "/audio/ich.mp3",
    type: "nominative"
  },
  {
    germanPronoun: "du",
    englishPronoun: "sen",
    audioUrl: "/audio/du.mp3",
    type: "nominative"
  },
  {
    germanPronoun: "er",
    englishPronoun: "o (erkek)",
    audioUrl: "/audio/er.mp3",
    type: "nominative"
  },
  {
    germanPronoun: "sie",
    englishPronoun: "o (kadın)",
    audioUrl: "/audio/sie.mp3",
    type: "nominative"
  },
  {
    germanPronoun: "es",
    englishPronoun: "o (cansız/nötr)",
    audioUrl: "/audio/es.mp3",
    type: "nominative"
  },
  {
    germanPronoun: "wir",
    englishPronoun: "biz",
    audioUrl: "/audio/wir.mp3",
    type: "nominative"
  },
  {
    germanPronoun: "ihr",
    englishPronoun: "siz",
    audioUrl: "/audio/ihr.mp3",
    type: "nominative"
  },
  {
    germanPronoun: "sie",
    englishPronoun: "onlar",
    audioUrl: "/audio/sie_plural.mp3",
    type: "nominative"
  },
  {
    germanPronoun: "Sie",
    englishPronoun: "siz (nezaket)",
    audioUrl: "/audio/Sie_formal.mp3",
    type: "nominative"
  }
];

export interface IStorage {
  getExercises(): Promise<Exercise[]>;
  getExercise(id: number): Promise<Exercise | undefined>;
  saveScore(score: InsertScore): Promise<Score>;
  getScores(): Promise<Score[]>;
}

export class MemStorage implements IStorage {
  private exercises: Map<number, Exercise>;
  private scores: Map<number, Score>;
  private currentExerciseId: number;
  private currentScoreId: number;

  constructor() {
    this.exercises = new Map();
    this.scores = new Map();
    this.currentExerciseId = 1;
    this.currentScoreId = 1;

    // Initialize with sample exercises
    INITIAL_EXERCISES.forEach((exercise) => {
      const id = this.currentExerciseId++;
      this.exercises.set(id, { ...exercise, id });
    });
  }

  async getExercises(): Promise<Exercise[]> {
    return Array.from(this.exercises.values());
  }

  async getExercise(id: number): Promise<Exercise | undefined> {
    return this.exercises.get(id);
  }

  async saveScore(insertScore: InsertScore): Promise<Score> {
    const id = this.currentScoreId++;
    const score: Score = { ...insertScore, id };
    this.scores.set(id, score);
    return score;
  }

  async getScores(): Promise<Score[]> {
    return Array.from(this.scores.values());
  }
}

export const storage = new MemStorage();