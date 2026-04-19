#!/usr/bin/env node
const { execSync } = require("child_process")

const run = (cmd) => execSync(cmd, { stdio: "inherit", shell: true })

if (process.env.CF_PAGES === "1") {
  // Cloudflare Pages CI (Linux): next-on-pages handles vercel build internally
  run("pnpm exec next-on-pages")
} else {
  // Local Windows: pnpm can't be spawned from bash, so run vercel build via npx
  run("npx vercel build")
  run("npx cross-env npm_config_user_agent=npm/10.0.0 next-on-pages --skip-build")
}
