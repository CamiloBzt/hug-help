import { execSync } from "child_process";
execSync("pnpm install --no-frozen-lockfile", { stdio: "inherit", cwd: "/vercel/share/v0-project" });
console.log("Lockfile regenerated successfully");
