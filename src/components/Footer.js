import styled from 'styled-components'

import { PageStyle } from './Layout'
import media from '../utils/media'

const Footer = styled.footer`
  color: rgb(222, 229, 238);
  background-color: rgb(34, 45, 57);

  & * {
    color: rgb(222, 229, 238);
  }

  & hr {
    background-color: rgba(222, 229, 238, 0.2);
  }
`

const Container = styled(PageStyle)`
  display: grid;
  grid-template-columns: auto 2fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    "avatar about social";
  grid-gap: 30px;

  ${media.tablet`
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "avatar social"
      "about about";
    align-items: center;
    justify-items: center;
  `}

  ${media.phone`
    grid-template-columns: 1fr;
    grid-template-areas:
      "avatar"
      "social"
      "about";
  `}
`

const Segment = styled.div``

const Bottom = styled.h4`
  color: rgb(83, 96, 110);
  margin-top: 1rem;
  margin-bottom: 3rem;
`

export default Footer
export {
  Container,
  Segment,
  Bottom,
}
