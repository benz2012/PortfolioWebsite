import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

const ImageContainer = styled(GatsbyImage)`
  width: 200px;
  border-radius: 50%;
`

export default () => (
  <StaticQuery
    query={graphql`
      {
        file(relativePath: { eq: "avatar.jpg" }) {
          childImageSharp {
            gatsbyImageData(width: 512, placeholder: TRACED_SVG, layout: CONSTRAINED)
          }
        }
      }
    `}
    render={data => (
      <ImageContainer image={data.file.childImageSharp.gatsbyImageData} />
    )}
  />
)
