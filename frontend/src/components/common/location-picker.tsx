'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import { useToast } from '@/hooks/use-toast'
import { Input } from '../ui/input'
import { Button } from '../ui/button'


interface MapPickerProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void
  initialPosition?: [number, number]
}

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

const DEFAULT_POSITION: [number, number] = [20.5937, 78.9629] // fallback center

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    const zoom = map.getZoom()
    console.log('ChangeView: Moving map to', center, 'keeping zoom', zoom)
    map.setView(center, zoom)
  }, [center, map])
  return null
}

function MapClickHandler({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      console.log('Map clicked at', e.latlng)
      onSelect(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

const MapPicker: React.FC<MapPickerProps> = ({ onLocationSelect, initialPosition }) => {
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(initialPosition || null)
  const [address, setAddress] = useState('')
  // const [toastMessage, setToastMessage] = useState('')
  // const [openToast, setOpenToast] = useState(false)
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  const showToast = (msg: string) => {
    toast({
      title: "",
      description: msg,
    });
  }

  const fetchAddress = async (lat: number, lng: number) => {
    console.log('Fetching address for', lat, lng)
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
      const data = await res.json()
      return data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`
    } catch (e) {
      console.error('Error fetching address', e)
      return `${lat.toFixed(5)}, ${lng.toFixed(5)}`
    }
  }

  const handleSelect = async (lat: number, lng: number) => {
    console.log('Selecting location', lat, lng)
    setMarkerPosition([lat, lng])
    const displayName = await fetchAddress(lat, lng)
    setAddress(displayName)
    showToast(`Selected location: ${displayName}`)
    onLocationSelect(lat, lng, displayName)
  }

  const requestUserLocation = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation not supported in this browser')
      handleSelect(...DEFAULT_POSITION)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        console.log('User location obtained', latitude, longitude)
        await handleSelect(latitude, longitude)
      },
      (err) => {
        console.warn('Location error:', err)
        if (err.code === 1) {
          // PERMISSION_DENIED
          showToast('Location permission is required. Please allow to use your current location.')
          // Retry after 2 seconds
          setTimeout(() => {
            requestUserLocation()
          }, 2000)
        } else {
          showToast('Error fetching location. Using default location.')
          handleSelect(...DEFAULT_POSITION)
        }
      }
    )
  }

  useEffect(() => {
    if (!initialPosition && !markerPosition) {
      requestUserLocation()
    }
  }, [initialPosition])

    const handleSearch = async () => {
    if (!searchQuery.trim()) return
    console.log('Searching for', searchQuery)
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`
      )
      const data = await res.json()
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat)
        const lng = parseFloat(data[0].lon)
        console.log('Search result:', lat, lng)
        handleSelect(lat, lng)
      } else {
        showToast('Location not found')
      }
    } catch (e) {
      console.error(e)
      showToast('Search failed')
    }
  }

  return (
    <div>
      <div className='flex gap-2 w-full mb-2'>
  <Input
    type="text"
    name="query"
    placeholder="Search location..."
    style={{ width: '80%' }}
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
    }}
  />
  <Button
    type="button"
    onClick={(e) => handleSearch()}
  >
    Search
  </Button>
</div>

      {/* {address && <p>Selected Location: {address}</p>} */}
      <MapContainer
        center={markerPosition || DEFAULT_POSITION}
        zoom={13}
        style={{ height: 400, width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markerPosition && (
          <Marker
            position={markerPosition}
            icon={defaultIcon}
            draggable
            eventHandlers={{
              dragend: (e) => {
                const latLng = e.target.getLatLng()
                handleSelect(latLng.lat, latLng.lng)
              },
            }}
          />
        )}
        <ChangeView center={markerPosition || DEFAULT_POSITION} />
        <MapClickHandler onSelect={handleSelect} />
      </MapContainer>
    </div>
  )
}

export default MapPicker
