import React from 'react'
import styled from 'styled-components'

const TagContainer = styled.div`
  border-radius: 8px;
  padding: 0px 6px;
  margin: 0px 6px 6px 0px;
  background-color: ${props => props.color};
`

export default ({ color, children }) => (
  <TagContainer color={color}>
    <small>{children}</small>
  </TagContainer>
)
