// One-shot SVG → PNG for icron / favicon / apple-touch / og-image.
// Run via: node scripts/gen-icons.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "public");
const PRIMARY = "#6366f1";
const PRIMARY_HOVER = "#4f46e5";
const BG_DARK = "#0c0f18";
const BG_LIGHT = "#fafafa";

// Solid-bg icon: gradient rounded square with stylized "MD" mark.
function iconSvg(size, opts = {}) {
  const { dark = true, mark = "MD" } = opts;
  const fg = "#ffffff";
  const bg1 = dark ? "#818cf8" : "#6366f1";
  const bg2 = dark ? "#4f46e5" : "#4338ca";
  const fontPx = Math.round(size * 0.42);
  const r = Math.round(size * 0.22);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bg1}"/>
      <stop offset="1" stop-color="${bg2}"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${r}" fill="url(#g)"/>
  <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle"
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        font-weight="800" font-size="${fontPx}" fill="${fg}" letter-spacing="-2">${mark}</text>
</svg>`;
}

function maskableSvg(size) {
  // Maskable icons need a ~40% safe zone in the center.
  const inner = Math.round(size * 0.6);
  const offset = Math.round((size - inner) / 2);
  const fontPx = Math.round(inner * 0.45);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${PRIMARY_HOVER}"/>
  <rect x="${offset}" y="${offset}" width="${inner}" height="${inner}" rx="${Math.round(inner * 0.18)}" fill="${PRIMARY}"/>
  <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle"
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        font-weight="800" font-size="${fontPx}" fill="#ffffff" letter-spacing="-2">MD</text>
</svg>`;
}

function appleTouchSvg(size) {
  // iOS adds its own rounding — solid square is fine.
  return iconSvg(size, { dark: false });
}

function ogImageSvg(w, h) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0c0f18"/>
      <stop offset="1" stop-color="#1e1b4b"/>
    </linearGradient>
    <linearGradient id="acc" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#818cf8"/>
      <stop offset="1" stop-color="#6366f1"/>
    </linearGradient>
    <radialGradient id="halo" cx="0.2" cy="0.2" r="0.6">
      <stop offset="0" stop-color="#6366f1" stop-opacity="0.4"/>
      <stop offset="1" stop-color="#6366f1" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#halo)"/>
  <g transform="translate(${w / 2 - 60}, ${h / 2 - 220})">
    <rect width="120" height="120" rx="26" fill="url(#acc)"/>
    <text x="50%" y="58%" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="56" fill="#ffffff" letter-spacing="-2">MD</text>
  </g>
  <text x="50%" y="${h / 2 + 50}" text-anchor="middle"
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        font-weight="800" font-size="76" fill="#f1f5f9" letter-spacing="-2">Markdown Converter</text>
  <text x="50%" y="${h / 2 + 110}" text-anchor="middle"
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        font-weight="500" font-size="32" fill="#a5b4fc">Word · PDF · HTML · TXT — in your browser</text>
  <text x="50%" y="${h - 60}" text-anchor="middle"
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        font-weight="500" font-size="22" fill="#64748b">Private · Free · Installable PWA · markdown.trugraph.io</text>
</svg>`;
}

async function writeSvgAsPng(svg, filePath) {
  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9 })
    .toFile(filePath);
  console.log(`✓ ${filePath}`);
}

async function main() {
  await mkdir(ROOT, { recursive: true });

  await writeSvgAsPng(iconSvg(192), path.join(ROOT, "icon-192.png"));
  await writeSvgAsPng(iconSvg(512), path.join(ROOT, "icon-512.png"));
  await writeSvgAsPng(maskableSvg(512), path.join(ROOT, "icon-maskable.png"));
  await writeSvgAsPng(appleTouchSvg(180), path.join(ROOT, "apple-touch-icon.png"));
  await writeSvgAsPng(iconSvg(32), path.join(ROOT, "favicon.png"));
  await writeSvgAsPng(ogImageSvg(1200, 630), path.join(ROOT, "og-image.png"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});