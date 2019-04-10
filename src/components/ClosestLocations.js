import React, { useState } from 'react'
import queryString from 'query-string'
import Loader from 'react-loader-spinner'
import LocationItem from './LocationItem'
import './ClosestLocations.scss'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

function ClosestLocations() {
  const [loading, setLoading] = useState(false)
  const [locationNames, setLocationNames] = useState([])
  const [locations, setLocations] = useState([])
  const [error, setError] = useState('')

  async function fetchClosestLocations() {
    if (locationNames.length > 0) {
      setLoading(true)
      const response = await fetch(
        `${API_BASE_URL}/closest-locations?${queryString.stringify({
          locations: locationNames
        })}`
      )
      const responseText = await response.text()
      try {
        const newLocations = JSON.parse(responseText)
        setLocations(newLocations)
        setError('')
      } catch (e) {
        setLocations([])
        setError(responseText)
      }
      setLoading(false)
    } else {
      setLocations([])
    }
  }

  return (
    <div className="closest-locations">
      <h3>Closest Location Calculator</h3>
      <textarea
        className="closest-locations__textarea"
        placeholder="Please enter locations, separated by linebreaks."
        value={locationNames.join('\n')}
        onChange={e => setLocationNames(e.target.value.split('\n'))}
      />
      <button
        className="closest-locations__fetch-button"
        type="button"
        disabled={locationNames.length < 2}
        onClick={fetchClosestLocations}
      >
        Get Closest Locations
      </button>
      {!loading && error && <div className="error">Error: {error}</div>}
      {loading ? (
        <div className="spinner">
          <Loader
            type="Puff"
            color="hsl(120, 40%, 50%)"
            height="50"
            width="50"
          />
        </div>
      ) : (
        <div className="closest-locations__locations">
          {locations.map(LocationItem)}
        </div>
      )}
    </div>
  )
}

export default ClosestLocations
