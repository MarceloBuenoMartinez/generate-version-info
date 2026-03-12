#!/usr/bin/env node
import { generateVersion } from "../src/index";

async function main() {
  try {
    console.log("📋 Generating version file...");
    
    const result = await generateVersion();
    console.log("✅ Version file generated successfully");
    console.log("📄 Generated version info:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("❌ Failed:", error instanceof Error ? error.message : String(error));
    console.error("💬 Error details:", error);
    process.exit(1);
  }
}

main();