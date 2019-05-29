import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import HeaderNav from '../components/HeaderNav'
import Page from '../components/Page'
import Metadata from '../components/Metadata'
import { PageStyle, Content } from '../components/Layout'
import Section from '../components/Section'
import { titleCase } from '../utils/transform'
import TextLink from '../components/TextLink'

const SectionFromProject = styled.div`
  padding: 6px 20px;
  margin-bottom: 20px;
  background-color: rgba(83, 96, 110, 0.05);
`

const Header = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const TagSectionName = styled.h3`
  margin: 0;
`

const Project = styled.small`
  color: rgba(0, 0, 0, 0.50);
`

const ProjectLink = styled(TextLink)`
  text-decoration: underline;

  &:hover {
    color: rgba(0, 0, 0, 0.75);
  }
`

const sortSections = (a, b) => {
  const field = 'dateCompleted'
  const dateA = a.node.project[0][field]
  const dateB = b.node.project[0][field]
  if (dateA === null) return -1
  if (dateB === null) return 1
  if (dateA < dateB) return 1
  if (dateA > dateB) return -1
  return 0
}

export default ({ data, pageContext, location }) => {
  const sections = data.allContentfulSection.edges
  const { name, description } = pageContext
  return (
    <Page>
      <Metadata
        title={titleCase(name)}
        description={description.description}
        pathname={location.pathname}
      />

      <PageStyle>
        <HeaderNav />

        <Content>
          <h1>{titleCase(name)}</h1>
          <p>{description.description}</p>

          {sections.sort(sortSections).map(({ node }) => {
            const { id, project, ...rest } = node
            const linkedProject = project[0]
            return (
              <SectionFromProject key={id}>
                <Header>
                  <TagSectionName>{titleCase(name)}</TagSectionName>
                  <Project>
                    From&nbsp;
                    <ProjectLink to={`/projects/${linkedProject.slug}`}>
                      {linkedProject.name}
                    </ProjectLink>
                  </Project>
                </Header>

                <Section {...rest} tag={{ name }} hideTitle />
              </SectionFromProject>
            )
          })}

          {sections.length === 0 && (
            <p><em>There are no sections related to work of this type.</em></p>
          )}
        </Content>
      </PageStyle>
    </Page>
  )
}

export const query = graphql`
  query($name: String!) {
    allContentfulSection(
      filter: {
        tag: {
          name: {
            eq: $name
          }
        }
      }
    ) {
      edges {
        node {
          id
          header
          thumbnail {
            fluid(maxWidth: 700) {
              ...GatsbyContentfulFluid
            }
          }
          body {
            childMarkdownRemark {
              html
            }
          }
          url
          additionalMedia {
            id
            description
            file {
              contentType
            }
            thumbnail: fixed(width: 150, height: 150, cropFocus: CENTER) {
              ...GatsbyContentfulFixed
            }
            image: fluid(maxWidth: 1200) {
              ...GatsbyContentfulFluid
            }
          }
          project {
            name
            slug
            dateCompleted
          }
        }
      }
    }
  }
`
