import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Project from '../components/Project'
import Page from '../components/Page'

const ProjectsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
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
      <Img fluid={heroImage} />
      <HeroText aspectRatio={heroImage.aspectRatio}>
        Hi, I'm Ben Zenker
      </HeroText>

      <Page>
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
    </div>
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

  file(relativePath: { eq: "hero.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 4000 maxHeight: 2150 cropFocus: CENTER) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`
