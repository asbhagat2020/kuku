// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["kuku.moshimoshi.cloud","s3.ap-south-1.amazonaws.com"],
//   },
//    images: {
//     unoptimized: true, // disables Next.js image optimization, avoids using sharp
//   },
// };

// export default nextConfig;










/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["kuku.moshimoshi.cloud", "s3.ap-south-1.amazonaws.com"],
    unoptimized: true, // Disables Next.js image optimization, avoids using sharp
  },
  async headers() {
    const isDev = process.env.NODE_ENV === "development";
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline' ${
                isDev ? "'unsafe-eval'" : ""
              } https://translate.google.com https://translate.googleapis.com`,
              "style-src 'self' 'unsafe-inline' https://translate.googleapis.com",
              "img-src 'self' data: https: https://translate.googleapis.com https://kuku.moshimoshi.cloud https://s3.ap-south-1.amazonaws.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              `connect-src 'self' https://translate.googleapis.com https://translate.google.com ${
                isDev ? "http://localhost:5000" : "https://kuku-api.moshimoshi.cloud"
              }`,
              "frame-src https://translate.google.com https://translate.googleapis.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;