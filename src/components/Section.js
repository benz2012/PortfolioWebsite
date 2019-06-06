import React, { Component } from 'react'

import MediaGallery from './MediaGallery'
import { HeroImage, EmbeddedVideoImage, ExternalLinkImage } from './SectionHero'
import { titleCase } from '../utils/transform'

class Section extends Component {
  componentDidMount() {
    const links = document.querySelectorAll('.markdown-body a')
    const external = Array.from(links)
      .filter(link => link.hostname !== window.location.hostname)
    external.forEach((link) => {
      link.setAttribute('target', '_blank')
      link.setAttribute('rel', 'noopener')
    })
  }

  render() {
    const { tag = undefined, thumbnail, body, url, color,
      additionalMedia, hideTitle } = this.props

    const sectionType = tag.name

    let sectionHero = thumbnail && (
      <HeroImage fluid={thumbnail.fluid} />
    )

    if (['video', 'animation', 'product'].includes(sectionType)) {
      sectionHero = <EmbeddedVideoImage url={url} image={sectionHero} />
    } else if (['sound', 'music'].includes(sectionType)) {
      // TODO: create component for audio
      // sectionHero = <EmbeddedAudioImage url={url} />
    } else if (['code', 'mobile', 'web'].includes(sectionType)) {
      let icon
      let action
      switch (sectionType) {
        /* eslint default-case: 0 */
        case 'code':
          icon = 'code'
          action = 'View Code'
          break;
        case 'mobile':
          icon='mobile-alt'
          action='Download App'
          break;
        case 'web':
          icon='globe'
          action='Visit Website'
          break;
      }

      sectionHero = (
        <ExternalLinkImage
          icon={icon}
          action={action}
          url={url}
          image={sectionHero}
        />
      )
    }

    const galleryData = additionalMedia ? (
      additionalMedia.filter(media => media.file.contentType.includes('image'))
    ) : (
      []
    )

    return (
      <section id={sectionType}>
        {!hideTitle &&
          <h3>{titleCase(sectionType)}</h3>
        }

        {sectionHero}

        {body &&
          <div
            className="markdown-body"
            style={{ marginTop: '1rem' }}
            dangerouslySetInnerHTML={{
              __html: body.childMarkdownRemark.html
            }}
          />
        }

        <MediaGallery media={galleryData} color={color} />
      </section>
    )
  }
}

export default Section
