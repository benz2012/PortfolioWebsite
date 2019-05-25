import React from 'react'

import MediaGallery from './MediaGallery'
import { HeroImage, EmbeddedVideoImage } from './SectionHero'
import { titleCase } from '../utils/transform'

const Section = ({
  tag = undefined, thumbnail, body, url, color,
  additionalMedia, hideTitle,
}) => {
  const sectionType = tag.name

  let sectionHero = thumbnail && (
    <HeroImage alt="" src={thumbnail.file.url} />
  )
  switch (sectionType) {
    case 'video':
    case 'animation':
      sectionHero = <EmbeddedVideoImage url={url} image={sectionHero} />
      break;
    case 'sound':
    case 'music':
      // TODO: create component for audio
      // sectionHero = <EmbeddedAudioImage url={url} />
      break;
    case 'code':
    case 'mobile':
    case 'web':
      // sectionHero = <ExternalLinkImage url={url} />
      break;
    default:
      break;
  }

  const galleryData = additionalMedia ? (
    additionalMedia
      .filter(media => media.file.contentType.includes('image'))
      .map(({ id, description, ...rest }) => ({
        id,
        description,
        thumb: rest.file.url
      }))
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

export default Section
