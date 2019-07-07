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
    this.zoomToFit = this.zoomToFit.bind(this)
    this.zoomIn = this.zoomIn.bind(this)
    this.zoomOut = this.zoomOut.bind(this)
  }

  render () {
    const { initialWidth, initialHeight, scale, orientation } = this.state

    let imageStyle = {}
    let minimapStyle = {}
    let guideStyle = {}

    if (initialWidth && initialHeight) {
      if (orientation === 'landscape') {
        imageStyle.maxHeight = 100 * scale + 'vh'

        const imageRatio = initialWidth / initialHeight
        minimapStyle.width = 100 * imageRatio + 'px'
        minimapStyle.height = '100px'

        guideStyle.width = (100 * imageRatio) / scale + 'px'
        guideStyle.height = 100 / scale + 'px'
      } else {
        imageStyle.maxWidth = 100 * scale + 'vw'

        const imageRatio = initialWidth / initialHeight
        minimapStyle.width = '100px'
        minimapStyle.height = 100 * imageRatio + 'px'

        guideStyle.width = 100 / scale + 'px'
        guideStyle.height = (100 * imageRatio) / scale + 'px'
      }
    }

    return (
      <div className={styles.container}>
        <img
          src={image}
          ref={this.image}
          onLoad={this.onImageLoad}
          style={imageStyle}
        />
        <div className={styles.controls}>
          <button onClick={this.zoomToFit}>Fit</button>
          <br />
          <button onClick={this.zoomIn}>+</button>
          <br />
          <button onClick={this.zoomOut}>-</button>
        </div>
        <div className={styles.minimap} style={minimapStyle}>
          <div className={styles.guide} style={guideStyle} />
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

  zoomToFit () {
    const { offsetWidth, offsetHeight } = this.image.current
    const { scale } = this.state

    if (scale > 1) {
      this.setState({ scale: 1, offsetWidth, offsetHeight })
    }
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
