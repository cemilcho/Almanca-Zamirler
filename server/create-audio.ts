import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

async function createPronounAudio() {
  const audioDir = path.join(process.cwd(), 'client', 'public', 'audio');
  
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  for (const pronoun of pronouns) {
    try {
      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: pronoun.text,
      });

      const buffer = Buffer.from(await mp3.arrayBuffer());
      fs.writeFileSync(path.join(audioDir, pronoun.filename), buffer);
      console.log(`Created audio for ${pronoun.text}`);
    } catch (error) {
      console.error(`Error creating audio for ${pronoun.text}:`, error);
    }
  }
}

createPronounAudio().catch(console.error);
