import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import HeaderNav from '../components/HeaderNav'
import Page from '../components/Page'
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

export default ({ data, pageContext }) => {
  const sections = data.allContentfulSection.edges
  const tag = pageContext
  return (
    <Page>
      <PageStyle>
        <HeaderNav />

        <Content>
          <h1>{titleCase(tag.name)}</h1>
          <p>{tag.description.description}</p>

          {sections.sort(sortSections).map(({ node }) => {
            const { id, project, ...rest } = node
            const linkedProject = project[0]
            return (
              <SectionFromProject key={id}>
                <Header>
                  <TagSectionName>{titleCase(tag.name)}</TagSectionName>
                  <Project>
                    From&nbsp;
                    <ProjectLink to={`/projects/${linkedProject.slug}`}>
                      {linkedProject.name}
                    </ProjectLink>
                  </Project>
                </Header>

                <Section {...rest} />
              </SectionFromProject>
            )
          })}
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
            file {
              url
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
              url
              contentType
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
