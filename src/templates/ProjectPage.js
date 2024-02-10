import React from 'react'
import styled from 'styled-components'
import { GatsbyImage } from "gatsby-plugin-image";
import { graphql } from 'gatsby'

import HeaderNav from '../components/HeaderNav'
import Page from '../components/Page'
import Metadata from '../components/Metadata'
import { PageStyle, Center, Content } from '../components/Layout'
import Tag, { TagsWrapper } from '../components/Tag'
import Section from '../components/Section'
import media from '../utils/media'

const CoverPhoto = styled(GatsbyImage)`
  width: 100%;
  border-radius: 10px;
  box-shadow: 10px 10px 0 0 ${props => props.color};
  ${media.phone`
    box-shadow: 0px 10px 0 0 ${props => props.color};
  `}
`

const DateString = styled.small`
  color: rgba(0, 0, 0, 0.50);
`

const ProjectPage = ({ data, location }) => {
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
        image={`https:${coverPhoto.gatsbyImageData.src}&q=100`}
      />

      <PageStyle>
        <HeaderNav />

        <Content>
          <Center>
            <CoverPhoto image={coverPhoto.gatsbyImageData} color={color} />
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
            <Section key={id} color={color} {...rest} />
          ))}
        </Content>
      </PageStyle>
    </Page>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulProject(slug: { eq: $slug }) {
      name
      description {
        description
      }
      color
      coverPhoto {
        gatsbyImageData(width: 700, cropFocus: CENTER)
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
          gatsbyImageData(width: 700)
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
          thumbnail: gatsbyImageData(layout: FIXED, width: 150, height: 150, cropFocus: CENTER)
          image: gatsbyImageData(width: 1200)
        }
      }
    }
  }
`

export default ProjectPage
