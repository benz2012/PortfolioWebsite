import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";

import ProjectFeaturette from '../components/ProjectFeaturette'
import Page from '../components/Page'
import Metadata from '../components/Metadata'
import { PageStyle, Center } from '../components/Layout'
import TextLink from '../components/TextLink'
import TagCard, { TagCardsContainer } from '../components/TagCard'

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

const WorkContainer = styled.div`
  background-color: #D1D5D4;
`

export default ({ data }) => {
  const projects = data.allContentfulProject.edges
  const tags = data.allContentfulTag.edges
  const heroImage = data.hero.childImageSharp.gatsbyImageData
  const workDescrip = data.work.childMarkdownRemark

  return (
    <Page>
      <Metadata
        noTitleTemplate
        description="I am filled with both creative and technological
          passions. Learn more on my portfolio website."
        image={heroImage.src}
        relativeImage
      />

      <GatsbyImage image={heroImage} />
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
                  image={coverPhoto.gatsbyImageData}
                  tags={sections.map(s => s.tag)}
                  {...rest}
                />
              )
            })}
          </ProjectsWrapper>
          <TextLink to="/projects/all">
            <h3 style={{ marginTop: 0 }}>View All Projects →</h3>
          </TextLink>
        </Center>
      </PageStyle>

      <WorkContainer>
        <PageStyle>
          <Center>
            <h2>Work Types</h2>
            <p>{workDescrip.rawMarkdownBody}</p>
            <TagCardsContainer>
              {tags.map(({ node }) => (
                <TagCard
                  key={node.id}
                  name={node.name}
                  description={node.description.description}
                />
              ))}
            </TagCardsContainer>
          </Center>
        </PageStyle>
      </WorkContainer>
    </Page>
  )
}

export const query = graphql`
{
  allContentfulProject(
    filter: { featured: { eq: true } }
    sort: { dateCompleted: DESC }
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
          gatsbyImageData(width: 500, cropFocus: CENTER)
        }
      }
    }
  }

  allContentfulTag(sort: { name: ASC }) {
    edges {
      node {
        id
        name
        description {
          description
        }
      }
    }
  }

  hero: file(relativePath: { eq: "hero.jpg" }) {
    childImageSharp {
      gatsbyImageData(transformOptions: {cropFocus: CENTER}, layout: FULL_WIDTH)
    }
  }

  work: file(relativePath: { eq: "WorkTypes.md" }) {
    childMarkdownRemark {
      rawMarkdownBody
    }
  }
}
`
