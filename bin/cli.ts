#!/usr/bin/env node
import { generateVersion } from "../src/index";

async function main() {
  const envName = process.argv[2];
  
  if (!envName) {
    console.error("Error: Environment name is required");
    console.error("Usage: generate-version-json <env-name>");
    process.exit(1);
  }

  try {
    await generateVersion(envName);
    console.log("✅ Version file generated successfully");
  } catch (error) {
    console.error("❌ Failed:", error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();