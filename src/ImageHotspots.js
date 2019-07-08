import React from 'react'
import styles from './ImageHotspots.module.css'
import sample from './sample.jpeg'

class ImageHotspots extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      container: {
        width: undefined,
        height: undefined
      },
      image: {
        initialWidth: undefined,
        initialHeight: undefined,
        width: undefined,
        height: undefined,
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

    this.setState({
      container: {
        width: offsetWidth,
        height: offsetHeight
      }
    })
  }

  render () {
    const { container, image } = this.state
    const imageLoaded = image.initialWidth && image.initialHeight
    let imageStyle = {}
    let minimapStyle = {}
    let guideStyle = {}

    if (imageLoaded) {
      if (image.orientation === 'landscape') {
        imageStyle.height = image.height

        minimapStyle.width = 100 * image.ratio + 'px'
        minimapStyle.height = 100 + 'px'

        guideStyle.width = (container.width > image.width)
          ? 100 * image.ratio + 'px'
          : (100 * image.ratio) / (image.width / container.width) + 'px'
        guideStyle.height = 100 / image.scale + 'px'
      } else {
        imageStyle.width = image.width

        minimapStyle.width = 100 + 'px'
        minimapStyle.height = 100 * image.ratio + 'px'

        guideStyle.width = 100 / image.scale + 'px'
        guideStyle.height = (container.height > image.height)
          ? 100 * image.ratio + 'px'
          : (100 * image.ratio) / (image.height / container.height) + 'px'
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
        width: (orientation === 'portrait')
          ? container.width
          : container.height * ratio,
        height: (orientation === 'landscape')
          ? container.height
          : container.width * ratio,
        scale: 1,
        ratio,
        orientation
      }
    }))
  }

  zoomToFit () {
    const { container, image } = this.state
    const width = (image.orientation === 'portrait')
      ? container.width
      : container.height * image.ratio
    const height = (image.orientation === 'landscape')
      ? container.height
      : container.width * image.ratio

    if (image.scale > 1) {
      this.setState((prevState) => ({
        image: {
          ...prevState.image,
          width,
          height,
          scale: 1
        }
      }))
    }
  }

  zoomIn () {
    const { container, image } = this.state
    const orientation = image.orientation
    const scale = image.scale + 1
    const width = (orientation === 'portrait')
      ? container.width * scale
      : container.height * image.ratio * scale
    const height = (orientation === 'landscape')
      ? container.height * scale
      : container.width * image.ratio * scale

    if (width < image.initialWidth && height < image.initialHeight) {
      this.setState((prevState) => ({
        image: {
          ...prevState.image,
          width,
          height,
          scale
        }
      }))
    }
  }

  zoomOut () {
    const { container, image } = this.state
    const orientation = image.orientation
    const scale = image.scale - 1
    const width = (orientation === 'portrait')
      ? container.width * scale
      : container.height * image.ratio * scale
    const height = (orientation === 'landscape')
      ? container.height * scale
      : container.width * image.ratio * scale

    if (image.scale > 1) {
      this.setState((prevState) => ({
        image: {
          ...prevState.image,
          width,
          height,
          scale
        }
      }))
    }
  }
}

export default ImageHotspots
