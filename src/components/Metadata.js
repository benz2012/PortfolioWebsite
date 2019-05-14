import React from 'react'
import { Helmet } from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

export default ({ title, description, pathname, image, useDefaultTitle }) => (
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
    }) => (
      <Helmet>
        {(title && !useDefaultTitle) &&
          <title>{title}</title>
        }

        {description &&
          <meta name="description" content={description} />
        }

        {title &&
          <meta property="og:title" content={title} />
        }
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}${pathname || "/"}`} />

        {image &&
          <meta property="og:image" content={`${siteUrl}${image}`} />
        }

        {description &&
          <meta property="og:description" content={description} />
        }

        <meta name="twitter:card" content="summary" />
      </Helmet>
    )}
  />
)
