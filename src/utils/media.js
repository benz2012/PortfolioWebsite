import { css } from 'styled-components'

const sizes = {
  tablet: 768,
  phone: 576,
}

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
  @media (max-width: ${sizes[label] / 16}em) {
  ${css(...args)}
  }
  `
  return acc
}, {})

// Static Sizes
const GALLERY_THUMB_SIZE = 150

export default media
export {
  GALLERY_THUMB_SIZE,
}
