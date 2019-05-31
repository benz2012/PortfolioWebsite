exports.onInitialClientRender = () => {
  const { hash } = window.location
  if (hash.length > 1) {
    const id = hash.substring(1)
    const elm = document.getElementById(id)
    elm.scrollIntoView()
  }
}
