import React, { Fragment } from 'react'

import { titleCase } from '../utils/transform'

export default ({ tag, thumbnail, body, url, additionalMedia }) => (
  <div id={tag ? tag.name : undefined}>
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

    {additionalMedia && additionalMedia
      .filter(media => media.file.contentType.includes('image'))
      .map(media => (
        <Fragment key={media.id}>
          <img alt="" src={media.file.url} />
          <p>{media.description}</p>
        </Fragment>
      ))
    }
  </div>
)
