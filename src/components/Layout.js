import styled from 'styled-components'

import media from '../utils/media'

const Page = styled.div`
  margin: auto;
  padding: 20px 40px 40px 40px;
  max-width: 1200px;

  ${media.phone`
    padding: 20px 10px 40px 10px;
  `}
`

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export {
  Page,
  Center,
}
