import React from 'react'
import styled from 'styled-components'

import Tag from './tag'

const ProjectContainer = styled.div`
  width: 400px;
  margin: 0px 20px;
  padding: 0px 20px 20px 20px;
  background-color: #f7f6f2;
`

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export default ({ name, date, description, image, color, tags }) => (
  <ProjectContainer>
    <h2>{name}</h2>
    <span>{date}</span>
    <p>{description}</p>
    <img alt={name} src={image} width="100px" />
    <TagsWrapper>
      {tags.map(t => (
        <Tag key={t.id} color={color}>{t.name}</Tag>
      ))}
    </TagsWrapper>
  </ProjectContainer>
)
