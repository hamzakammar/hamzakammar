// Make a per-person share link for the agent previews post.
// Usage: node scripts/ref-link.mts "Jane Doe"
// Codes map to names in refs.local.json, which is gitignored and never leaves this machine.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomInt } from "node:crypto";

const FILE = new URL("../refs.local.json", import.meta.url);
const POST = "https://www.hamzaammar.ca/context/agent-previews";
const ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";

const name = process.argv.slice(2).join(" ").trim();
if (!name) {
  console.error('Usage: node scripts/ref-link.mts "Name"');
  process.exit(1);
}

const refs: Record<string, string> = existsSync(FILE) ? JSON.parse(readFileSync(FILE, "utf8")) : {};
let code = Object.keys(refs).find((c) => refs[c] === name);
while (!code || (refs[code] && refs[code] !== name)) {
  code = Array.from({ length: 3 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
}
refs[code] = name;
writeFileSync(FILE, JSON.stringify(refs, null, 2) + "\n");

console.log(`${name}: ${POST}?r=${code}`);
console.log(`In Vercel Analytics, look for /context/agent-previews/r/${code}`);
