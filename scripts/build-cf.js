#!/usr/bin/env node
const { execSync } = require("child_process")
const { writeFileSync } = require("fs")
const { join } = require("path")

const run = (cmd) => execSync(cmd, { stdio: "inherit", shell: true })

if (process.platform !== "win32") {
  const envKeys = [
    "NEXT_PUBLIC_MEDUSA_BACKEND_URL",
    "NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY",
    "NEXT_PUBLIC_MINIO_ENDPOINT",
    "NEXT_PUBLIC_SEARCH_API_KEY",
    "NEXT_PUBLIC_SEARCH_ENDPOINT",
    "NEXT_PUBLIC_BASE_URL",
  ]

  const envContent = envKeys
    .filter((key) => process.env[key] !== undefined)
    .map((key) => `${key}=${process.env[key]}`)
    .join("\n")

  // use absolute path so working directory doesn't matter
  writeFileSync(join(__dirname, "..", ".env.production"), envContent + "\n")

  console.log(".env.production written:")
  envKeys.forEach((key) => {
    console.log(`  ${key}: ${process.env[key] ? "SET" : "NOT SET"}`)
  })

  run("pnpm exec next-on-pages")
} else {
  // Windows: bash can't spawn pnpm.cmd, so run vercel build via npx separately
  run("npx vercel build")
  run("npx cross-env npm_config_user_agent=npm/10.0.0 next-on-pages --skip-build")
}
