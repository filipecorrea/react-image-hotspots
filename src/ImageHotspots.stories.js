import React from 'react'
import { storiesOf } from '@storybook/react'
import ImageHotspots from './ImageHotspots'

import imageFile from './sample.jpeg'

const image = { src: imageFile, alt: 'my image' }

storiesOf('ImageHotspots', module)
  .add('default', () => {
    return (
      <div style={{ width: '400px', height: '300px', padding: 20, background: 'black', display: 'flex' }}>
        <ImageHotspots src={image.src} alt={image.alt} />
      </div>
    )
  })
