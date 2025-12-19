/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://god-first-fashion.vercel.app/',
  generateRobotsTxt: true, // Automatically creates robots.txt
  sitemapSize: 7000,
  changefreq: 'monthly',
  priority: 0.7,
  exclude: ['/server-sitemap.xml'], // Exclude dynamic sitemaps if you use them
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://god-first-fashion.vercel.app//server-sitemap.xml', // Only if you have dynamic server-side routes
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Black-Box',
        disallow: ['/api', '/admin'], // Protect your backend routes from crawlers
      },
    ],
  },
}