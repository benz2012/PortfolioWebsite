import React, { Component, Fragment } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

import { Center } from './Layout'
import media, { GALLERY_THUMB_SIZE } from '../utils/media'

const Gallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const SubText = styled.small`
  color: rgba(0, 0, 0, 0.5);
`

const ItemBase = `
  width: ${GALLERY_THUMB_SIZE}px;
  height: ${GALLERY_THUMB_SIZE}px;
  border-radius: 10px;
`

const Item = styled.div`
  ${ItemBase}
  margin: 0 20px 20px 0;

  &:hover {
    cursor: pointer;
    box-shadow: 6px 6px 0 0 ${props => props.color};
  }

  ${media.tablet`
    box-shadow: 6px 6px 0 0 ${props => props.color};
  `}
`

const Thumb = styled(GatsbyImage)`
  ${ItemBase}
  object-fit: cover;
`

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 100;
`

const ModalLayer = styled.div`
  position: relative;
  z-index: 200;
`

const Close = styled.button`
  position: fixed;
  top: 3vh;
  right: 3vh;
  width: 40px;
  height: 40px;
  z-index: 300;
  padding: 0;

  color: white;
  border: 1px solid white;
  border-radius: 20px;
  background: none;
  font-size: 24px;
  line-height: 24px;
  box-shadow: 1px 1px 0px black;

  &:hover {
    cursor: pointer;
    color: black;
    background-color: white;
  }
`

const ModalContent = styled.div`
  position: fixed;
  top: 2vh;
  left: 2vw;
  width: 96vw;
  height: 96vh;
  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`

const ModalImage = styled.img`
  position: relative;
  object-fit: scale-down;
  max-width: 96vw;
  max-height: 90vh;
  margin: 0;
`

const ModalText = styled.p`
  color: white;
  margin: 0;
`

class MediaGallery extends Component {
  state = {
    enlarged: null,
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      this.prev()
    } else if (event.key === 'ArrowRight') {
      this.next()
    }
  }

  enlarge = (event) => {
    this.setState({ enlarged: event.currentTarget.id })
    document.addEventListener('keydown', this.handleKeyDown)
  }

  close = () => {
    this.setState({ enlarged: null })
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  maybeClose = (event) => {
    if (event.target.id === 'click-pass-thru') {
      this.close()
    }
  }

  next = () => {
    const { enlarged } = this.state
    if (enlarged === null) return
    const { media } = this.props

    const interestedIdx = media.findIndex(m => m.id === enlarged)
    let nextIdx = interestedIdx + 1
    if (nextIdx >= media.length) {
      nextIdx = 0
    }
    this.setState({ enlarged: media[nextIdx].id })
  }

  prev = () => {
    const { enlarged } = this.state
    if (enlarged === null) return
    const { media } = this.props

    const interestedIdx = media.findIndex(m => m.id === enlarged)
    let nextIdx = interestedIdx - 1
    if (nextIdx < 0) {
      nextIdx = media.length - 1
    }
    this.setState({ enlarged: media[nextIdx].id })
  }

  render() {
    const { media, color } = this.props
    const { enlarged } = this.state
    const interested = media.find(m => m.id === enlarged)

    return (
      <Fragment>
        <Gallery>
          {media.map(medium => (
            <Item
              key={medium.id}
              id={medium.id}
              color={color}
              role="button"
              onClick={this.enlarge}
            >
              <Thumb
                image={medium.thumbnail}
                color={color}
                title={medium.description}
                alt={medium.description}
              />
            </Item>
          ))}
        </Gallery>

        {media.length > 0 &&
          <Center>
            <SubText>
              <i>click to enlarge</i>
            </SubText>
          </Center>
        }

        {interested &&
          <Fragment>
            <ModalLayer>
              <Close tabIndex="1" onClick={this.close}>&times;</Close>
              <ModalContent id="click-pass-thru" onClick={this.maybeClose}>
                <ModalImage src={interested.image.src} />
                <ModalText>{interested.description}</ModalText>
              </ModalContent>
            </ModalLayer>
            <Backdrop onClick={this.close} />
          </Fragment>
        }
      </Fragment>
    )
  }
}

export default MediaGallery
