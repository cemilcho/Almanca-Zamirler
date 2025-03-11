import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertScoreSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/exercises", async (_req, res) => {
    const exercises = await storage.getExercises();
    res.json(exercises);
  });

  app.get("/api/exercises/:id", async (req, res) => {
    const exercise = await storage.getExercise(parseInt(req.params.id));
    if (!exercise) {
      res.status(404).json({ message: "Exercise not found" });
      return;
    }
    res.json(exercise);
  });

  app.post("/api/scores", async (req, res) => {
    const result = insertScoreSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: "Invalid score data" });
      return;
    }
    const score = await storage.saveScore(result.data);
    res.json(score);
  });

  app.get("/api/scores", async (_req, res) => {
    const scores = await storage.getScores();
    res.json(scores);
  });

  const httpServer = createServer(app);
  return httpServer;
}
