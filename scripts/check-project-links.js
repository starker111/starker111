const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const projects = JSON.parse(fs.readFileSync(path.join(root, "data", "projects.json"), "utf8"));
const shipped = projects.filter((project) => project.tier === "shipped");

async function request(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    let response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "starker111-profile-link-check/2.0" }
    });
    if ([403, 405].includes(response.status)) {
      response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": "starker111-profile-link-check/2.0" }
      });
    }
    return { online: response.ok, httpStatus: response.status };
  } catch (error) {
    return {
      online: false,
      httpStatus: error.name === "AbortError" ? "TIMEOUT" : error.message
    };
  } finally {
    clearTimeout(timeout);
  }
}

(async () => {
  const status = { checkedAt: new Date().toISOString(), projects: {} };
  let failed = false;

  for (const project of shipped) {
    const live = await request(project.live);
    const repo = project.repo ? await request(project.repo) : null;
    const online = live.online && (!repo || repo.online);
    failed ||= !online;
    status.projects[project.id] = {
      status: online ? "online" : "offline",
      httpStatus: live.httpStatus,
      repoStatus: repo?.httpStatus ?? null
    };
    console.log(`${online ? "OK" : "FAIL"} ${project.title}: ${live.httpStatus} ${project.live}`);
  }

  fs.writeFileSync(
    path.join(root, "data", "project-status.json"),
    `${JSON.stringify(status, null, 2)}\n`
  );

  if (failed) {
    console.error("One or more shipped project links are unavailable.");
    process.exitCode = 1;
  }
})();
