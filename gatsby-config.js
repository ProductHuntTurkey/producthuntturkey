module.exports = {
  siteMetadata: {
    title: `Product Hunt Turkey`,
    description: `Product Hunt Turkey`,
    author: `@mrabdullahsahin`,
    url: 'https://producthuntturkey.netlify.app',
    socialLinks: {
      twitter: { name: 'Twitter', url: 'https://twitter.com/mrabdullahsahin'},
      twitter: { name: 'Twitter', url: 'https://twitter.com/ubeydgencer'},
      github: { name: 'Github', url: 'https://github.com/mrabdullahsahin'},
      github: { name: 'Github', url: 'https://github.com/ubeydgencer'},
      producthuntturkey: { name: 'Product Hunt Turkey', url: 'https://t.me/producthuntturkey'}
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Product Hunt Turkey`,
        short_name: `producthuntturkey`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `src/images/logo192.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
