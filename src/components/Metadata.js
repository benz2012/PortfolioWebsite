import React from 'react'
import { Helmet } from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

export default ({ title, description, pathname, image, noTitleTemplate }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: {
          siteUrl,
        },
      },
    }) => {
      let pageTitle = "I'm Ben Zenker"
      pageTitle = title || pageTitle
      pageTitle = noTitleTemplate ? pageTitle : `${pageTitle} | Zenker`

      const twitterImage = image && (
        <meta name="twitter:image" content={`${siteUrl}${image}`} />
      )
      const twitterCard = image ? (
        <meta name="twitter:card" content="summary_large_image" />
      ) : (
        <meta name="twitter:card" content="summary" />
      )

      return (
        <Helmet>
          <title>{pageTitle}</title>

          {description &&
            <meta name="description" content={description} />
          }

          <meta property="og:title" content={pageTitle} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${siteUrl}${pathname || "/"}`} />

          {image &&
            <meta property="og:image" content={`${siteUrl}${image}`} />
          }

          {description &&
            <meta property="og:description" content={description} />
          }

          {twitterCard}
          {twitterImage}
        </Helmet>
      )
    }}
  />
)
