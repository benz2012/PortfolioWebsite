import React from 'react'
import styled from 'styled-components'

import TextLink from './TextLink'
import Tag, { TagsWrapper } from './Tag'

const ProjectContainer = styled.div`
  width: 400px;
  margin: 0px 20px 40px 20px;
  padding: 0px 20px 20px 20px;
  background-color: #f7f6f2;
`

export default ({ name, date, description, image, color, tags, slug }) => (
  <ProjectContainer>
    <TextLink to={`/projects/${slug}/`}>
      <h2>{name}</h2>
    </TextLink>
    <small><em>{date}</em></small>
    <p>{description}</p>
    <img alt={name} src={image} width="100px" />
    <TagsWrapper>
      {tags.map(t => (
        <Tag key={t.id} color={color}>{t.name}</Tag>
      ))}
    </TagsWrapper>
  </ProjectContainer>
)
