import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    '192.168.1.135',
    '127.0.0.1'
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "lastfm.freetls.fastly.net",
      },
      {
        protocol: "https", 
        hostname: "lastfm-img2.akamaized.net",
      },
      {
        protocol: "https",
        hostname: "**.last.fm",
      },
    ],
  },
};

export default nextConfig;