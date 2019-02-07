import React from 'react'
import { graphql } from 'gatsby'

import Page from '../components/Page'

export default ({ data }) => (
  <Page>
    <h2>{data.contentfulProject.name}</h2>
    <p>{data.contentfulProject.description.description}</p>
  </Page>
)

export const query = graphql`
  query($slug: String!) {
    contentfulProject(slug: { eq: $slug }) {
      name
      description {
        description
      }
    }
  }
`
