import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    // Static document pages live in public/ as plain HTML; public/ has no
    // directory-index resolution, so map the clean URL to the file.
    return [
      {
        source: "/document/MINDSET",
        destination: "/document/MINDSET/index.html",
      },
    ];
  },
};

export default nextConfig;
