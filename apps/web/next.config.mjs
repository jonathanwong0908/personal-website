import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.basehub.com",
      },
    ],
  },
}

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);