/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/post',
        destination: '/news/a1a1a1a1',
        permanent: true,
      },
      {
        source: '/news',
        destination: '/news/a1a1a1a1',
        permanent: true,
      },
      {
        source: '/news/tweets',
        destination: '/news/42042069',
        permanent: true,
      },
    ]
  },
}
