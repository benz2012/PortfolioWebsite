import React from 'react'
import styled from 'styled-components'

import MediaGallery from './MediaGallery'
import { Center } from './Layout'
import { titleCase } from '../utils/transform'

const SubText = styled.small`
  color: rgba(0, 0, 0, 0.5);
`

export default ({
  tag, thumbnail, body, url, color, additionalMedia,
}) => {
  const sectionId = tag ? tag.name : undefined
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
    <div id={sectionId}>
      {tag && <h3>{titleCase(tag.name)}</h3>}

      {thumbnail && <img alt="" src={thumbnail.file.url} />}

      {body &&
        <div
          dangerouslySetInnerHTML={{
            __html: body.childMarkdownRemark.html
          }}
        />
      }

      <p><a href={url}>{url}</a></p>

      <MediaGallery
        media={galleryData}
        color={color}
      />
      {galleryData.length > 0 &&
        <Center>
          <SubText>
            <i>click to enlarge</i>
          </SubText>
        </Center>
      }
    </div>
  )
}
