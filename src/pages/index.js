import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Project from '../components/project'

const PageContainer = styled.div`
  margin: 3rem auto;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ProjectsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export default ({ data }) => {
  const projects = data.allContentfulProject.edges
  return (
    <PageContainer>
      <h1>Ben Zenker</h1>
      <p>Welcome to my protfolio website</p>
      <ProjectsWrapper>
        {projects.map(({ node }) => (
          <Project
            key={node.id}
            name={node.name}
            date={node.date}
            description={node.description.description}
            image={node.coverPhoto.file.url}
            tags={node.tags}
            color={node.color}
          />
        ))}
      </ProjectsWrapper>
    </PageContainer>
  )
}

export const query = graphql`
{
  allContentfulProject {
    edges {
      node {
        id
        name
        color
        dateCreated
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
