import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages can serve only HTML, CSS, JavaScript, and other static files.
  // Keep the normal server build for local development and server-capable hosts.
  ...(process.env.GITHUB_ACTIONS === "true" ? {
    output: "export" as const,
    trailingSlash: true,
    basePath: "/svnctm",
    images: { unoptimized: true },
  } : {}),
};

export default nextConfig;
