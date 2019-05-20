import React from 'react'
import styled from 'styled-components'

import { Segment } from './Footer'
import media from '../utils/media'

const LinksSegment = styled(Segment)`
  grid-area: social;
  margin-top: 1rem;

  ${media.phone`
    display: flex;
  `}
`

const LinkContainer = styled.a`
  display: flex;
  align-items: baseline;

  color: inherit;
  background: none;
  text-shadow: none;

  &:hover {
    color: rgb(37, 52, 62);
    background-color: rgb(209, 213, 212);

    & > i {
      color: rgb(37, 52, 62);
    }
  }
`

const Icon = styled.i`
  &&& {
    width: 30px;
    height: 30px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-right: 8px;

    ${media.phone`
      width: 50px;
      height: 50px;
      font-size: 150%;
      margin-right: 0px;
    `}
  }
`

const Text = styled.div`
  display: inherit;
  color: inherit;

  ${media.phone`
    display: none;
  `}
`

export{
  LinksSegment,
}
export default ({ which, path }) => {
  let other = ''
  if (which === 'facebook') { other = '-f' }
  if (which === 'linkedin') { other = '-in' }
  if (which === 'medium') { other = '-m' }

  return (
    <LinkContainer
      target="_blank"
      rel="noopener"
      href={`https://www.${which}.com${path}`}
    >
      <Icon className={`fab fa-${which}${other}`} />
      <Text>{path}</Text>
    </LinkContainer>
  )
}
