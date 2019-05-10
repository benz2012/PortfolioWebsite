import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import HeaderNav from '../components/HeaderNav'
import Page from '../components/Page'
import { PageStyle, Center, Content } from '../components/Layout'
import Tag, { TagsWrapper } from '../components/Tag'
import Section from '../components/Section'

const coverContainerStyle = (width, color) => ({
  width,
  boxShadow: `10px 10px 0 0 ${color}`,
})

export default ({ data }) => {
  const project = data.contentfulProject
  return (
    <Page>
      <PageStyle>
        <HeaderNav />

        <Content>
          <Center>
            <Img
              fluid={project.coverPhoto.fluid}
              style={coverContainerStyle(
                project.coverPhoto.fluid.sizes.split(', ')[1],
                project.color,
              )}
            />
          </Center>

          <h2>{project.name}</h2>
          <p>{project.description.description}</p>

          <TagsWrapper>
            {project.sections.map(s => (
              <Tag key={s.tag.id} color={project.color} to={`#${s.tag.name}`}>{s.tag.name}</Tag>
            ))}
          </TagsWrapper>

          {project.sections.map(Section)}
        </Content>
      </PageStyle>
    </Page>
  )
}

// TODO: Implement additionalMedia field once atleast one section holds it
// TODO: Fluid images for thumbnail, aditional, etc
export const query = graphql`
  query($slug: String!) {
    contentfulProject(slug: { eq: $slug }) {
      name
      description {
        description
      }
      color
      coverPhoto {
        fluid(maxWidth: 700 maxHeight: 378 cropFocus: CENTER) {
          ...GatsbyContentfulFluid
        }
      }
      sections {
        id
        header
        tag {
          id
          name
        }
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
      }
    }
  }
`
