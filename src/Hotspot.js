import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip, Icon } from 'carbon-components-react'
import uuidv1 from 'uuid/v1'
import 'carbon-components/scss/globals/scss/styles.scss'

class Hotspot extends React.Component {
  render () {
    const { x, y, content, icon, color, width, height } = this.props

    const hotspotStyle = {
      position: 'absolute',
      top: y + '%',
      left: x + '%',
      fontFamily: 'Sans-Serif'
    }
    return <div style={hotspotStyle}><Tooltip triggerText={<Icon fill={color} name={icon} width={width} height={height} />} showIcon={false} clickToOpen triggerId={uuidv1()} tooltipId={uuidv1()}>{content}</Tooltip></div>
  }
}

Hotspot.propTypes = {
  /** percentage from the left of the image to show this hotspot */
  x: PropTypes.number,
  /** percentage from the top of the image to show this hotspot */
  y: PropTypes.number,
  /** the content of the hotspot */
  content: PropTypes.element,
  /** points to the name of a carbon icon that will trigger the hotspot (see https://v9.carbondesignsystem.com/guidelines/iconography/library) */
  icon: PropTypes.string,
  /** color of the hotspot */
  color: PropTypes.string,
  /** width of the hotspot */
  width: PropTypes.number,
  /** height of the hotspot */
  height: PropTypes.number
}

export default Hotspot
