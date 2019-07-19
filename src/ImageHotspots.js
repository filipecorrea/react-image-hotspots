import React from 'react'
import PropTypes from 'prop-types'
import Hotspot from './Hotspot'

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
      },
      hotspots: []
    }

    this.container = React.createRef()

    this.onImageLoad = this.onImageLoad.bind(this)
    this.toggleFullscreen = this.toggleFullscreen.bind(this)
    this.onWindowResize = this.onWindowResize.bind(this)
    this.zoom = this.zoom.bind(this)
  }

  componentDidMount () {
    const { offsetWidth: width, offsetHeight: height } = this.container.current
    const orientation = (width > height) ? 'landscape' : 'portrait'
    const hotspots = this.props.hotspots

    this.setState({ container: { width, height, orientation }, hotspots })

    window.addEventListener('resize', this.onWindowResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onWindowResize)
  }

  render () {
    const { src, alt, hotspots, hideControls, hideHotspots } = this.props
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

    const hotspotsStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      margin: 'auto'
    }

    const topControlsStyle = {
      position: 'absolute',
      top: 10,
      right: 10
    }

    const bottomControlsStyle = {
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
        hotspotsStyle.height = image.width / image.ratio
        hotspotsStyle.width = image.width

        minimapStyle.width = 100 * image.ratio
        minimapStyle.height = 100

        guideStyle.width = (container.width >= image.width)
          ? 100 * image.ratio
          : (100 * image.ratio) / (image.width / container.width)
        guideStyle.height = 100 / image.scale
      } else {
        hotspotsStyle.height = image.height
        hotspotsStyle.width = image.height / image.ratio

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
        {
          !hideHotspots && hotspots &&
            <div style={hotspotsStyle}>
              {
                hotspots.map(({ x, y, content }) => {
                  return <Hotspot x={x} y={y} content={content} />
                })
              }
            </div>
        }
        {
          !hideControls &&
          <>
            <div style={topControlsStyle}>
              <button style={buttonStyle} onClick={() => this.toggleFullscreen()}>FS</button>
            </div>
            <div style={bottomControlsStyle}>
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
          </>
        }
      </div>
    )
  }

  onImageLoad ({ target: image }) {
    const { offsetWidth: initialWidth, offsetHeight: initialHeight } = image
    const { container } = this.state
    const orientation = (initialWidth > initialHeight) ? 'landscape' : 'portrait'
    const ratio = (orientation === 'landscape') ? initialWidth / initialHeight : initialHeight / initialWidth
    const width = (container.orientation === 'landscape')
      ? container.height * ratio
      : container.width
    const height = (container.orientation === 'landscape')
      ? container.height
      : container.width * ratio

    this.setState((prevState) => ({
      image: {
        ...prevState.image,
        initialWidth,
        initialHeight,
        width,
        height,
        scale: 1,
        ratio,
        orientation
      }
    }))
  }

  onWindowResize () {
    this.zoom(this.state.image.scale)
  }

  toggleFullscreen () {
    var container = document.getElementById('root')
    container.requestFullscreen()
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

ImageHotspots.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  hotspots: PropTypes.array
}

export default ImageHotspots
