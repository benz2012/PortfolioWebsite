require('dotenv').config()
const path = require(`path`)

module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,

    `gatsby-plugin-styled-components`,

    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },

    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: (
          process.env.NODE_ENV !== 'production' ?
            process.env.CONTENTFUL_PREVIEW_KEY :
            process.env.CONTENTFUL_DELIVERY_KEY
        ),
        host: (
          process.env.NODE_ENV !== 'production' ?
          `preview.contentful.com` :
          undefined
        ),
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `copy`,
        path: `${__dirname}/src/copy/`,
      },
    },

    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    `gatsby-transformer-remark`,
  ],
}
