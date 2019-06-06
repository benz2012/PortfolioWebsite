import React from 'react'
import styled from 'styled-components'

import TextLink from './TextLink'

const HeaderName = styled.h1`
  margin-top: 1rem;
  margin-bottom: 3rem;
  text-decoration: underline;

  &:hover {
    color: grey;
  }
`

const HeaderNav = () => (
  <TextLink to="/">
    <HeaderName>Ben Zenker</HeaderName>
  </TextLink>
)

export default HeaderNav
