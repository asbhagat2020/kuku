/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["kuku.moshimoshi.cloud","s3.ap-south-1.amazonaws.com"],
  },
   images: {
    unoptimized: true, // disables Next.js image optimization, avoids using sharp
  },
};

export default nextConfig;
