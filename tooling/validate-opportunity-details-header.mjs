import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const componentPath = path.join(
  process.cwd(),
  "app/opportunities/_components/opportunity-details/index.tsx",
);
const source = await readFile(componentPath, "utf8");

const dialogHeaderContract = /\{isDialog \? \(\s*<header[\s\S]*?<Wordmark[\s\S]*?data-detail-close=""[\s\S]*?<\/header>\s*\) : null\}/u;

assert.match(
  source,
  dialogHeaderContract,
  "OpportunityDetails must render its compact internal header only in dialog mode",
);
assert.doesNotMatch(source, /\bArrowLeft\b/u);
assert.doesNotMatch(source, /returnHref\s*=/u);

console.log("Opportunity details header mode contract is valid.");
