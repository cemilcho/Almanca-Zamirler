import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  germanPronoun: text("german_pronoun").notNull(),
  englishPronoun: text("english_pronoun").notNull(),
  audioUrl: text("audio_url").notNull(),
  type: text("type").notNull(), // e.g. "nominative", "accusative"
});

export const scores = pgTable("scores", {
  id: serial("id").primaryKey(),
  score: integer("score").notNull(),
  timestamp: text("timestamp").notNull(),
});

export const insertExerciseSchema = createInsertSchema(exercises).pick({
  germanPronoun: true,
  englishPronoun: true,
  audioUrl: true,
  type: true,
});

export const insertScoreSchema = createInsertSchema(scores).pick({
  score: true,
  timestamp: true,
});

export type Exercise = typeof exercises.$inferSelect;
export type InsertExercise = z.infer<typeof insertExerciseSchema>;
export type Score = typeof scores.$inferSelect;
export type InsertScore = z.infer<typeof insertScoreSchema>;
