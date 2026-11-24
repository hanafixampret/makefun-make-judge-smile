import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// A small good thing from today, for the house judge: the lift
// arrives before I call it, and the old man inside has been
// listening for my footsteps. Warmth, one concrete sound, and a
// turn at the end — no greeting-card phrasing.
const LINE =
  "This morning the lift stopped at my floor before I pressed the button, and the old man inside just grinned: 'I heard your footsteps coming.'";

function checkLine(line: string): void {
  const chars = [...line];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`line is ${chars.length} characters, gate wants 1-200`);
  }
  if (line.trim() !== line || line.trim().length === 0) {
    throw new Error("line must be non-blank with no surrounding whitespace");
  }
}

checkLine(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt does not hold exactly the line");
}
console.log(`wrote ${[...LINE].length} characters to ${outPath}`);
