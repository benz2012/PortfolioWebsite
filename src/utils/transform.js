const hexToRGB = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return (result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    } : null)
}

const rgbToHex = ({ r, g, b }) => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

const titleCase = (str) => {
  /* Convert `any string` into `Any String`, including replacing underscores
    with spaces */
  if (!str) return
  const splitStr = str.toLowerCase().split(/[\s_]+/)
  for (let i = 0; i < splitStr.length; i += 1) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  return splitStr.join(' ')
}

export {
  hexToRGB,
  rgbToHex,
  titleCase,
}
