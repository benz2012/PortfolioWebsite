import styled from 'styled-components'

import { PageStyle } from './Layout'
// import media from '../utils/media'

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
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
`

const Segment = styled.div`
  padding: 10px;
`

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
