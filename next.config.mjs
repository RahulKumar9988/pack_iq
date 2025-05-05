/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "packiro.com",
        port: "",
        pathname: "/**", // This allows all paths on packiro.com
      },
      {
        protocol: "https",
        hostname: "packiq.setstatetech.com",
        port: "",
        pathname: "/**", // This allows all paths on packiro.com
      },
      {
        protocol: "https",
        hostname: "packiq-frontend.vercel.app",
        port: "",
        pathname: "/**", // This allows all paths on packiro.com
      },
    ],
  },
};

export default nextConfig;
