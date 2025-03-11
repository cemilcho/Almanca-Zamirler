import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pronouns = [
  { text: "ich", frequency: 440 },   // A4
  { text: "du", frequency: 493.88 }, // B4
  { text: "er", frequency: 523.25 }, // C5
  { text: "sie", frequency: 587.33 }, // D5
  { text: "es", frequency: 659.25 }, // E5
  { text: "wir", frequency: 698.46 }, // F5
  { text: "ihr", frequency: 783.99 }, // G5
  { text: "sie_plural", frequency: 880 }, // A5
  { text: "Sie_formal", frequency: 987.77 } // B5
];

async function generateBasicAudio() {
  const audioDir = path.join(__dirname, '../client/public/audio');

  // Ses klasörünü oluştur
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  // Var olan ses dosyalarını temizle
  fs.readdirSync(audioDir).forEach(file => {
    if (file.endsWith('.mp3')) {
      fs.unlinkSync(path.join(audioDir, file));
    }
  });

  for (const pronoun of pronouns) {
    try {
      console.log(`${pronoun.text} için ses oluşturuluyor...`);

      // Her kelime için farklı frekansta bir ses oluştur
      const command = `ffmpeg -y -f lavfi -i "sine=frequency=${pronoun.frequency}:duration=1" "${path.join(audioDir, `${pronoun.text}.mp3`)}"`;

      execSync(command);
      console.log(`${pronoun.text}.mp3 başarıyla oluşturuldu`);
    } catch (error) {
      console.error(`${pronoun.text} için ses oluşturulurken hata:`, error);
    }
  }
}

generateBasicAudio().catch(console.error);