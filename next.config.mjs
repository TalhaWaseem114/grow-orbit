/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
  images: {
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
        ],
      },
    ];
  },
};

export default nextConfig;
