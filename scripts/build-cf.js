#!/usr/bin/env node
const { execSync } = require("child_process")

const run = (cmd) => execSync(cmd, { stdio: "inherit", shell: true })

if (process.platform !== "win32") {
  // Linux CI (Cloudflare Pages): next-on-pages handles vercel build internally
  run("pnpm exec next-on-pages")
} else {
  // Windows: bash can't spawn pnpm.cmd, so run vercel build via npx separately
  run("npx vercel build")
  run("npx cross-env npm_config_user_agent=npm/10.0.0 next-on-pages --skip-build")
}
