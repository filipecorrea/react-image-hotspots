import React from 'react'
import ImageHotspots from './ImageHotspots'
import landscape from './landscape.jpg'
import portrait from './portrait.jpg'

const hotspots = [
  { x: 10, y: 20, content: <span style={{ padding: 10 }}>Hotspot1</span> },
  { x: 50, y: 10, content: <span style={{ padding: 10 }}>Hotspot2</span> },
  { x: 30, y: 40, content: <span style={{ padding: 10 }}>Hotspot3</span> },
  { x: 50, y: 60, content: <span style={{ padding: 10 }}>Hotspot4</span> }
]

export default {
  title: 'Image Hotspots',
  component: ImageHotspots
}

export const Default = (args) => {
  return (
    <div style={{ width: '100%', height: '90vh' }}>
      <ImageHotspots {...args} />
    </div>
  )
}
Default.args = {
  src: landscape,
  alt: 'Sample image',
  hideFullscreenControl: false,
  hideZoomControls: false,
  hotspots: hotspots,
  hideMinimap: false
}

export const LandscapeInLandscape = (args) => {
  return (
    <div style={{ width: '450px', height: '300px' }}>
      <ImageHotspots {...args} />
    </div>
  )
}
LandscapeInLandscape.args = {
  src: landscape,
  alt: 'Sample image',
  hideFullscreenControl: false,
  hideZoomControls: false,
  hotspots: hotspots,
  hideMinimap: false
}

export const LandscapeInPortrait = (args) => {
  return (
    <div style={{ width: '250px', height: '300px' }}>
      <ImageHotspots {...args} />
    </div>
  )
}
LandscapeInPortrait.args = {
  src: landscape,
  alt: 'Sample image',
  hideFullscreenControl: false,
  hideZoomControls: false,
  hotspots: hotspots,
  hideMinimap: false
}

export const PortraitInPortrait = (args) => {
  return (
    <div style={{ width: '250px', height: '300px' }}>
      <ImageHotspots {...args} />
    </div>
  )
}
PortraitInPortrait.args = {
  src: portrait,
  alt: 'Sample image',
  hideFullscreenControl: false,
  hideZoomControls: false,
  hotspots: hotspots,
  hideMinimap: false
}

export const PortraitInLandscape = (args) => {
  return (
    <div style={{ width: '450px', height: '300px' }}>
      <ImageHotspots {...args} />
    </div>
  )
}
PortraitInLandscape.args = {
  src: portrait,
  alt: 'Sample image',
  hideFullscreenControl: false,
  hideZoomControls: false,
  hotspots: hotspots,
  hideMinimap: false
}

export const CustomBackground = (args) => {
  return (
    <div style={{ width: '450px', height: '300px' }}>
      <ImageHotspots {...args} />
    </div>
  )
}
CustomBackground.args = {
  src: portrait,
  alt: 'Sample image',
  background: 'lightGray'
}
