import { execSync } from "child_process";

try {
  console.log("Running pnpm install --no-frozen-lockfile...");
  const result = execSync("pnpm install --no-frozen-lockfile", {
    cwd: "/vercel/share/v0-project",
    stdio: "pipe",
    encoding: "utf-8",
  });
  console.log(result);
  console.log("Lockfile regenerated successfully.");
} catch (err) {
  console.error("Install failed:", err.message);
  if (err.stdout) console.log("stdout:", err.stdout);
  if (err.stderr) console.log("stderr:", err.stderr);
}
