import React from 'react'
import styles from './ImageHotspots.module.css'
import image from './sample.jpeg'

class ImageHotspots extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      initialWidth: undefined,
      initialHeight: undefined,
      offsetWidth: undefined,
      offsetHeight: undefined,
      scale: undefined,
      orientation: undefined
    }

    this.image = React.createRef()

    this.onImageLoad = this.onImageLoad.bind(this)
    this.zoomIn = this.zoomIn.bind(this)
    this.zoomOut = this.zoomOut.bind(this)
  }

  render () {
    const { initialWidth, initialHeight, scale, orientation } = this.state
    let style = {}

    if (initialWidth && initialHeight) {
      if (orientation === 'landscape') {
        style.maxHeight = scale * 100 + 'vh'
      } else {
        style.maxWidth = scale * 100 + 'vw'
      }
    }

    return (
      <div className={styles.container}>
        <img
          src={image}
          ref={this.image}
          onLoad={this.onImageLoad}
          style={style}
        />
        <div className={styles.controls}>
          <button onClick={this.zoomIn}>+</button>
          <br />
          <button onClick={this.zoomOut}>-</button>
        </div>
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

  zoomIn () {
    const { offsetWidth, offsetHeight } = this.image.current
    const { initialWidth, initialHeight, scale } = this.state

    if (offsetWidth < initialWidth && offsetHeight < initialHeight) {
      this.setState({ scale: scale + 1, offsetWidth, offsetHeight })
    }
  }

  zoomOut () {
    const { offsetWidth, offsetHeight } = this.image.current
    const { scale } = this.state

    if (this.state.scale > 1) {
      this.setState({ scale: scale - 1, offsetWidth, offsetHeight })
    }
  }
}

export default ImageHotspots
