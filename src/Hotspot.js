import React from 'react'
import PropTypes from 'prop-types'

class Hotspot extends React.Component {
  render () {
    const { x, y, content, style = {
      fontFamily: 'Sans-Serif',
      background: 'white',
      boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.5)',
      pointerEvents: 'auto'
    }} = this.props

    const hotspotStyle = Object.assign({
      position: 'absolute',
      display: 'block',
      top: y + '%',
      left: x + '%',
    }, style);

    return <div style={hotspotStyle}>{ content }</div>
  }
}

Hotspot.propTypes = {
  /** percentage from the left of the image to show this hotspot */
  x: PropTypes.number,
  /** percentage from the top of the image to show this hotspot */
  y: PropTypes.number,
  /** the content of the hotspot */
  content: PropTypes.element,
  /** the style of the hotspot */
  style: PropTypes.object
}

export default Hotspot
