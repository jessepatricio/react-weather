import React, { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

const GoogleMap = ({ lon, lat }) => {
  const mapRef = useRef(null)

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: "YOUR_API_KEY", // Replace with your actual API key
        version: "weekly",
        libraries: ["places"]
      })

      try {
        const { Map } = await loader.importLibrary("maps")
        
        const map = new Map(mapRef.current, {
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
        console.error('Error loading Google Maps:', error)
        // Fallback: show coordinates as text
        mapRef.current.innerHTML = `<div class="text-center p-2">${lat.toFixed(2)}, ${lon.toFixed(2)}</div>`
      }
    }

    if (mapRef.current) {
      initMap()
    }
  }, [lat, lon])

  return (
    <div 
      ref={mapRef} 
      style={{ width: '100%', height: '150px' }}
      className="border rounded"
    />
  )
}

export default GoogleMap
