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
        ratio: undefined,
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
      minimap: {
        offsetX: 0,
        offsetY: 0,
        width: undefined,
        height: undefined
      },
      hideFullscreenControl: false,
      hideZoomControls: false,
      hideHotspots: false,
      hideMinimap: false,
      resizable: undefined,
      draggable: undefined,
      cursorX: undefined,
      cursorY: undefined,
      mcursorX: undefined,
      mcursorY: undefined,
      dragging: undefined,
      isGuideDragging: undefined,
      hotspots: []
    }

    this.container = React.createRef()
  }

  componentDidMount = () => {
    const {
      hideFullscreenControl,
      hideZoomControls,
      hideHotspots,
      hideMinimap,
      hotspots
    } = this.props
    const { offsetWidth: width, offsetHeight: height } = this.container.current
    const orientation = (width > height) ? 'landscape' : 'portrait'
    const ratio = (orientation === 'landscape') ? width / height : height / width

    this.setState({
      container: { width, height, ratio, orientation },
      hideFullscreenControl,
      hideZoomControls,
      hideHotspots,
      hideMinimap,
      hotspots
    })

    window.addEventListener('resize', this.onWindowResize)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.onWindowResize)
  }

  startDrag = (event, element) => {
    const cursorX = event.clientX
    const cursorY = event.clientY
    if (element === 'image') {
      this.setState(state => ({
        ...state,
        cursorX,
        cursorY,
        dragging: true
      }))
    } else if (element === 'guide') {
      this.setState(state => ({
        ...state,
        mcursorX: cursorX,
        mcursorY: cursorY,
        isGuideDragging: true
      }))
    }
    event.preventDefault()
  }

  whileDrag = (event) => {
    const { image } = this.state
    const cursorX = event.clientX
    const cursorY = event.clientY
    const deltaX = cursorX - this.state.cursorX
    const deltaY = cursorY - this.state.cursorY
    const newOffsetX = image.offsetX + deltaX
    const newOffsetY = image.offsetY + deltaY

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
    const { container, image } = this.state
    console.log('---')
    console.log('container:', container.width, container.height)
    console.log('image:', image.width, image.height)
    console.log('offset:', image.imageOffsetX, image.offsetY)

    const offsetXMax = (container.orientation === image.orientation)
      ? -Math.abs(image.width - container.width)
      : -Math.abs(container.width - image.width)

    // const offsetXMax = container.orientation === orientation
    //   ? orientation === 'landscape'
    //     ? image.width >= container.width
    //       ? container.width // landscape image bigger than landscape container
    //       : container.height * ratio // landscape image smaller than landscape container
    //     : image.height >= container.height
    //       ? container.height / ratio // portrait image bigger than portrait container
    //       : container.width // portrait image smaller than portrait container
    //   : orientation === 'landscape'
    //     ? container.width // landscape image and portrait container
    //     : container.height / ratio // portrait image and landscape container
    
    const offsetYMax = (container.orientation === image.orientation)
      ? -Math.abs(container.height - image.height)
      : -Math.abs(image.height - container.height)
    
    
    console.log('offsetMax', offsetXMax, offsetYMax)

    this.setState(state => ({
      ...state,
      image: {
        ...state.image,
        offsetX: (image.offsetX >= 0) 
          ? 0
          : (container.width - image.width - image.offsetX >= 0)
            ? offsetXMax
            : image.offsetX,
        offsetY: (image.offsetY >= 0) 
          ? 0
          : (container.height - image.height - image.offsetY >= 0)
            ? offsetYMax
            : image.offsetY
      },
      dragging: false
    }))
  }

  onImageLoad = ({ target: image }) => {
    const { offsetWidth: initialWidth, offsetHeight: initialHeight } = image
    const { container, hideZoomControls, hideMinimap } = this.state
    const orientation = (initialWidth > initialHeight) ? 'landscape' : 'portrait'
    const ratio = (orientation === 'landscape')
      ? initialWidth / initialHeight
      : initialHeight / initialWidth

    // console.log('container.ratio', container.ratio)
    // console.log('image.ratio', ratio)

    const width = container.orientation === orientation
      ? orientation === 'landscape'
        ? image.width >= container.width
          ? container.width // landscape image bigger than landscape container
          : container.height * ratio // landscape image smaller than landscape container
        : image.height >= container.height
          ? container.height / ratio // portrait image bigger than portrait container
          : container.width // portrait image smaller than portrait container
      : orientation === 'landscape'
        ? container.width // landscape image and portrait container
        : container.height / ratio // portrait image and landscape container
    
    // console.log('width:', width)
    const height = container.orientation === orientation
      ? orientation === 'landscape'
        ? image.width >= container.width
          ? container.width / ratio // landscape image bigger than landscape container
          : container.height // landscape image smaller than landscape container
        : image.height >= container.height
          ? container.height // portrait image bigger than portrait container
          : container.width * ratio // portrait image smaller than portrait container
      : orientation === 'landscape'
        ? container.width / ratio // landscape image and portrait container
        : container.height // portrait image and landscape container
    
    // console.log('height:', height)
    const resizable = (initialWidth > width) || (initialHeight > height)

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
      },
      hideZoomControls: hideZoomControls || !resizable,
      hideMinimap: hideMinimap || !resizable,
      resizable,
      draggable: false
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
      // const width = (container.orientation === 'landscape')
      //   ? container.height * image.ratio * scale
      //   : container.width * scale
      const width = container.orientation === image.orientation
        ? image.orientation === 'landscape'
          ? image.width >= container.width
            ? container.width * scale// landscape image bigger than landscape container
            : container.height * image.ratio * scale// landscape image smaller than landscape container
          : image.height >= container.height
            ? container.height / image.ratio * scale// portrait image bigger than portrait container
            : container.width * scale// portrait image smaller than portrait container
        : image.orientation === 'landscape'
          ? container.width * scale// landscape image and portrait container
          : container.height / image.ratio * scale// portrait image and landscape container

      
      // const height = (container.orientation === 'landscape')
      //   ? container.height * scale
      //   : container.width * image.ratio * scale

      const height = container.orientation === image.orientation
        ? image.orientation === 'landscape'
          ? image.width >= container.width
            ? container.width / image.ratio  * scale// landscape image bigger than landscape container
            : container.height  * scale// landscape image smaller than landscape container
          : image.height >= container.height
            ? container.height  * scale// portrait image bigger than portrait container
            : container.width * image.ratio  * scale// portrait image smaller than portrait container
        : image.orientation === 'landscape'
          ? container.width / image.ratio  * scale// landscape image and portrait container
          : container.height  * scale// portrait image and landscape container

      if (image.initialWidth > width && image.initialHeight > height) {
        this.setState((prevState) => ({
          image: {
            ...prevState.image,
            width,
            height,
            scale
          },
          draggable: scale > 1
        }))
      }
      // Reset image position
      if (scale === 1) {
        this.setState((prevState) => ({
          image: {
            ...prevState.image,
            offsetX: 0,
            offsetY: 0
          }
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

  whileDragGuide = (evt, guideStyle, minimapStyle) => {
    const { minimap, image } = this.state
    const cursorX = evt.clientX
    const cursorY = evt.clientY
    const dx = cursorX - this.state.mcursorX
    const dy = cursorY - this.state.mcursorY
    const newOffsetX = minimap.offsetX + dx
    const newOffsetY = minimap.offsetY + dy

    const ratio = (minimapStyle.width * minimapStyle.height) / (guideStyle.width * guideStyle.height)
    // 1. Calculate new offsetX and offsetY for an image and set the state
    // partially working
    let imageOffsetX
    let imageOffsetY
    if (image.orientation === 'landscape') {
      imageOffsetX = newOffsetX * image.scale * image.ratio * ratio * -1
      imageOffsetY = newOffsetY * image.scale * image.ratio * ratio * -1
    } else {
      imageOffsetX = newOffsetX * image.scale * image.ratio * ratio * -1
      imageOffsetY = newOffsetY * image.scale * image.ratio * ratio * -1
    }

    // 2. Set the boundary for the guide
    // not working
    const minBoundX = minimapStyle.left
    const minBoundY = minimapStyle.bottom

    const maxBoundX = minimapStyle.left + minimapStyle.width
    const maxBoundY = minimapStyle.bottom + minimapStyle.height

    const guideOffsetX = Math.max(minBoundX, Math.min(newOffsetX, maxBoundX)) + 'px'
    const guideOffsetY = Math.max(minBoundY, Math.min(newOffsetY, maxBoundY)) + 'px'

    this.setState(state => ({
      ...state,
      mcursorX: cursorX,
      mcursorY: cursorY,
      image: {
        ...image,
        offsetX: imageOffsetX,
        offsetY: imageOffsetY
      },
      minimap: {
        offsetX: newOffsetX, // guideOffsetX,
        offsetY: newOffsetY // guideOffsetY
      }
    }))
  }

  stopDragGuide = () => {
    this.setState(state => ({
      ...state,
      isGuideDragging: undefined
    }))
  }

  render = () => {
    // console.log('render', this.state)

    const { src, alt, hotspots } = this.props
    const {
      container,
      image,
      minimap,
      fullscreen,
      dragging,
      isGuideDragging,
      hideFullscreenControl,
      hideZoomControls,
      hideHotspots,
      hideMinimap,
      draggable
    } = this.state
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
      margin: 'auto',
      pointerEvents: 'none'
    }

    const topControlsStyle = {
      position: 'absolute',
      top: 10,
      right: 10,
      pointerEvents: this.state.dragging ? 'none' : 'auto'
    }

    const bottomControlsStyle = {
      position: 'absolute',
      bottom: 10,
      right: 10,
      pointerEvents: this.state.dragging ? 'none' : 'auto'
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
      left: minimap.offsetX,
      top: minimap.offsetY,
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
      <div ref={this.container} style={containerStyle} onMouseOut={this.stopDrag}>
        {
          src &&
          <img
            src={src}
            alt={alt}
            onLoad={this.onImageLoad}
            style={imageStyle}
            onMouseDown={evt =>{
              if (draggable && !hideZoomControls) {
                this.startDrag(evt, 'image')
              }
            }}
            onMouseMove={evt => {
              if (!hideZoomControls && dragging) {
                this.whileDrag(evt)
              }
            }}
            onMouseUp={this.stopDrag}
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
                    <div style={guideStyle} onMouseDown={evt => this.startDrag(evt, 'guide')}
                      onMouseMove={evt => {
                        if (isGuideDragging) {
                          this.whileDragGuide(evt, guideStyle, minimapStyle)
                        }
                      }}
                      onMouseUp={this.stopDragGuide} />
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
