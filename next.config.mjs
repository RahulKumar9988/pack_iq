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
      {
        protocol: "https",
        hostname: "packiqbackend.setstatetech.com",
        port: "",
        pathname: "/**", // This allows all paths on packiro.com
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // optional if you're using a specific port
        pathname: "/uploads/packaging_type_images/**",
      },
    ],
  },
};

export default nextConfig;
