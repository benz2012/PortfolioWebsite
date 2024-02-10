import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import HeaderNav from '../../components/HeaderNav'
import ProjectFeaturette from '../../components/ProjectFeaturette'
import Page from '../../components/Page'
import Metadata from '../../components/Metadata'
import { PageStyle, Center } from '../../components/Layout'

const ProjectsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 40px;
`

const All = ({ data, location }) => {
  const projects = data.allContentfulProject.edges
  return (
    <Page>
      <Metadata
        title="All Projects"
        description="Preview all projects both completed and ongoing."
        pathname={location.pathname}
      />

      <PageStyle>
        <HeaderNav />

        <Center>
          <h2 style={{ marginTop: 0 }}>All Projects</h2>
          <ProjectsWrapper>
            {projects.map(({ node }) => {
              const { id, dateCreated, dateCompleted, description,
                coverPhoto, sections, ...rest } = node
              const dateStamp = dateCompleted ?
                `${dateCreated} - ${dateCompleted}` :
                'Ongoing'
              return (
                <ProjectFeaturette
                  key={id}
                  date={dateStamp}
                  description={description.description}
                  image={coverPhoto.gatsbyImageData}
                  tags={sections.map(s => s.tag)}
                  {...rest}
                />
              )
            })}
          </ProjectsWrapper>
        </Center>
      </PageStyle>
    </Page>
  )
}

export const query = graphql`
{
  allContentfulProject(sort: { dateCompleted: DESC }) {
    edges {
      node {
        id
        name
        color
        dateCreated(formatString: "MMM YYYY")
        dateCompleted(formatString: "MMM YYYY")
        slug
        description {
          description
        }
        sections {
          tag {
            id
            name
          }
        }
        coverPhoto {
          gatsbyImageData(width: 1060, cropFocus: CENTER)
        }
      }
    }
  }
}
`

export default All
