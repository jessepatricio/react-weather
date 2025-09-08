import React, { useEffect, useRef, useState } from 'react'

const GoogleMap = ({ lon, lat }) => {
  const mapRef = useRef(null)
  const [mapError, setMapError] = useState(false)

  useEffect(() => {
    const initMap = () => {
      // Check if Google Maps is already loaded
      if (window.google && window.google.maps) {
        try {
          const map = new window.google.maps.Map(mapRef.current, {
            center: { lat, lng: lon },
            zoom: 10,
            mapTypeId: 'roadmap'
          })

          new window.google.maps.Marker({
            position: { lat, lng: lon },
            map: map,
            title: 'Weather Location'
          })
        } catch (error) {
          console.error('Error initializing Google Maps:', error)
          setMapError(true)
        }
      } else {
        // Fallback: show coordinates as text
        setMapError(true)
      }
    }

    if (mapRef.current) {
      initMap()
    }
  }, [lat, lon])

  if (mapError) {
    return (
      <div 
        style={{ width: '100%', height: '150px' }}
        className="border rounded d-flex align-items-center justify-content-center bg-light"
      >
        <div className="text-center p-2">
          <div className="fw-bold">📍 Location</div>
          <div>{lat.toFixed(2)}, {lon.toFixed(2)}</div>
          <small className="text-muted">Google Maps API key required</small>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={mapRef} 
      style={{ width: '100%', height: '150px' }}
      className="border rounded"
    />
  )
}

export default GoogleMap
