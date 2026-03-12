import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export interface VersionConfig {
  regularEnvironments?: string[];
  packageJsonPath?: string;
  outputPath?: string;
  configPath?: string;
}

export interface ScriptConfig {
  version: string;
  regularEnvironments: string[];
}

export interface VersionInfo {
  envType: string;
  envName: string;
  appVersion?: string;
  gitShortSha?: string;
  buildDate?: string;
  releaseDate?: string;
}

type EnvironmentType = "regular" | "feature" | "personal";

const safe = (cmd: string, fallback = "unknown"): string => {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch (_) {
    return fallback;
  }
};

const detectEnvironmentType = (envName: string, config: ScriptConfig, appName: string): EnvironmentType => {
  const baseEnvName = envName.split(".")[0].toLowerCase();
  if (config.regularEnvironments.includes(baseEnvName)) {
    return "regular";
  }
  if (envName.toLowerCase().startsWith(appName)) {
    return "feature";
  }
  return "personal";
};

export async function generateVersion(envName: string, options: VersionConfig = {}): Promise<VersionInfo> {
  // Default paths relative to current working directory
  const configPath = options.configPath || path.join(process.cwd(), "node_modules/@your-username/generate-version-json/config/default.json");
  const packageJsonPath = options.packageJsonPath || path.join(process.cwd(), "package.json");
  const outputPath = options.outputPath || path.join(process.cwd(), "version.json");

  // Read config
  const scriptConfig: ScriptConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
  
  // Read package.json
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const appName = pkg.name || "app";
  const version = pkg.version || "0.0.0";

  // Detect environment type
  const envType = detectEnvironmentType(envName, scriptConfig, appName);

  const fullSha = safe("git rev-parse HEAD");
  const shortSha = fullSha === "unknown" ? "unknown" : fullSha.slice(0, 7);

  let payload: VersionInfo;

  switch (envType) {
    case "regular": {
      const commitDate = safe("git show -s --format=%ci HEAD");
      const releaseDate = new Date(commitDate).toISOString();

      payload = {
        envType,
        envName,
        appVersion: version,
        gitShortSha: shortSha,
        buildDate: new Date().toISOString(),
        releaseDate: releaseDate,
      };
      break;
    }

    case "feature":
      payload = {
        envType,
        envName,
        appVersion: version,
        gitShortSha: shortSha,
        buildDate: new Date().toISOString(),
      };
      break;

    case "personal":
    default:
      console.log(`Skipping version.json generation for personal environment [${envType}]`);
      throw new Error("Personal environments are not supported");
  }

  // Write output
  fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2) + "\n", "utf8");
  console.log(`Generated version.json [${envType}]`, payload);
  
  return payload;
}