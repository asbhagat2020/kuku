// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' translate.google.com *.googleapis.com; frame-src translate.google.com;",
          },
        ],
      },
    ];
  },
};