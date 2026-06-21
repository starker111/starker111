const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const projects = JSON.parse(fs.readFileSync(path.join(root, "data", "projects.json"), "utf8"));
const statusPath = path.join(root, "data", "project-status.json");
const statuses = fs.existsSync(statusPath)
  ? JSON.parse(fs.readFileSync(statusPath, "utf8")).projects || {}
  : {};

const esc = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[character]);

const tags = (project) => project.skills
  .map((skill) => `<code>${esc(skill)}</code>`)
  .join(" · ");

function shippedCard(project) {
  const linkState = statuses[project.id]?.status;
  const label = linkState === "online" ? "● LIVE" : linkState === "offline" ? "● STATUS ISSUE" : "● DEPLOYED";
  const source = project.repo
    ? ` <a href="${project.repo}"><img src="https://img.shields.io/badge/source-111114?style=flat-square&amp;logo=github&amp;logoColor=white" alt="Source repository" /></a>`
    : "";
  return `<td width="50%" valign="top">
<h3>${esc(project.title)}</h3>
<p><code>${esc(project.label)}</code> &nbsp; <strong>${label}</strong></p>
<p>${esc(project.description)}</p>
<p>${tags(project)}</p>
<p><a href="${project.live}"><img src="https://img.shields.io/badge/open_live_system-FF6B35?style=flat-square&amp;logo=vercel&amp;logoColor=white" alt="Open live system" /></a>${source}</p>
</td>`;
}

function buildingCard(project) {
  return `<td width="50%" valign="top">
<h4>${esc(project.title)}</h4>
<p><code>IN DEVELOPMENT</code></p>
<p>${esc(project.description)}</p>
<p>${tags(project)}</p>
</td>`;
}

function rows(items, renderer) {
  const output = [];
  for (let index = 0; index < items.length; index += 2) {
    output.push(`<tr>
${renderer(items[index])}
${items[index + 1] ? renderer(items[index + 1]) : '<td width="50%"></td>'}
</tr>`);
  }
  return output.join("\n");
}

function renderProjectSections() {
  const shipped = projects.filter((project) => project.tier === "shipped");
  const building = projects.filter((project) => project.tier === "building");
  return `### Shipped & live

<table>
${rows(shipped, shippedCard)}
</table>

### In development

These workflows are actively being built and do not have public deployment URLs yet.

<table>
${rows(building, buildingCard)}
</table>`;
}

if (require.main === module) {
  const output = path.join(root, "data", "project-cards.generated.md");
  fs.writeFileSync(output, `${renderProjectSections()}\n`);
  console.log(`Generated ${path.relative(root, output)}`);
}

module.exports = { renderProjectSections };
