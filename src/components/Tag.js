import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { contrastColor } from '../utils/typography'
import { hexToRGB, rgbToHex } from '../utils/transform'

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const TagContainer = styled.div`
  height: 32px;
  border-radius: 16px 16px 16px 16px;
  display: flex;
  align-items: center;

  padding: 0px 16px;
  margin: 0px 6px 6px 0px;

  background-color: ${props => props.color};
  color: ${props => contrastColor(props.color)};
  text-shadow: none;

  &:hover {
    background-color: ${props => props.hoverColor};
    color: ${props => contrastColor(props.hoverColor)};
    text-decoration: underline;
  }
`

const TagLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  background: none;
`

const TagText = styled.small`
  text-decoration: inherit;
`

const reduceBrightness = ({ r, g, b }) => ({
  r: Math.max(0, r - 15),
  g: Math.max(0, g - 15),
  b: Math.max(0, b - 15),
})

const Tag = ({ color, children }) => {
  const rgbColor = hexToRGB(color)
  const hoverColor = rgbToHex(reduceBrightness(rgbColor))
  return (
    <TagLink to={`/work/${children}`}>
      <TagContainer color={color} hoverColor={hoverColor}>
        <TagText>{children}</TagText>
      </TagContainer>
    </TagLink>
  )
}

export default Tag
export {
  TagsWrapper,
}
