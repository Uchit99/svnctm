import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const isProjectPage = process.env.GITHUB_PAGES_PROJECT_SITE === "true";

const nextConfig: NextConfig = {
  env: {
    // Public files are not automatically prefixed by Next.js during a static
    // project-page export, so expose the Pages subpath to image consumers.
    NEXT_PUBLIC_BASE_PATH: isProjectPage ? '/svnctm' : '',
  },
  // GitHub Pages can serve only HTML, CSS, JavaScript, and other static files.
  // Keep the normal server build for local development and server-capable hosts.
  ...(isGitHubPages ? {
    output: "export" as const,
    trailingSlash: true,
    // svnctm.com is served from the domain root. Set GITHUB_PAGES_PROJECT_SITE
    // only when deploying instead to https://uchit99.github.io/svnctm/.
    ...(isProjectPage ? { basePath: "/svnctm" } : {}),
    images: { unoptimized: true },
  } : {}),
};

export default nextConfig;
