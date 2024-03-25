const nextConfig = {
  dangerouslyAllowSVG: true,
  distDir: ".next",
  output: "out",
  eslint: {
    dirs: ["."],
    ignoreDuringBuilds: true,
  },
  images: {
    reactStrictMode: true,
    domains: ["mave-almuslim.etherstaging.xyz"],
    unoptimized: true,
  },
};

module.exports = nextConfig;