/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_API_BASE_PATH_PRODUCTION: 'http://localhost:3000',
        NEXT_PUBLIC_API_BASE_PATH_DEVELOPMENT: 'https://walktee.vercel.app'
    }
}

module.exports = nextConfig
