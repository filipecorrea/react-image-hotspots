import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'carbon-components-react'
import uuidv1 from 'uuid/v1'
import 'carbon-components/scss/globals/scss/styles.scss'

class Hotspot extends React.Component {
  render () {
    const { x, y, content, offsetX, offsetY, style, icon } = this.props

    const top = offsetY + style.height * y / 100
    const left = offsetX + style.width * x / 100

    const hotspotStyle = {
      position: 'absolute',
      display: 'block',
      top,
      left,
      fontFamily: 'Sans-Serif',
      background: '#fff',
      boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.5)'
    }
    return <div style={hotspotStyle}><Tooltip triggerText='' triggerId={uuidv1()} tooltipId={uuidv1()} iconName={icon}>{content}</Tooltip></div>
  }
}

Hotspot.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  content: PropTypes.element,
  /** This is the name of the carbon icon to render, available icon names are listed here: https://v9.carbondesignsystem.com/guidelines/iconography/library */
  icon: PropTypes.string
}

export default Hotspot
