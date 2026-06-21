const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const projects = JSON.parse(fs.readFileSync(path.join(root, "data", "projects.json"), "utf8"));
const urls = [...new Set(projects.flatMap(({ live, repo }) => [live, repo])
  .filter((url) => url && !url.includes("PLACEHOLDER")))];

async function check(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    let response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "starker111-profile-link-check/1.0" }
    });
    if (response.status === 405 || response.status === 403) {
      response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": "starker111-profile-link-check/1.0" }
      });
    }
    return { url, ok: response.ok, status: response.status };
  } catch (error) {
    return { url, ok: false, status: error.name === "AbortError" ? "TIMEOUT" : error.message };
  } finally {
    clearTimeout(timeout);
  }
}

(async () => {
  console.log(`Checking ${urls.length} project URLs...\n`);
  const results = await Promise.all(urls.map(check));
  for (const result of results) {
    console.log(`${result.ok ? "✓" : "✗"} ${result.status} ${result.url}`);
  }
  const failures = results.filter((result) => !result.ok);
  if (failures.length) {
    console.error(`\n${failures.length} URL(s) failed.`);
    process.exitCode = 1;
  } else {
    console.log("\nAll configured project URLs are reachable.");
  }
})();
