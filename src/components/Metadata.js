import React from 'react'
import { Helmet } from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

const Metadata = ({
  title, description, pathname, image, noTitleTemplate, relativeImage,
}) => (
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

      let pageImage = image
      pageImage = relativeImage ? `${siteUrl}${image}` : pageImage

      const twitterImage = pageImage && (
        <meta name="twitter:image" content={pageImage} />
      )
      const twitterCard = pageImage ? (
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

          {pageImage &&
            <meta property="og:image" content={pageImage} />
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

export default Metadata
