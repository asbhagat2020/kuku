/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["kuku.moshimoshi.cloud","s3.ap-south-1.amazonaws.com"],
  },
   images: {
    unoptimized: true, // disables Next.js image optimization, avoids using sharp
  },

   async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://translate.google.com https://translate.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://translate.googleapis.com",
              "img-src 'self' data: https: https://translate.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://translate.googleapis.com https://translate.google.com",
              "frame-src https://translate.google.com https://translate.googleapis.com",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
