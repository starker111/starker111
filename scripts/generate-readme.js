const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const projects = JSON.parse(fs.readFileSync(path.join(root, "data", "projects.json"), "utf8"));
const skills = JSON.parse(fs.readFileSync(path.join(root, "data", "skills.json"), "utf8"));

const profile = {
  username: "starker111",
  name: "Kovi Varun Jaswanth Sai",
  portfolio: "https://kovi-ai-automation-portfolio.vercel.app/",
  linkedin: "https://www.linkedin.com/in/kovi-varun-jaswanth-sai-588599302/",
  email: "sjaswanth486@gmail.com"
};

const encode = (value) => encodeURIComponent(value).replace(/%20/g, "+");
const badge = (label, color = "1F2937", logo = "") =>
  `![${label}](https://img.shields.io/badge/${encode(label)}-${color}?style=for-the-badge${logo ? `&logo=${encode(logo)}&logoColor=white` : ""})`;

const projectCell = (project) => {
  const usableLive = project.live && !project.live.includes("PLACEHOLDER");
  const destination = usableLive ? project.live : profile.portfolio;
  const liveButton = usableLive
    ? `<a href="${project.live}"><img src="https://img.shields.io/badge/LIVE_DEMO-FF7A18?style=for-the-badge&amp;logo=vercel&amp;logoColor=white" alt="Open live demo" /></a>`
    : `<img src="https://img.shields.io/badge/DEPLOYMENT_LINK-PENDING-64748B?style=for-the-badge" alt="Deployment link pending" />`;
  const repoButton = project.repo
    ? ` <a href="${project.repo}"><img src="https://img.shields.io/badge/SOURCE-111827?style=for-the-badge&amp;logo=github&amp;logoColor=white" alt="Open source repository" /></a>`
    : "";
  return `<a href="${destination}"><img src="./assets/project-cards/${project.id}.svg" width="100%" alt="${project.title} project card" /></a><br/>${liveButton}${repoButton}`;
};

const rows = [];
for (let index = 0; index < projects.length; index += 2) {
  rows.push(`<tr>
<td width="50%" valign="top">${projectCell(projects[index])}</td>
<td width="50%" valign="top">${projects[index + 1] ? projectCell(projects[index + 1]) : ""}</td>
</tr>`);
}

const skillBadges = {
  "AI + LLM Systems": skills.ai.map((item) => badge(item, "111827")).join(" "),
  "Automation + APIs": skills.automation.map((item) => badge(item, "172033")).join(" "),
  "Data + Analytics": skills.data.map((item) => badge(item, "1E293B")).join(" ")
};

