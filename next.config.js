/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env:{
    OPENAI_API_KEY:process.env.OPENAI_API_KEY,
    OPENAI_API_LINK:process.env.OPENAI_API_LINK,
    OPENAI_API_TEST_LINK:process.env.OPENAI_API_TEST_LINK
  }
}

module.exports = nextConfig
