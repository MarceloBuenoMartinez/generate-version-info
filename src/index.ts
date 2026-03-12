import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export interface VersionInfo {
  appVersion: string;
  gitShortSha: string;
  buildDate: string;
  releaseDate: string;
}

const safe = (cmd: string, fallback = "unknown"): string => {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch (_) {
    return fallback;
  }
};

export async function generateVersion(): Promise<VersionInfo> {
  // Default paths in current working directory
  const packageJsonPath = path.join(process.cwd(), "package.json");
  const outputPath = path.join(process.cwd(), "version.json");

  // Read package.json
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const version = pkg.version || "0.0.0";

  const fullSha = safe("git rev-parse HEAD");
  const shortSha = fullSha === "unknown" ? "unknown" : fullSha.slice(0, 7);
  const commitDate = safe("git show -s --format=%ci HEAD");
  const releaseDate = commitDate === "unknown" ? "unknown" : new Date(commitDate).toISOString();

  // Simplified payload with essential version info
  const payload: VersionInfo = {
    appVersion: version,
    gitShortSha: shortSha,
    buildDate: new Date().toISOString(),
    releaseDate: releaseDate,
  };

  // Write output
  fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2) + "\n", "utf8");
  
  return payload;
}