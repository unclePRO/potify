/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allows Next.js HMR (Live Reloading) to pass through the Cloudflare Tunnel
  allowedDevOrigins: ['unclepro.site', 'https://unclepro.site'],
  
  reactCompiler: true,
  devIndicators: {
    position: "bottom-right",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com', // YouTube whitelist
      },
      {
        protocol: 'https',
        hostname: 'is1-ssl.mzstatic.com', // yt image server
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // google profile images
      },
      {
        protocol: 'https',
        hostname: 'tse2.mm.bing.net', // fav images
      },
    ],
  },
};

export default nextConfig;