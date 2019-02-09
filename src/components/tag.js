import React from 'react'
import styled from 'styled-components'

const TagContainer = styled.div`
  border-radius: 8px;
  padding: 0px 6px;
  margin: 0px 6px 6px 0px;
  background-color: ${props => props.color};
`

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const TagLinkA = styled.a`
  text-decoration: none;
  color: inherit;
`

const Tag = ({ color, children }) => (
  <TagContainer color={color}>
    <small>{children}</small>
  </TagContainer>
)

const TagLink = ({ to, color, children }) => (
  <Tag color={color}>
    <TagLinkA href={to}>
      {children}
    </TagLinkA>
  </Tag>
)

export default Tag
export {
  TagsWrapper,
  TagLink,
}
