import React from 'react'

class ImageHotspots extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      container: {
        width: undefined,
        height: undefined,
        orientation: undefined
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
    const orientation = (width > height) ? 'landscape' : 'portrait'

    this.setState({ container: { width, height, orientation } })
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
      textAlign: 'center',
      background: '#eee'
    }

    let imageStyle = {}

    const controlsStyle = {
      position: 'absolute',
      bottom: 10,
      right: 10
    }

    const buttonStyle = {
      width: '25px',
      height: '25px',
      border: 'none',
      background: '#fff',
      boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.5)'
    }

    let minimapStyle = {
      position: 'absolute',
      display: 'block',
      bottom: 10,
      left: 10,
      background: '#fff',
      boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.5)'
    }

    let guideStyle = {
      position: 'absolute',
      display: 'block',
      top: 0,
      left: 0,
      border: '1px solid rgba(64, 139, 252, 0.8)',
      background: 'rgba(64, 139, 252, 0.1)'
    }

    if (imageLoaded) {
      if (container.orientation === 'landscape') {
        imageStyle.height = image.height
      } else {
        imageStyle.width = image.width
      }

      if (image.orientation === 'landscape') {
        minimapStyle.width = 100 * image.ratio
        minimapStyle.height = 100

        guideStyle.width = (container.width >= image.width)
          ? 100 * image.ratio
          : (100 * image.ratio) / (image.width / container.width)
        guideStyle.height = 100 / image.scale
      } else {
        minimapStyle.width = 100
        minimapStyle.height = 100 * image.ratio

        guideStyle.width = (container.width >= image.width)
          ? 100
          : 100 / (image.width / container.width)
        guideStyle.height = 100 * image.ratio / image.scale
      }
    }

    return (
      <div ref={this.container} style={containerStyle}>
        <img src={src} alt={alt} onLoad={this.onImageLoad} style={imageStyle} />
        <div style={controlsStyle}>
          <button style={buttonStyle} onClick={() => this.zoom(1)}>Fit</button>
          <br />
          <br />
          <button style={buttonStyle} onClick={() => this.zoom(image.scale + 1)}>+</button>
          <br />
          <button style={buttonStyle} onClick={() => this.zoom(image.scale - 1)}>-</button>
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
    const orientation = (initialWidth > initialHeight) ? 'landscape' : 'portrait'
    const ratio = (orientation === 'landscape') ? initialWidth / initialHeight : initialHeight / initialWidth

    this.setState((prevState) => ({
      image: {
        ...prevState.image,
        initialWidth,
        initialHeight,
        width: (container.orientation === 'landscape')
          ? container.height * ratio
          : container.width,
        height: (container.orientation === 'landscape')
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
      const width = (container.orientation === 'landscape')
        ? container.height * image.ratio * scale
        : container.width * scale
      const height = (container.orientation === 'landscape')
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
