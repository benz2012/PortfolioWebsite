import React from 'react'
import styled from 'styled-components'
import { GatsbyImage } from 'gatsby-plugin-image'

import TextLink from './TextLink'
import Tag, { TagsWrapper } from './Tag'
import media from '../utils/media'
import { hexToRGB } from '../utils/transform'
import { contrastColor } from '../utils/typography'

const ProjectContainer = styled.div`
  width: 44%;
  margin: 0px 20px 40px 20px;
  padding: 0px 20px 0px 20px;

  ${media.tablet`width: 90%;`}
  ${media.phone`
    width: 100%;
    margin: 0px 0px 30px 0px;
    padding: 0px 10px 0px 10px;
  `}
`

const ColoredImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
`

const ImageColorOverlay = styled.div`
  position: absolute;
  top: 0;
  width: 102%;
  height: 102%;
  background: ${props => `rgba(${props.r}, ${props.g}, ${props.b}, 0.5)`};
  background: linear-gradient(
      ${props => `rgba(${props.r}, ${props.g}, ${props.b}, 0.2)`},
      ${props => `rgba(${props.r}, ${props.g}, ${props.b}, 0.7)`}
    );
`

const TitleOverImage = styled(TextLink)`
  color: ${props => contrastColor(props.color)};
  position: absolute;
  bottom: 10px;
  left: 14px;
`

const Title = styled.h2`
  color: inherit;
  margin-bottom: 0;
  text-shadow: 0px 0px 4px ${props => `rgba(${props.r}, ${props.g}, ${props.b}, 0.3)`};
`

const Description = styled.p`
  margin-bottom: 15px;
`

const DateString = styled.small`
  color: rgba(0, 0, 0, 0.50)
`

const ProjectFeaturette = ({ name, date, description, image, color, tags, slug }) => {
  const rgbColor = hexToRGB(color)
  return (
    <ProjectContainer>
      <ColoredImageContainer>
        <GatsbyImage image={image} />
        <ImageColorOverlay {...rgbColor} />
        <TitleOverImage color={color} to={`/projects/${slug}/`}>
          <Title {...rgbColor}>{name}</Title>
        </TitleOverImage>
      </ColoredImageContainer>

      <DateString>{date || 'Ongoing'}</DateString>
      <Description>{description}</Description>

      <TagsWrapper>
        {tags.map(t => (
          <Tag key={t.id} color={color}>{t.name}</Tag>
        ))}
      </TagsWrapper>
    </ProjectContainer>
  )
}

export default ProjectFeaturette
