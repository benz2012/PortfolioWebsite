import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Tag from './Tag'

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

const NameLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
  color: inherit;
`

export default ({ name, date, description, image, color, tags, slug }) => (
  <ProjectContainer>
    <NameLink to={`/projects/${slug}/`}>
      <h2>{name}</h2>
    </NameLink>
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
