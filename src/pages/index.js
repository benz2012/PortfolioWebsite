import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import ProjectFeaturette from '../components/ProjectFeaturette'
import Page from '../components/Page'
import { PageStyle, Center } from '../components/Layout'
import TextLink from '../components/TextLink'

const ProjectsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 40px;
`

const HeroText = styled.h1`
  position: absolute;
  top: ${props => `calc(calc(100vw / ${props.aspectRatio} / 2) - 19px)`};
  width: 100%;
  margin: 0;
  text-align: center;
  color: white;
`

export default ({ data }) => {
  const heroImage = data.file.childImageSharp.fluid
  const projects = data.allContentfulProject.edges
  return (
    <Page>
      <Img fluid={heroImage} />
      <HeroText aspectRatio={heroImage.aspectRatio}>
        Hi, I'm Ben Zenker
      </HeroText>

      <PageStyle>
        <Center>
          <h2>Featured Projects</h2>
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
          <TextLink to="/projects/all">
            <h3 style={{ marginTop: 0 }}>View All Projects →</h3>
          </TextLink>

          {/* Tag Search Blipper goes here */}
        </Center>
      </PageStyle>
    </Page>
  )
}

export const query = graphql`
{
  allContentfulProject(
    filter: { featured: { eq: true } }
    sort: { fields: dateCreated, order: DESC }
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

  file(relativePath: { eq: "hero.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 4000 maxHeight: 2150 cropFocus: CENTER) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`
