/** @type {import('next').NextConfig} */
const nextConfig = {
    //basePath: '/rushpe-dev',
    output: 'export',
    distDir: 'dist',
    images: {
        unoptimized: true
    }
};

export default nextConfig;
