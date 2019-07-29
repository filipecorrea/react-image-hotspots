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
        orientation: undefined,
        offsetX: undefined,
        offsetY: undefined
      },
      cursorX: undefined,
      cursorY: undefined,
      isDragging: undefined,
      hotspots: []
    }

    this.container = React.createRef()
  }

  componentDidMount = () => {
    const { offsetWidth: width, offsetHeight: height } = this.container.current
    const orientation = (width > height) ? 'landscape' : 'portrait'
    const hotspots = this.props.hotspots

    this.setState({ container: { width, height, orientation }, hotspots })

    window.addEventListener('resize', this.onWindowResize)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.onWindowResize)
  }

  startDrag = (evt) => {
    const cursorX = evt.clientX
    const cursorY = evt.clientY
    this.setState(state => ({
      ...state,
      cursorX,
      cursorY,
      isDragging: true
    }))
    evt.preventDefault()
  }

  whileDrag = (evt) => {
    const { image } = this.state
    const cursorX = evt.clientX
    const cursorY = evt.clientY
    const dx = cursorX - this.state.cursorX
    const dy = cursorY - this.state.cursorY
    const newOffsetX = image.offsetX + dx
    const newOffsetY = image.offsetY + dy
    this.setState(state => ({
      ...state,
      cursorX,
      cursorY,
      image: {
        ...image,
        offsetX: newOffsetX,
        offsetY: newOffsetY
      }
    }))
  }

  stopDrag = () => {
    this.setState(state => ({
      ...state,
      isDragging: false
    }))
  }

  onImageLoad = ({ target: image }) => {
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
        orientation,
        offsetX: 0,
        offsetY: 0
      }
    }))
  }

  onWindowResize = () => {
    this.zoom(this.state.image.scale)
  }

  toggleFullscreen = () => {
    const { fullscreen } = this.state
    if (!fullscreen) {
      this.requestFullscreen(this.container.current)
      this.setState({ fullscreen: true })
    } else {
      this.exitFullscreen()
      this.setState({ fullscreen: false })
    }
  }

  zoom = (scale) => {
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

  requestFullscreen = (element) => {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    }
  }

  exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  }

  render = () => {
    const { src, alt, hotspots, hideFullscreenControl, hideZoomControls, hideHotspots, hideMinimap } = this.props
    const { container, image, fullscreen, isDragging } = this.state
    const imageLoaded = image.initialWidth && image.initialHeight

    const containerStyle = {
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center',
      background: '#eee'
    }

    const imageStyle = {
      position: 'relative',
      left: image.offsetX,
      top: image.offsetY
    }

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

    const minimapStyle = {
      position: 'absolute',
      display: 'block',
      bottom: 10,
      left: 10,
      background: '#fff',
      boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.5)'
    }

    const guideStyle = {
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
      <div
        ref={this.container}
        style={containerStyle}
        onMouseDown={evt => this.startDrag(evt)}
        onMouseMove={evt => {
          if (isDragging) {
            this.whileDrag(evt)
          }
        }}
        onMouseUp={this.stopDrag}
      >
        {
          src &&
          <img
            src={src}
            alt={alt}
            onLoad={this.onImageLoad}
            style={imageStyle}
          />
        }
        {
          !hideHotspots && hotspots &&
          <div style={hotspotsStyle}>
            {
              hotspots.map(({ x, y, content }) => {
                return <Hotspot x={x} y={y} style={hotspotsStyle} offsetX={image.offsetX} offsetY={image.offsetY} content={content} />
              })
            }
          </div>
        }
        {
          !hideFullscreenControl &&
            <div style={topControlsStyle}>
              <button style={buttonStyle} onClick={() => this.toggleFullscreen()}>
                {fullscreen ? 'X' : 'FS'}
              </button>
            </div>
        }
        {
          !hideZoomControls &&
            <>
              <div style={bottomControlsStyle}>
                <button style={buttonStyle} onClick={() => this.zoom(1)}>Fit</button>
                <br />
                <br />
                <button style={buttonStyle} onClick={() => this.zoom(image.scale + 1)}>+</button>
                <br />
                <button style={buttonStyle} onClick={() => this.zoom(image.scale - 1)}>-</button>
              </div>
              {
                !hideMinimap &&
                  <div style={minimapStyle}>
                    { src &&
                    <img src={src} width={minimapStyle.width} height={minimapStyle.height} />
                    }
                    <div style={guideStyle} />
                  </div>
              }
            </>
        }
      </div>
    )
  }
}

ImageHotspots.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  hotspots: PropTypes.array
}

export default ImageHotspots
