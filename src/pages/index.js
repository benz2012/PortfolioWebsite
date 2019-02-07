import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Project from '../components/Project'
import Page from '../components/Page'

const ProjectsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export default ({ data }) => {
  const projects = data.allContentfulProject.edges
  return (
    <Page>
      <h1>Ben Zenker</h1>
      <p>Welcome to my protfolio website</p>

      <ProjectsWrapper>
        {projects.map(({ node }) => {
          const { id, dateCreated, description, coverPhoto, ...rest } = node
          return (
            <Project
              key={id}
              date={dateCreated}
              description={description.description}
              image={coverPhoto.file.url}
              {...rest}
            />
          )
        })}
      </ProjectsWrapper>
    </Page>
  )
}

export const query = graphql`
{
  allContentfulProject(sort: { fields: dateCreated, order: DESC }) {
    edges {
      node {
        id
        name
        color
        dateCreated(formatString: "MMMM Do, YYYY")
        slug
        description {
          description
        }
        tags {
          id
          name
        }
        coverPhoto {
          file {
            url
          }
        }
      }
    }
  }
}
`
