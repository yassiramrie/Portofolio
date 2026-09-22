import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectNames = [
  "vpc",
  "auto-scaling",
  "s3",
  "rds",
  "serverless",
  "docker",
  "cicd",
  "monitoring",
];
const publicDir = path.resolve("public");
const outputDir = path.join(publicDir, "images", "projects");
const thumbnailDir = path.join(outputDir, "thumbs");

await fs.mkdir(thumbnailDir, { recursive: true });

for (const name of projectNames) {
  const source = path.join(publicDir, `${name}.png`);
  await sharp(source)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(outputDir, `${name}.webp`));
  await sharp(source)
    .resize({ width: 480, withoutEnlargement: true })
    .webp({ quality: 68 })
    .toFile(path.join(thumbnailDir, `${name}.webp`));
}

console.log(`Optimized ${projectNames.length} project images.`);
