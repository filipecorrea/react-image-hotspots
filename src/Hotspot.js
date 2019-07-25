import React from 'react'
import PropTypes from 'prop-types'

class Hotspot extends React.Component {
  render () {
    const { x, y, content, offsetX, offsetY, style } = this.props

    const top = offsetY + style.height * y / 100
    const left = offsetX + style.width * x / 100
    const hotspotStyle = {
      position: 'absolute',
      display: 'block',
      top: top + 'px',
      left: left + 'px',
      fontFamily: 'Sans-Serif',
      background: '#fff',
      boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.5)'
    }
    return <div style={hotspotStyle}>{content}</div>
  }
}

Hotspot.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  content: PropTypes.element
}

export default Hotspot
