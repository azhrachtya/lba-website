/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Strict-Transport-Security", value: "max-age=31536000" }],
      },
      {
        source: "/:folder(images|videos|fonts)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, s-maxage=604800" }],
      },
    ];
  },
  images: { remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }] },
};
export default nextConfig;