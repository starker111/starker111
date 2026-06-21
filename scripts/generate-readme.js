const fs = require("node:fs");
const path = require("node:path");
const { renderProjectSections } = require("./generate-project-cards");

const root = path.resolve(__dirname, "..");
const skills = JSON.parse(fs.readFileSync(path.join(root, "data", "skills.json"), "utf8"));
const projects = JSON.parse(fs.readFileSync(path.join(root, "data", "projects.json"), "utf8"));

const profile = {
  username: "starker111",
  name: "Kovi Varun Jaswanth Sai",
  portfolio: "https://kovi-ai-automation-portfolio.vercel.app/",
  linkedin: "https://www.linkedin.com/in/kovi-varun-jaswanth-sai-588599302/",
  email: "sjaswanth486@gmail.com"
};

const badge = (label) =>
  `![${label}](https://img.shields.io/badge/${encodeURIComponent(label).replace(/%20/g, "_")}-F0F0EE?style=flat-square&labelColor=F0F0EE&color=F0F0EE)`;
const skillRow = (items) => items.map(badge).join(" ");
const shippedCount = projects.filter((project) => project.tier === "shipped").length;

const readme = `<div align="center">

<img src="./assets/hero.svg" width="100%" alt="${profile.name} — AI Automation Engineer" />

<br/>

<table>
<tr>
<td width="25%" align="center" valign="middle">
<img src="./assets/profile.png" width="170" alt="${profile.name}" style="border-radius:50%" />
</td>
<td width="75%" valign="middle">

## Practical AI systems, designed to ship.

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Inter&weight=650&size=21&duration=3000&pause=900&color=FF6B35&vCenter=true&width=620&lines=AI+Automation+Engineer;Agentic+AI+%7C+RAG+%7C+LLM+Applications;Building+deployed+AI+products)](https://git.io/typing-svg)

I build AI products that connect models with context, tools, and real workflows. My current work spans multi-agent research, document intelligence, operational automation, and applied LLM interfaces.

</td>
</tr>
</table>

<table>
<tr>
<td align="center"><a href="${profile.portfolio}"><img src="https://img.shields.io/badge/Portfolio-FF6B35?style=flat-square&amp;logo=vercel&amp;logoColor=white" alt="Portfolio" /></a></td>
<td align="center"><a href="${profile.linkedin}"><img src="https://img.shields.io/badge/LinkedIn-FF6B35?style=flat-square&amp;logo=linkedin&amp;logoColor=white" alt="LinkedIn" /></a></td>
<td align="center"><a href="mailto:${profile.email}"><img src="https://img.shields.io/badge/Email-FF6B35?style=flat-square&amp;logo=gmail&amp;logoColor=white" alt="Email" /></a></td>
<td align="center"><a href="https://github.com/${profile.username}"><img src="https://img.shields.io/badge/GitHub-FF6B35?style=flat-square&amp;logo=github&amp;logoColor=white" alt="GitHub" /></a></td>
</tr>
</table>

</div>

## About me

I am a B.Tech Artificial Intelligence and Data Science student focused on building practical, deployed AI systems. I enjoy the engineering between a promising model and a product someone can actually use.

My work covers problem framing, retrieval and agent orchestration, workflow integration, interface development, deployment, and clear output design.

### Current positioning

\`\`\`text
ROLE:     AI Automation Engineer
FOCUS:    Agentic AI · RAG · LLM applications
BUILDING: Reliable workflows connected to real tools
MODE:     Learn, measure, ship
\`\`\`

## System pipeline

\`\`\`mermaid
flowchart LR
    A["Ingest"] --> B["Understand"] --> C["Reason"]
    C --> D["Orchestrate"] --> E["Deliver"] --> F["Measure"]
    F -. feedback .-> B
    style C fill:#FFF0EA,stroke:#FF6B35,color:#111114
    style D fill:#FFF0EA,stroke:#FF6B35,color:#111114
\`\`\`

<details>
<summary>Static pipeline fallback</summary>
<br/>
<img src="./assets/pipeline.svg" width="100%" alt="AI system pipeline: ingest, understand, reason, orchestrate, deliver, measure" />
</details>

## Tech stack

<div align="center">

[![Core technologies](https://skillicons.dev/icons?i=python,ts,js,nextjs,react,tailwind,supabase,postgres,mongodb,git,github,vercel&perline=12)](https://skillicons.dev)

</div>

**AI + LLM**

${skillRow(skills.ai)}

**Automation + APIs**

${skillRow(skills.automation)}

**Data + analytics**

${skillRow(skills.data)}

## Featured AI systems

${renderProjectSections()}

> ${shippedCount} systems are currently deployed. Projects without public URLs are deliberately labeled **In Development**.

## GitHub activity

Static fallback: [view repositories and contribution activity directly on GitHub](https://github.com/${profile.username}?tab=repositories).

<div align="center">

<img width="72%" src="https://github-readme-stats.vercel.app/api?username=${profile.username}&show_icons=true&hide_border=true&bg_color=FAFAF8&title_color=FF6B35&icon_color=FF6B35&text_color=111114&rank_icon=github" alt="GitHub profile statistics" />

<br/><br/>

<img width="72%" src="https://streak-stats.demolab.com?user=${profile.username}&hide_border=true&background=FAFAF8&ring=FF6B35&fire=FF6B35&currStreakLabel=FF6B35&sideLabels=6B7280&dates=6B7280&currStreakNum=111114&sideNums=111114" alt="GitHub contribution streak" />

<br/><br/>

<img width="58%" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.username}&layout=compact&hide_border=true&bg_color=FAFAF8&title_color=FF6B35&text_color=111114&langs_count=8" alt="Most-used GitHub languages" />

</div>

<details>
<summary><strong>Expand for extended metrics</strong></summary>
<br/>
If the generated image is unavailable, the core profile and project links above remain fully usable.
<br/><br/>
<img src="./assets/github-metrics.svg" width="100%" alt="Extended GitHub metrics" />
</details>

## Contribution trail

<div align="center">

![Contribution snake](https://raw.githubusercontent.com/${profile.username}/${profile.username}/output/github-contribution-grid-snake.svg)

</div>

Snake fallback: [open the native GitHub contribution graph](https://github.com/${profile.username}#js-contribution-activity).

<table>
<tr>
<td width="50%" valign="top">

### Learning direction

- Evaluating multi-agent reliability
- Retrieval quality, reranking, and citations
- Structured outputs and dependable tool use
- Human-in-the-loop workflow design

</td>
<td width="50%" valign="top">

### Building next

- Reusable agent orchestration patterns
- Measurable automation case studies
- Workflow dashboards with audit trails
- Technical breakdowns of shipped systems

</td>
</tr>
</table>

## Contact

Open to AI engineering internships, applied LLM work, and automation projects.

<p align="center">
<a href="${profile.portfolio}"><img src="https://img.shields.io/badge/Portfolio-FF6B35?style=flat-square" alt="Portfolio" /></a>
<a href="${profile.linkedin}"><img src="https://img.shields.io/badge/LinkedIn-FF6B35?style=flat-square" alt="LinkedIn" /></a>
<a href="mailto:${profile.email}"><img src="https://img.shields.io/badge/Email-FF6B35?style=flat-square" alt="Email" /></a>
</p>

<img src="./assets/footer.svg" width="100%" alt="${profile.name} — AI Automation Engineer" />
`;

fs.writeFileSync(path.join(root, "README.md"), readme);
console.log("Generated README.md");
