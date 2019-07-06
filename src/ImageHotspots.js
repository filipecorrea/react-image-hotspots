import React from 'react'
import styles from './ImageHotspots.module.css'
import image from './sample.jpeg'

class ImageHotspots extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      initialWidth: undefined,
      initialHeight: undefined,
      orientation: undefined,
      scale: undefined
    }

    this.onImageLoad = this.onImageLoad.bind(this)
  }

  render () {
    let style = {}

    if (this.state.initialWidth) {
      if (this.state.orientation === 'landscape') {
        style.maxHeight = '100vh'
      } else {
        style.maxWidth = '100vw'
      }
    }

    return (
      <div className={styles.container}>
        <img
          src={image}
          onLoad={this.onImageLoad}
          style={style}
        />
      </div>
    )
  }

  onImageLoad ({ target: img }) {
    const orientation = (img.offsetWidth > img.offsetHeight)
      ? 'landscape'
      : 'portrait'

    this.setState({
      initialWidth: img.offsetWidth,
      initialHeight: img.offsetHeight,
      orientation,
      scale: 1
    })
  }
}

export default ImageHotspots
