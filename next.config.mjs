/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["firebase-admin"],
  trailingSlash: true,
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/amazon-services-landing/",
        destination: "/get-started/amazon-services-landing/",
        permanent: true,
      },
      {
        source: "/amazon-services-landing",
        destination: "/get-started/amazon-services-landing/",
        permanent: true,
      },
      {
        source: "/design-creative-landing/",
        destination: "/get-started/design-creative-landing/",
        permanent: true,
      },
      {
        source: "/design-creative-landing",
        destination: "/get-started/design-creative-landing/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://*.facebook.com https://*.meta.com",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
