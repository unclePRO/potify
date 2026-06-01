/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: {
    position: "bottom-right", // Options: 'bottom-right', 'bottom-left', 'top-left', 'top-right'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com', // Your YouTube whitelist
      },
      {
        protocol: 'https',
        hostname: 'is1-ssl.mzstatic.com', /* This is YouTube's image server */
      },
    ],
  },
};

export default nextConfig;
