import React from 'react'
import styled from 'styled-components'

const VideoContainer = styled.div`
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;

  display: ${props => props.display === 'false' ? 'none' : 'block'};
`

const VideoFrame = styled.iframe`
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
`

const YoutubeVideo = React.forwardRef((props, ref) => {
  const { url, display } = props

  const idMatch = url.match(/v=(.+)/)
  if (!idMatch) { return null }
  const id = idMatch[1]
  const embededURL = `https://www.youtube.com/embed/${id}?rel=0&enablejsapi=1`

  return (
    <VideoContainer display={display.toString()}>
      <VideoFrame
        ref={ref}
        src={embededURL}
        frameBorder="0"
        allowFullScreen
      />
    </VideoContainer>
  )
})

export {
  YoutubeVideo,
}
