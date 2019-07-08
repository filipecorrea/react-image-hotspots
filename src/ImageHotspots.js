import React from 'react'
import styles from './ImageHotspots.module.css'
import sample from './sample.jpeg'

class ImageHotspots extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      container: {
        offsetWidth: undefined,
        offsetHeight: undefined
      },
      image: {
        initialWidth: undefined,
        initialHeight: undefined,
        offsetWidth: undefined,
        offsetHeight: undefined,
        scale: undefined,
        ratio: undefined,
        orientation: undefined
      }
    }

    this.container = React.createRef()
    this.image = React.createRef()

    this.onImageLoad = this.onImageLoad.bind(this)
    this.zoomToFit = this.zoomToFit.bind(this)
    this.zoomIn = this.zoomIn.bind(this)
    this.zoomOut = this.zoomOut.bind(this)
  }

  componentDidMount () {
    const { offsetWidth, offsetHeight } = this.container.current
    this.setState({ container: { offsetWidth, offsetHeight } })
  }

  render () {
    const { container, image } = this.state
    const imageLoaded = image.initialWidth && image.initialHeight
    let imageStyle = {}
    let minimapStyle = {}
    let guideStyle = {}

    if (imageLoaded) {
      if (image.orientation === 'landscape') {
        imageStyle.height = image.offsetHeight

        minimapStyle.width = 100 * image.ratio + 'px'
        minimapStyle.height = 100 + 'px'

        guideStyle.width = (container.offsetWidth > image.offsetWidth)
          ? 100 * image.ratio + 'px'
          : (100 * image.ratio) / (image.offsetWidth / container.offsetWidth) + 'px'
        guideStyle.height = 100 / image.scale + 'px'
      } else {
        imageStyle.width = image.offsetWidth

        minimapStyle.width = 100 + 'px'
        minimapStyle.height = 100 * image.ratio + 'px'

        guideStyle.width = 100 / image.scale + 'px'
        guideStyle.height = (container.offsetHeight > image.offsetHeight)
          ? 100 * image.ratio + 'px'
          : (100 * image.ratio) / (image.offsetHeight / container.offsetHeight) + 'px'
      }
    }

    return (
      <div ref={this.container} className={styles.container}>
        <img
          src={sample}
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
    const { offsetWidth: initialWidth, offsetHeight: initialHeight } = img
    const { container } = this.state
    const ratio = initialWidth / initialHeight
    const orientation = (initialWidth > initialHeight)
      ? 'landscape'
      : 'portrait'

    this.setState((prevState) => ({
      image: {
        ...prevState.image,
        initialWidth,
        initialHeight,
        offsetWidth: (orientation === 'portrait')
          ? container.offsetWidth
          : container.offsetHeight * ratio,
        offsetHeight: (orientation === 'landscape')
          ? container.offsetHeight
          : container.offsetWidth * ratio,
        scale: 1,
        ratio,
        orientation
      }
    }))
  }

  zoomToFit () {
    const { container, image } = this.state
    const offsetWidth = (image.orientation === 'portrait')
      ? container.offsetWidth
      : container.offsetHeight * image.ratio
    const offsetHeight = (image.orientation === 'landscape')
      ? container.offsetHeight
      : container.offsetWidth * image.ratio

    if (image.scale > 1) {
      this.setState((prevState) => ({
        image: {
          ...prevState.image,
          offsetWidth,
          offsetHeight,
          scale: 1
        }
      }))
    }
  }

  zoomIn () {
    const { container, image } = this.state
    const orientation = image.orientation
    const scale = image.scale + 1
    const offsetWidth = (orientation === 'portrait')
      ? container.offsetWidth * scale
      : container.offsetHeight * image.ratio * scale
    const offsetHeight = (orientation === 'landscape')
      ? container.offsetHeight * scale
      : container.offsetWidth * image.ratio * scale

    if (offsetWidth < image.initialWidth && offsetHeight < image.initialHeight) {
      this.setState((prevState) => ({
        image: {
          ...prevState.image,
          offsetWidth,
          offsetHeight,
          scale
        }
      }))
    }
  }

  zoomOut () {
    const { container, image } = this.state
    const orientation = image.orientation
    const scale = image.scale - 1
    const offsetWidth = (orientation === 'portrait')
      ? container.offsetWidth * scale
      : container.offsetHeight * image.ratio * scale
    const offsetHeight = (orientation === 'landscape')
      ? container.offsetHeight * scale
      : container.offsetWidth * image.ratio * scale

    if (image.scale > 1) {
      this.setState((prevState) => ({
        image: {
          ...prevState.image,
          offsetWidth,
          offsetHeight,
          scale
        }
      }))
    }
  }
}

export default ImageHotspots
