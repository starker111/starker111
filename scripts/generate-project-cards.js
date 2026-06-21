const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const projects = JSON.parse(fs.readFileSync(path.join(root, "data", "projects.json"), "utf8"));
const outputDir = path.join(root, "assets", "project-cards");

const escapeXml = (value) =>
  String(value).replace(/[<>&'"]/g, (char) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;"
  })[char]);

function wrap(text, max = 62) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    if (`${line} ${word}`.trim().length > max) {
      lines.push(line);
      line = word;
    } else {
      line = `${line} ${word}`.trim();
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function card(project, index) {
  const lines = wrap(project.description);
  const tags = project.skills.slice(0, 3);
  let x = 28;
  const tagMarkup = tags.map((tag) => {
    const width = Math.max(70, tag.length * 7 + 24);
    const markup = `<rect x="${x}" y="250" width="${width}" height="28" rx="8" fill="#172033" stroke="#334155"/>
      <text x="${x + 12}" y="268" fill="#CBD5E1" font-family="Segoe UI, Arial" font-size="11" font-weight="600">${escapeXml(tag)}</text>`;
    x += width + 9;
    return markup;
  }).join("\n");

  return `<svg width="570" height="320" viewBox="0 0 570 320" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(project.title)}</title>
  <desc id="desc">${escapeXml(project.description)}</desc>
  <defs>
    <linearGradient id="bg${index}" x1="0" y1="0" x2="570" y2="320">
      <stop stop-color="#111827"/><stop offset="1" stop-color="#090F1A"/>
    </linearGradient>
    <linearGradient id="accent${index}" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="${project.accent}"/><stop offset="1" stop-color="#FF6B00"/>
    </linearGradient>
  </defs>
  <rect x=".75" y=".75" width="568.5" height="318.5" rx="20" fill="url(#bg${index})" stroke="#334155" stroke-width="1.5"/>
  <rect x="0" y="0" width="7" height="320" rx="3.5" fill="${project.accent}"/>
  <g font-family="Segoe UI, Inter, Arial, sans-serif">
    <text x="28" y="42" fill="${project.accent}" font-size="11" font-weight="800" letter-spacing="1.6">${escapeXml(project.eyebrow)}</text>
    <rect x="455" y="22" width="87" height="28" rx="14" fill="${project.accent}" fill-opacity=".12" stroke="${project.accent}" stroke-opacity=".55"/>
    <circle cx="472" cy="36" r="4" fill="${project.status === "LIVE" ? "#22C55E" : "#94A3B8"}"/>
    <text x="484" y="40" fill="#E2E8F0" font-size="10" font-weight="800">${escapeXml(project.status)}</text>
    <text x="28" y="91" fill="#F8FAFC" font-size="25" font-weight="800">${escapeXml(project.title)}</text>
    ${lines.map((line, lineIndex) => `<text x="28" y="${132 + lineIndex * 24}" fill="#94A3B8" font-size="14">${escapeXml(line)}</text>`).join("\n")}
    ${tagMarkup}
    <text x="446" y="298" fill="${project.accent}" font-size="12" font-weight="800">OPEN PROJECT  ↗</text>
  </g>
</svg>`;
}

fs.mkdirSync(outputDir, { recursive: true });
projects.forEach((project, index) => {
  fs.writeFileSync(path.join(outputDir, `${project.id}.svg`), card(project, index));
});
console.log(`Generated ${projects.length} project cards in ${path.relative(root, outputDir)}`);
