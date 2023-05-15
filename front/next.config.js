/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ['fireship.io'],
  },
  env: {
    API_HOST: process.env.API_HOST,
  }
}

module.exports = nextConfig
