import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import ImageHotspots from './ImageHotspots'

import landscape from './landscape.jpg'
import portrait from './portrait.jpg'

const stories = storiesOf('ImagesHotspots', module)

stories.addDecorator(withKnobs)

stories.add('default', () => {
  return (
    <div style={{ width: '100%', height: '90vh' }}>
      <ImageHotspots
        src={text('Image', landscape)}
        alt={text('Alternate text', 'Theatro da Paz')}
      />
    </div>
  )
})

stories.add('landscape image & landscape container', () => {
  return (
    <div style={{ width: '450px', height: '300px' }}>
      <ImageHotspots
        src={text('Image', landscape)}
        alt={text('Alternate text', 'Theatro da Paz')}
      />
    </div>
  )
})

stories.add('landscape image & portrait container', () => {
  return (
    <div style={{ width: '250px', height: '300px' }}>
      <ImageHotspots
        src={text('Image', landscape)}
        alt={text('Alternate text', 'Theatro da Paz')}
      />
    </div>
  )
})

stories.add('portrait image & landscape container', () => {
  return (
    <div style={{ width: '450px', height: '300px' }}>
      <ImageHotspots
        src={text('Image', portrait)}
        alt={text('Alternate text', 'Theatro da Paz')}
      />
    </div>
  )
})

stories.add('portrait image & portrait container', () => {
  return (
    <div style={{ width: '225px', height: '300px' }}>
      <ImageHotspots
        src={text('Image', portrait)}
        alt={text('Alternate text', 'Theatro da Paz')}
      />
    </div>
  )
})
