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

export default ({ data, location }) => {
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
                  image={coverPhoto.fluid}
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
  allContentfulProject(
    sort: { fields: dateCompleted, order: DESC }
  ) {
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
          fluid(maxWidth: 1060 maxHeight: 540 cropFocus: CENTER) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
}
`
