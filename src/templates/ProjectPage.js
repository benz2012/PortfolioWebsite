import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Page, Center } from '../components/Layout'
import TextLink from '../components/TextLink'
import { TagLink, TagsWrapper } from '../components/Tag'

const coverContainerStyle = (width, color) => ({
  width,
  boxShadow: `10px 10px 0 0 ${color}`,
})

const Content = styled.div`
  max-width: 700px;
  margin: auto;
`

export default ({ data }) => {

  const project = data.contentfulProject
  return (
    <Page>
      <TextLink to="/">
        <h1>Ben Zenker</h1>
      </TextLink>

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
            <TagLink key={s.tag.id} color={project.color} to={`#${s.tag.name}`}>{s.tag.name}</TagLink>
          ))}
        </TagsWrapper>

        {project.sections.map(s => (
          <div key={s.id} id={s.tag.name}>
            <h3>{`${s.tag.name.charAt(0).toUpperCase()}${s.tag.name.slice(1)}`}</h3>
            <img alt="" src={s.thumbnail.file.url} />
            <div dangerouslySetInnerHTML={{ __html: s.body.childMarkdownRemark.html }} />
            <p><a href={s.url}>{s.url}</a></p>
            {s.additionalMedia && s.additionalMedia
              .filter(media => media.file.contentType.includes('image'))
              .map(media => (
                <React.Fragment key={media.id}>
                  <img alt="" src={media.file.url} />
                  <p>{media.description}</p>
                </React.Fragment>
              ))
            }
          </div>
        ))}
      </Content>
    </Page>
  )
}

// TODO: Implement additionalMedia field once atleast one section holds it
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
