#!/usr/bin/env node
const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

const run = (cmd) => execSync(cmd, { stdio: "inherit", shell: true })

// 写入 .env.production，让 next build 能读到环境变量
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

fs.writeFileSync(path.join(__dirname, "..", ".env.production"), envContent + "\n")

console.log(".env.production written:")
envKeys.forEach((key) => {
  console.log(`  ${key}: ${process.env[key] ? "SET" : "NOT SET"}`)
})

if (process.platform !== "win32") {
  run("pnpm exec next-on-pages")
} else {
  run("npx vercel build")
  run("npx cross-env npm_config_user_agent=npm/10.0.0 next-on-pages --skip-build")
}
