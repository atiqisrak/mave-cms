const nextConfig = {
  target: "server",
  dangerouslyAllowSVG: true,
  distDir: ".next",
  output: "out",
  eslint: {
    dirs: ["."],
    ignoreDuringBuilds: true,
  },
  images: {
    reactStrictMode: true,
    domains: [
      "mave-cms.vercel.app",
      "res.cloudinary.com",
      "mave.ethertech.ltd",
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
