import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'

import HeaderNav from '../components/HeaderNav'
import Page from '../components/Page'
import Metadata from '../components/Metadata'
import { PageStyle, Center, Content } from '../components/Layout'
import Tag, { TagsWrapper } from '../components/Tag'
import Section from '../components/Section'

const coverContainerStyle = (width, color) => ({
  width,
  boxShadow: `10px 10px 0 0 ${color}`,
})

const DateString = styled.small`
  color: rgba(0, 0, 0, 0.50);
`

export default ({ data, location }) => {
  const { coverPhoto, color, name, description, dateCreated,
    dateCompleted, sections } = data.contentfulProject
  const dateStamp = dateCompleted ?
    `${dateCreated} - ${dateCompleted}` :
    'Ongoing'

  return (
    <Page>
      <Metadata
        title={name}
        description={description.description}
        pathname={location.pathname}
        image={`https:${coverPhoto.fluid.src}`}
      />

      <PageStyle>
        <HeaderNav />

        <Content>
          <Center>
            <Img
              fluid={coverPhoto.fluid}
              style={coverContainerStyle(
                coverPhoto.fluid.sizes.split(', ')[1],
                color,
              )}
            />
          </Center>

          <h2>{name}</h2>
          <DateString>{dateStamp}</DateString>
          <p>{description.description}</p>

          <TagsWrapper>
            {sections.map(s => (
              <Tag key={s.tag.id} color={color} to={`#${s.tag.name}`}>{s.tag.name}</Tag>
            ))}
          </TagsWrapper>

          {sections.map(({ id, ...rest }) => (
            <Section key={id} {...rest} />
          ))}
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
      dateCreated(formatString: "MMMM YYYY")
      dateCompleted(formatString: "MMMM YYYY")
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
