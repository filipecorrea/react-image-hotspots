import React from 'react'
import styles from './ImageHotspots.module.css'

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

    this.onImageLoad = this.onImageLoad.bind(this)
    this.zoom = this.zoom.bind(this)
  }

  componentDidMount () {
    const { offsetWidth: width, offsetHeight: height } = this.container.current

    this.setState({ container: { width, height } })
  }

  render () {
    const { src, alt } = this.props
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
        <img src={src} alt={alt} onLoad={this.onImageLoad} style={imageStyle} />
        <div className={styles.controls}>
          <button onClick={() => this.zoom(1)}>Fit</button>
          <br />
          <button onClick={() => this.zoom(image.scale + 1)}>+</button>
          <br />
          <button onClick={() => this.zoom(image.scale - 1)}>-</button>
        </div>
        <div className={styles.minimap} style={minimapStyle}>
          <div className={styles.guide} style={guideStyle} />
        </div>
      </div>
    )
  }

  onImageLoad ({ target: image }) {
    const { offsetWidth: initialWidth, offsetHeight: initialHeight } = image
    const { container } = this.state
    const ratio = initialWidth / initialHeight
    const orientation = (initialWidth > initialHeight) ? 'landscape' : 'portrait'

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

  zoom (scale) {
    if (scale > 0) {
      const { container, image } = this.state
      const width = (image.orientation === 'portrait')
        ? container.width * scale
        : container.height * image.ratio * scale
      const height = (image.orientation === 'landscape')
        ? container.height * scale
        : container.width * image.ratio * scale

      if (width < image.initialWidth && height < image.initialHeight) {
        this.setState((prevState) => ({
          image: { ...prevState.image, width, height, scale }
        }))
      }
    }
  }
}

export default ImageHotspots
