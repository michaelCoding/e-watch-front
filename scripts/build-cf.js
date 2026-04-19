#!/usr/bin/env node
const { execSync } = require("child_process")
const { writeFileSync } = require("fs")

const run = (cmd) => execSync(cmd, { stdio: "inherit", shell: true })

if (process.platform !== "win32") {
  // vercel build subprocess doesn't inherit parent env vars,
  // so write them to .env.production which Next.js/vercel reads automatically
  const envLines = Object.entries(process.env)
    .filter(([key]) => key.startsWith("NEXT_PUBLIC_") || key.startsWith("MEDUSA_"))
    .map(([key, val]) => `${key}=${val}`)
    .join("\n")

  if (envLines) {
    writeFileSync(".env.production", envLines)
  }

  run("pnpm exec next-on-pages")
} else {
  // Windows: bash can't spawn pnpm.cmd, so run vercel build via npx separately
  run("npx vercel build")
  run("npx cross-env npm_config_user_agent=npm/10.0.0 next-on-pages --skip-build")
}
