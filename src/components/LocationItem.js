import React from 'react'
import PropTypes from 'prop-types'
import { getFormattedDistance } from '../utils'
import './LocationItem.scss'

function LocationItem({ location, distance, closestLocation }) {
  return (
    <div className="location" key={location} data-testid="location-item">
      <div className="location__from">{location}</div>
      <div className="location__distance">{getFormattedDistance(distance)}</div>
      <div className="location__to">{closestLocation}</div>
    </div>
  )
}

LocationItem.propTypes = {
  location: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  closestLocation: PropTypes.string.isRequired
}

export default LocationItem
