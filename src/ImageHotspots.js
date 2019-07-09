import React from 'react'

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

    const containerStyle = {
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center'
    }

    let imageStyle = {}

    const controlsStyle = {
      position: 'absolute',
      bottom: 0,
      right: 0
    }

    let minimapStyle = {
      position: 'absolute',
      display: 'block',
      bottom: 0,
      left: 0,
      background: '#fff'
    }

    let guideStyle = {
      position: 'absolute',
      display: 'block',
      top: 0,
      left: 0,
      background: '#ccc'
    }

    if (imageLoaded) {
      if (image.orientation === 'landscape') {
        imageStyle.width = image.width
      } else {
        imageStyle.height = image.height
      }
      minimapStyle.width = 100 * image.ratio
      minimapStyle.height = 100
      guideStyle.width = (container.width > image.width)
        ? 100 * image.ratio
        : (100 * image.ratio) / (image.width / container.width)
      guideStyle.height = 100 / image.scale
    }

    return (
      <div ref={this.container} style={containerStyle}>
        <img src={src} alt={alt} onLoad={this.onImageLoad} style={imageStyle} />
        <div style={controlsStyle}>
          <button onClick={() => this.zoom(1)}>Fit</button>
          <br />
          <button onClick={() => this.zoom(image.scale + 1)}>+</button>
          <br />
          <button onClick={() => this.zoom(image.scale - 1)}>-</button>
        </div>
        <div style={minimapStyle}>
          <div style={guideStyle} />
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
        width: (orientation === 'landscape')
          ? container.width
          : container.height / ratio,
        height: (orientation === 'landscape')
          ? container.width / ratio
          : container.height,
        scale: 1,
        ratio,
        orientation
      }
    }))
  }

  zoom (scale) {
    if (scale > 0) {
      const { container, image } = this.state
      const width = (image.orientation === 'landscape')
        ? container.width * scale
        : container.height * image.ratio * scale
      const height = (image.orientation === 'landscape')
        ? container.width * image.ratio / scale
        : container.height * scale

      if (width < image.initialWidth && height < image.initialHeight) {
        this.setState((prevState) => ({
          image: { ...prevState.image, width, height, scale }
        }))
      }
    }
  }
}

export default ImageHotspots
