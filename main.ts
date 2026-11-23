import * as fs from "node:fs";
import * as path from "node:path";

// One line for the house judge: a small good thing from today, told
// with a concrete detail and a turn at the end. The night guard
// remembers everything about the narrator — name, floor, coffee
// without sugar — and then, unasked, hands over a cup at 3 a.m.
// Warmth first, surprise last, no greeting-card phrasing.
const ENTRY =
  "The night guard remembered my name, my floor, and that I take my coffee without sugar \u2014 then handed me a cup at 3 a.m. without me asking.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

const length = [...ENTRY].length;
const hasWords = ENTRY.trim().length > 0;
if (length < MIN_CHARS || length > MAX_CHARS || !hasWords) {
  throw new Error(
    `entry is ${length} characters, but the gate wants ${MIN_CHARS}-${MAX_CHARS} non-blank characters`,
  );
}

const destination = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(destination, { recursive: true });
const entryPath = path.join(destination, "entry.txt");
fs.writeFileSync(entryPath, ENTRY, "utf8");

// Read it back: the file the judge sees must be exactly this line.
const written = fs.readFileSync(entryPath, "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt round-trip mismatch");
}
