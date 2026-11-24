// The Vacuum's Alibi — one-line entry for make.fun.
// The program's only job: put the alibi line into entry.txt
// inside the grader-supplied output directory, then prove
// the file on disk says exactly what we meant to say.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line, exactly as submitted. One line, 93 characters.
// Two beats: the excuse, then the twist — the cat is management.
const ALIBI =
  "I wasn't late — the cat sat on me for an hour, and I've learned not to argue with management.";

const MAX_LENGTH = 200;

// The grader mounts the repo read-only and hands us a writable
// output directory through the environment. We write ONLY there.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.txt");
writeFileSync(target, ALIBI, "utf8");

// Read it back and refuse to finish quietly if anything drifted.
const written = readFileSync(target, "utf8");
if (written !== ALIBI) {
  throw new Error("entry.txt does not match the alibi line");
}
if (written.length > MAX_LENGTH) {
  throw new Error(`entry is ${written.length} characters, over the ${MAX_LENGTH} limit`);
}
if (written.includes("\n") || written.includes("\r")) {
  throw new Error("entry must be a single line");
}

console.log(`Wrote ${written.length}-character alibi to ${target}`);
