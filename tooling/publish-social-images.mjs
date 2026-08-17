import { copyFile, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const OUTPUT_DIRECTORY = path.join(process.cwd(), "out");
const SOCIAL_IMAGE_NAMES = new Set(["opengraph-image", "twitter-image"]);
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

async function publishSocialImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  let publishedCount = 0;

  for (const entry of entries) {
    const sourcePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      publishedCount += await publishSocialImages(sourcePath);
      continue;
    }

    if (!entry.isFile() || !SOCIAL_IMAGE_NAMES.has(entry.name)) continue;

    const signature = (await readFile(sourcePath)).subarray(0, PNG_SIGNATURE.length);
    if (!signature.equals(PNG_SIGNATURE)) {
      throw new Error(`Expected generated social image to be PNG: ${sourcePath}`);
    }

    await copyFile(sourcePath, `${sourcePath}.png`);
    publishedCount += 1;
  }

  return publishedCount;
}

const publishedCount = await publishSocialImages(OUTPUT_DIRECTORY);

if (publishedCount === 0) {
  throw new Error("No generated social images were found in the static export");
}

console.log(`Published ${publishedCount} social image PNG files.`);
