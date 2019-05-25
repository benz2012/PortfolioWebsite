import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import media from '../utils/media'

const TagCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Card = styled(Link)`
  width: 200px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;

  text-decoration: none;
  color: inherit;
  background: none;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    box-shadow: 4px 4px 0 0 rgba(0, 0, 0, 0.5);

    & > h3 {
      text-decoration: underline;
    }
  }

  ${media.phone`
    width: 45%;
    line-height 1rem;
    & > h3 {
      text-decoration: underline;
    }
  `}
`

const Name = styled.h3`
  margin: 0;
  margin-top: 10px;
`

const Description = styled.small``

export default ({ name, description }) => (
  <Card to={`/work/${name}`}>
    <Description>{description}</Description>
    <Name>{name}</Name>
  </Card>
)

export {
  TagCardsContainer,
}
