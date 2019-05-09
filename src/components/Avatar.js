import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const ImageContainer = styled(Img)`
  width: 200px;
  border-radius: 50%;
`

export default () => (
  <StaticQuery
    query={graphql`
      {
        file(relativePath: { eq: "avatar.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 512) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <ImageContainer fluid={data.file.childImageSharp.fluid} />
    )}
  />
)
