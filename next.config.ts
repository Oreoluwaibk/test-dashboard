import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  compiler: {
    removeConsole: false,
  },
  output: 'export',
 
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fedskillstest.ct.digital',
        port: '',
        pathname: '/**',
      },
    ]
  }
};

export default nextConfig;
