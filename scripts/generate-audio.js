import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const pronouns = [
  { text: "ich", filename: "ich.mp3" },
  { text: "du", filename: "du.mp3" },
  { text: "er", filename: "er.mp3" },
  { text: "sie", filename: "sie.mp3" },
  { text: "es", filename: "es.mp3" },
  { text: "wir", filename: "wir.mp3" },
  { text: "ihr", filename: "ihr.mp3" },
  { text: "sie", filename: "sie_plural.mp3" },
  { text: "Sie", filename: "Sie_formal.mp3" }
];

async function generatePronunciations() {
  const audioDir = path.join(__dirname, '../client/public/audio');
  
  // Ensure audio directory exists
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  for (const pronoun of pronouns) {
    try {
      console.log(`Generating pronunciation for ${pronoun.text}...`);
      
      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: pronoun.text,
        language: "de"
      });

      const buffer = Buffer.from(await mp3.arrayBuffer());
      fs.writeFileSync(path.join(audioDir, pronoun.filename), buffer);
      
      console.log(`Successfully generated ${pronoun.filename}`);
    } catch (error) {
      console.error(`Error generating pronunciation for ${pronoun.text}:`, error);
    }
  }
}

generatePronunciations().catch(console.error);
