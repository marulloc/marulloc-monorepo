/** @type {import('next').NextConfig} */

const nextConfig = {
    // reactStrictMode: true,

    rewrites: async () => [
        { source: '/upbit/:path*', destination: 'wss://api.upbit.com/websocket/v1/:path*' },
    ],
};

module.exports = nextConfig;
