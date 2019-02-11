import { Link } from 'gatsby'
import styled from 'styled-components'

const TextLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
  color: inherit;
  background: none;
`

export default TextLink
