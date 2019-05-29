import React, { Component, Fragment } from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'

import { YoutubeVideo } from './Video'

const HeroContainer = styled.div`
  position: relative;
`

const HeroImage = styled(Img)`
  display: block;
  margin: 0;
  padding: 0;
`

const HeroClickableBase = `
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 16px 20px;

  display: flex;
  align-items: baseline;

  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px 0 0 0;
  color: rgba(255, 255, 255, 0.75);
  transition: color 0.3s ease, background-color 0.3s ease;

  &:hover {
    cursor: pointer;
    color: rgba(255, 255, 255, 1);
    background-color: rgba(0, 0, 0, 0.9);
  }
`

const HeroButton = styled.div`
  ${HeroClickableBase}
`

const HeroLink = styled.a`
  background: none;
  text-shadow: none;
  ${HeroClickableBase}
`

const ButtonText = styled.b`
  text-transform: uppercase;
  margin-left: 10px;
`

class EmbeddedVideoImage extends Component {
  state = {
    clicked: false,
  }

  frameRef = React.createRef()

  handlePlay = () => {
    if (!this.frameRef.current) return
    this.frameRef.current.contentWindow.postMessage(
      JSON.stringify({
        event: 'command',
        func: 'playVideo',
      }),
      'https://www.youtube.com'
    )
    this.setState({ clicked: true })
  }

  render() {
    const { url, image } = this.props
    const{ clicked } = this.state
    if (!url) { return null }

    const domainMatch = url.toLowerCase().match(/\.(\w+)\.com/)
    if (!domainMatch) { return null }
    const domain = domainMatch[1]

    let Embedded
    switch (domain) {
      case 'youtube':
        Embedded = YoutubeVideo
        break;
      default:
        console.warn(
          'There is no Video Player component for ' +
          `the provided url domain: ${domain}`
        )
    }

    if (!Embedded) { return null }
    return (
      <Fragment>
        <Embedded ref={this.frameRef} url={url} display={clicked} />

        {!clicked &&
          <HeroContainer>
            {image}
            <HeroButton onClick={this.handlePlay}>
              <i className="fas fa-play"></i>
              <ButtonText>Play Video</ButtonText>
            </HeroButton>
          </HeroContainer>
        }
      </Fragment>

    )
  }
}

const ExternalLinkImage = ({ image, url, icon, action }) => {
  return (
    <HeroContainer>
      {image}
      {url &&
        <HeroLink
          target="_blank"
          rel="noopener"
          href={url}
        >
          <i className={`fas fa-${icon}`}></i>
          <ButtonText>{action}</ButtonText>
        </HeroLink>
      }
    </HeroContainer>
  )
}

export {
  HeroContainer,
  HeroImage,
  HeroButton,
  ButtonText,

  EmbeddedVideoImage,
  ExternalLinkImage,
}