const readme = `<div align="center">

<img src="./assets/hero.svg" width="100%" alt="${profile.name} — AI Automation Command Center" />

<br/>

<table>
<tr>
<td width="28%" align="center" valign="middle">
<img src="./assets/profile.png" width="180" alt="${profile.name}" style="border-radius:50%" />
</td>
<td width="72%" valign="middle">

## Building AI systems that move work forward.

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Inter&weight=700&size=22&duration=2800&pause=800&color=FF7A18&vCenter=true&width=650&lines=AI+Automation+Engineer;Agentic+AI+Builder;RAG+%26+LLM+App+Developer;Turning+workflows+into+intelligent+systems)](https://git.io/typing-svg)

I design practical AI products that can **reason over context, coordinate workflows, retrieve knowledge, and produce useful actions** — from multi-agent research to document intelligence and operations automation.

[![Portfolio](https://img.shields.io/badge/EXPLORE_PORTFOLIO-FF7A18?style=for-the-badge&logo=vercel&logoColor=white)](${profile.portfolio})
[![LinkedIn](https://img.shields.io/badge/CONNECT_ON_LINKEDIN-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](${profile.linkedin})
[![Email](https://img.shields.io/badge/START_A_CONVERSATION-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:${profile.email})
[![GitHub](https://img.shields.io/badge/FOLLOW_ON_GITHUB-111827?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${profile.username})

</td>
</tr>
</table>

</div>

<img src="./assets/divider.svg" width="100%" alt="" />

## Mission control

<table>
<tr>
<td width="58%" valign="top">

### About me

I am a B.Tech Artificial Intelligence and Data Science student focused on shipping **deployed, recruiter-ready AI products**. My work sits at the intersection of LLM applications, agentic systems, retrieval, workflow automation, and useful product engineering.

I care about the full path from an idea to a working system: structuring the problem, orchestrating models and tools, building the interface, deploying it, and making the output understandable.

</td>
<td width="42%" valign="top">

### Current positioning

\`\`\`yaml
role: AI Automation Engineer
focus: Agentic AI + RAG + LLM Apps
building: Production-minded AI workflows
delivery: Deployed demos and clear UX
mode: Learning fast, shipping faster
\`\`\`

</td>
</tr>
</table>

<br/>
<img src="./assets/ai-command-center.svg" width="100%" alt="AI automation system pipeline" />

## System architecture

\`\`\`mermaid
flowchart LR
    A["Human / Business Input"] --> B["Context & Data Layer"]
    B --> C["Retrieval / APIs / Tools"]
    C --> D{"Agent Orchestrator"}
    D --> E["Specialist Agents"]
    E --> F["Validation & Guardrails"]
    F --> G["Structured Output"]
    G --> H["Workflow Action"]
    H --> I["Logs, Analytics & Feedback"]
    I -. improves .-> B

    style D fill:#ff7a18,stroke:#ffb15c,color:#08111f
    style H fill:#172033,stroke:#ff7a18,color:#f8fafc
\`\`\`

<img src="./assets/divider.svg" width="100%" alt="" />

## Engineering toolkit

<div align="center">

[![Core technologies](https://skillicons.dev/icons?i=python,ts,js,nextjs,react,tailwind,supabase,postgres,mongodb,git,github,vercel&perline=12)](https://skillicons.dev)

</div>

| AI + LLM Systems | Automation + APIs | Data + Analytics |
|:---|:---|:---|
| ${skillBadges["AI + LLM Systems"]} | ${skillBadges["Automation + APIs"]} | ${skillBadges["Data + Analytics"]} |

<br/>
<img src="./assets/project-showcase.svg" width="100%" alt="Featured AI systems" />

<table>
${rows.join("\n")}
</table>

> **Product signal:** ${projects.filter((project) => project.status === "LIVE").length} deployed demos are live now. The two workflow projects marked **Deployment Link Pending** are real projects whose public URLs still need to be added — no invented demos or claims.

<img src="./assets/divider.svg" width="100%" alt="" />

## GitHub engineering telemetry

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats.vercel.app/api?username=${profile.username}&show_icons=true&hide_border=true&bg_color=0d1117&title_color=ff7a18&icon_color=ff7a18&text_color=c9d1d9&rank_icon=github" />
  <img width="49%" src="https://github-readme-stats.vercel.app/api?username=${profile.username}&show_icons=true&hide_border=true&bg_color=ffffff&title_color=e85d04&icon_color=e85d04&text_color=1f2937&rank_icon=github" alt="GitHub stats" />
</picture>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://streak-stats.demolab.com?user=${profile.username}&hide_border=true&background=0D1117&ring=FF7A18&fire=FF7A18&currStreakLabel=FF7A18&sideLabels=C9D1D9&dates=8B949E&currStreakNum=F8FAFC&sideNums=F8FAFC" />
  <img width="49%" src="https://streak-stats.demolab.com?user=${profile.username}&hide_border=true&background=FFFFFF&ring=E85D04&fire=E85D04&currStreakLabel=E85D04&sideLabels=374151&dates=6B7280&currStreakNum=111827&sideNums=111827" alt="GitHub streak" />
</picture>

<br/>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.username}&layout=compact&hide_border=true&bg_color=0d1117&title_color=ff7a18&text_color=c9d1d9&langs_count=8" />
  <img width="42%" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.username}&layout=compact&hide_border=true&bg_color=ffffff&title_color=e85d04&text_color=1f2937&langs_count=8" alt="Top languages" />
</picture>

<br/><br/>

<img src="./assets/github-metrics.svg" width="100%" alt="Detailed GitHub metrics" />

<br/>

![Contribution snake](https://raw.githubusercontent.com/${profile.username}/${profile.username}/output/github-contribution-grid-snake-dark.svg#gh-dark-mode-only)
![Contribution snake](https://raw.githubusercontent.com/${profile.username}/${profile.username}/output/github-contribution-grid-snake.svg#gh-light-mode-only)

</div>

<img src="./assets/divider.svg" width="100%" alt="" />

<table>
<tr>
<td width="50%" valign="top">

## Learning direction

- Evaluating and observing multi-agent systems
- Production RAG: retrieval quality, reranking, and citations
- Reliable tool use and structured LLM outputs
- Human-in-the-loop workflow design
- AI product deployment and operational feedback

</td>
<td width="50%" valign="top">

## Building next

- Reusable agent orchestration patterns
- More measurable automation case studies
- Workflow dashboards with audit trails
- AI systems that connect reasoning to real APIs
- Public technical breakdowns of shipped projects

</td>
</tr>
</table>

## Let's build something useful

I am open to **AI engineering internships, automation projects, applied LLM work, and conversations with teams building practical AI products**.

<div align="center">

[![Portfolio](https://img.shields.io/badge/PORTFOLIO-FF7A18?style=for-the-badge&logo=vercel&logoColor=white)](${profile.portfolio})
[![LinkedIn](https://img.shields.io/badge/LINKEDIN-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](${profile.linkedin})
[![Email](https://img.shields.io/badge/EMAIL-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:${profile.email})

<br/><br/>
<img src="./assets/footer.svg" width="100%" alt="Designed and engineered by ${profile.name}" />

<sub>Designed as an AI Automation Command Center · Data-driven and refreshed with GitHub Actions</sub>

</div>
`;

fs.writeFileSync(path.join(root, "README.md"), readme);
console.log("Generated README.md");
