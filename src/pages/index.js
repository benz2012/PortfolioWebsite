import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Tracking from '../components/Tracking'
import ProjectFeaturette from '../components/ProjectFeaturette'
import { Page, Center } from '../components/Layout'

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
    <div>
      <Tracking />

      <Img fluid={heroImage} />
      <HeroText aspectRatio={heroImage.aspectRatio}>
        Hi, I'm Ben Zenker
      </HeroText>

      <Page>
        <Center>
          <h2>Featured Work</h2>
          <ProjectsWrapper>
            {projects.map(({ node }) => {
              const { id, dateCreated, description, coverPhoto, sections, ...rest } = node
              return (
                <ProjectFeaturette
                  key={id}
                  date={dateCreated}
                  description={description.description}
                  image={coverPhoto.fluid}
                  tags={sections.map(s => s.tag)}
                  {...rest}
                />
              )
            })}
          </ProjectsWrapper>
        </Center>
      </Page>
    </div>
  )
}

// TODO: Grab cover photo as fluid
export const query = graphql`
{
  allContentfulProject(sort: { fields: dateCreated, order: DESC }) {
    edges {
      node {
        id
        name
        color
        dateCreated(formatString: "MMMM YYYY")
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
