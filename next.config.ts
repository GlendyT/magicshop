import type { NextConfig } from "next";



const nextConfig: NextConfig = {
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