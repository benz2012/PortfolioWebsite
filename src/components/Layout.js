import styled from 'styled-components'

import media from '../utils/media'

const PageStyle = styled.div`
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

const Content = styled.div`
  max-width: 700px;
  margin: auto;
`

export {
  PageStyle,
  Center,
  Content,
}
