import Typography from 'typography'
import theme from 'typography-theme-ocean-beach'

const typography = new Typography(theme)

const contrastColor = (hex, light = '#ffffff', dark = '#0f0f0f') => {
  if (hex.length < 5) {
    hex += hex.slice(1)
  }
  return (hex.replace('#','0x')) > (0xffffff / 1.1) ? dark : light
}

export default typography
export {
  contrastColor,
}
