import React from 'react'
import styles from './ImageHotspots.module.css'
import image from './sample.jpeg'

class ImageHotspots extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      initialWidth: undefined,
      initialHeight: undefined,
      orientation: undefined,
      scale: undefined
    }

    this.onImageLoad = this.onImageLoad.bind(this)
    this.zoomIn = this.zoomIn.bind(this)
    this.zoomOut = this.zoomOut.bind(this)
  }

  render () {
    let style = {}

    if (this.state.initialWidth) {
      if (this.state.orientation === 'landscape') {
        style.maxHeight = this.state.scale * 100 + 'vh'
      } else {
        style.maxWidth = this.state.scale * 100 + 'vw'
      }
    }

    return (
      <div className={styles.container}>
        <img
          src={image}
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
    this.setState({ scale: this.state.scale + 1 })
  }

  zoomOut () {
    if (this.state.scale > 1) {
      this.setState({ scale: this.state.scale - 1 })
    }
  }
}

export default ImageHotspots
