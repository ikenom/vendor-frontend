/* eslint-disable quotes */
module.exports = {
  siteMetadata: {
    title: "@artsy/fresnel",
    googleVerification: `abcdefz`,
    disqus: `gatsby-typescript`
  },
  mapping: {
    'MarkdownRemark.frontmatter.author': `AuthorJson`
  },
  plugins: [

    "gatsby-plugin-react-svgr",
    // Add typescript stack into webpack
    `gatsby-plugin-typescript`,

    // minify html
    // `gatsby-plugin-minify`,

    // This plugin takes your configuration and generates a
    // web manifest file so your website can be added to your
    // homescreen on Android.
    /* eslint-disable camelcase */
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `Gatsby website`,
    //     short_name: `Gatsby website`,
    //     start_url: `/`,
    //     background_color: `#f7f7f7`,
    //     theme_color: `#191919`,
    //     display: `minimal-ui`
    //   }
    // },
    /* eslint-enable camelcase */

    // This plugin generates a service worker and AppShell
    // html file so the site works offline and is otherwise
    // resistant to bad networks. Works with almost any
    // site!
    `gatsby-plugin-offline`
  ]
};