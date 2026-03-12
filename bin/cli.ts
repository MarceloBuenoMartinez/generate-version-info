#!/usr/bin/env node
import path from "path";
import { generateVersion } from "../src/index";

async function main() {
  const envName = process.argv[2];
  
  if (!envName) {
    console.error("Error: Environment name is required");
    console.error("Usage: generate-version-json <env-name>");
    process.exit(1);
  }

  try {
    console.log(`📋 Generating version file for environment: ${envName}`);
    
    // For local testing, use the local config file (go up from dist/bin to root)
    const localConfigPath = path.join(__dirname, "../../config/default.json");
    
    const result = await generateVersion(envName, {
      configPath: localConfigPath
    });
    console.log("✅ Version file generated successfully");
    console.log("📄 Generated version info:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("❌ Failed:", error instanceof Error ? error.message : String(error));
    console.error("💬 Error details:", error);
    process.exit(1);
  }
}

main();