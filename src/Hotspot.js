import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'carbon-components-react'
import uuidv1 from 'uuid/v1'
import 'carbon-components/scss/globals/scss/styles.scss'

class Hotspot extends React.Component {
  render () {
    const { x, y, content, icon } = this.props

    const hotspotStyle = {
      position: 'absolute',
      top: x + '%',
      left: y + '%',
      fontFamily: 'Sans-Serif'
    }
    return <div style={hotspotStyle}><Tooltip triggerText='' triggerId={uuidv1()} tooltipId={uuidv1()} iconName={icon}>{content}</Tooltip></div>
  }
}

Hotspot.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  content: PropTypes.element,
  icon: PropTypes.string
}

export default Hotspot
