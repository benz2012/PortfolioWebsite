import React, { Fragment } from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'

import { Segment } from './Footer'

const AboutSegment = styled(Segment)`
  grid-area: about;
`

const Heading = styled.h3`
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const Divider = styled.hr`
  margin-bottom: calc(1rem - 1px);
`

const Body = styled.section`
  font-size: 0.75rem
`

export {
  AboutSegment,
}
export default () => (
  <StaticQuery
    query={graphql`
      {
        file(relativePath: { eq: "PersonalStatment.md" }) {
          childMarkdownRemark {
            rawMarkdownBody
          }
        }
      }
    `}
    render={data => (
      <Fragment>
        <Heading>About Me</Heading>
        <Divider />
        <Body>
          {data.file.childMarkdownRemark.rawMarkdownBody}
        </Body>
      </Fragment>
    )}
  />
)
