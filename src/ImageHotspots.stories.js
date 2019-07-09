import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import ImageHotspots from './ImageHotspots'

import image from './sample.jpeg'

const stories = storiesOf('ImagesHotspots', module)

stories.addDecorator(withKnobs)

stories.add('default', () => {
  return (
    <div style={{ width: '100%', height: '90vh', background: 'black', display: 'flex' }}>
      <ImageHotspots src={text('Image', image)} alt={text('Alternate text', 'Theatro da Paz')} />
    </div>
  )
})
