import PropTypes from 'prop-types'
import React from 'react'
import './testCSS.css'

const DateHeader = ({ label, drilldownView, onDrillDown }) => {
  if (!drilldownView) {
    return <span>{label}</span>
  }

  return (
    <a href="#" onClick={onDrillDown} className='cell-number'>
      {label}
    </a>
  )
}

DateHeader.propTypes = {
  label: PropTypes.node,
  date: PropTypes.instanceOf(Date),
  drilldownView: PropTypes.string,
  onDrillDown: PropTypes.func,
  isOffRange: PropTypes.bool,
}

export default DateHeader
