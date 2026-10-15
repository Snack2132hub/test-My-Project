import fs from "fs";
import path from "path";
import type { NextConfig } from "next";

const parentDir = path.resolve(__dirname, "..");
const isMonorepo =
  fs.existsSync(path.join(parentDir, "package.json")) &&
  fs.existsSync(path.join(parentDir, "node_modules"));
const workspaceRoot = isMonorepo ? parentDir : __dirname;

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: workspaceRoot,
  turbopack: {
    root: workspaceRoot,
  },

  images: {
    qualities: [75, 95],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
