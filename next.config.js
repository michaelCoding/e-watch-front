const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  distDir: ".next",   // 修改此路径以自定义 build 输出目录
  reactStrictMode: true,
  transpilePackages: [
    "react-aria",
    "@react-aria/breadcrumbs","@react-aria/button","@react-aria/calendar",
    "@react-aria/checkbox","@react-aria/color","@react-aria/combobox",
    "@react-aria/datepicker","@react-aria/dialog","@react-aria/disclosure",
    "@react-aria/dnd","@react-aria/focus","@react-aria/form",
    "@react-aria/grid","@react-aria/gridlist","@react-aria/i18n",
    "@react-aria/interactions","@react-aria/label","@react-aria/link",
    "@react-aria/listbox","@react-aria/live-announcer","@react-aria/menu",
    "@react-aria/meter","@react-aria/numberfield","@react-aria/overlays",
    "@react-aria/progress","@react-aria/radio","@react-aria/searchfield",
    "@react-aria/select","@react-aria/selection","@react-aria/separator",
    "@react-aria/slider","@react-aria/spinbutton","@react-aria/ssr",
    "@react-aria/switch","@react-aria/table","@react-aria/tabs",
    "@react-aria/tag","@react-aria/textfield","@react-aria/toggle",
    "@react-aria/toolbar","@react-aria/tooltip","@react-aria/utils",
    "@react-aria/visually-hidden","@medusajs/ui",
  ],
  webpack: (config) => {
    config.module.rules.unshift({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
      resolve: { fullySpecified: false },
    });
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
      },
      ...(process.env.NEXT_PUBLIC_BASE_URL ? [{ // Note: needed to serve images from /public folder
        protocol: process.env.NEXT_PUBLIC_BASE_URL.startsWith('https') ? 'https' : 'http',
        hostname: process.env.NEXT_PUBLIC_BASE_URL.replace(/^https?:\/\//, ''),
      }] : []),
      ...(process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ? [{ // Note: only needed when using local-file for product media
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL.replace('https://', ''),
      }] : []),
      { // Note: can be removed after deleting demo products
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      { // Note: can be removed after deleting demo products
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      { // Note: can be removed after deleting demo products
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
      ...(process.env.NEXT_PUBLIC_MINIO_ENDPOINT ? [{ // Note: needed when using MinIO bucket storage for media
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_MINIO_ENDPOINT,
      }] : []),
    ],
  },
  serverRuntimeConfig: {
    port: process.env.PORT || 3000
  }
}

module.exports = nextConfig
