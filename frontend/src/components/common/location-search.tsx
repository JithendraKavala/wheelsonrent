'use client'

import { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { MapPin, Search, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface LocationSearchProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string } | null) => void
  placeholder?: string
  className?: string
}

const LocationSearch: React.FC<LocationSearchProps> = ({ 
  onLocationSelect, 
  placeholder = "Search location...",
  className = ""
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; address: string } | null>(null)
  const { toast } = useToast()

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setLoading(true)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`
      )
      const data = await response.json()
      
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat)
        const lng = parseFloat(data[0].lon)
        const address = data[0].display_name
        
        const location = { lat, lng, address }
        setSelectedLocation(location)
        onLocationSelect(location)
        
        toast({
          title: "Location found",
          description: `Selected: ${address.split(',').slice(0, 2).join(', ')}`,
        })
      } else {
        toast({
          title: "Location not found",
          description: "Please try a different search term",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Location search error:', error)
      toast({
        title: "Search failed",
        description: "Unable to search for location. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setSearchQuery('')
    setSelectedLocation(null)
    onLocationSelect(null)
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support location services",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )
          const data = await response.json()
          
          const address = data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          const location = { lat: latitude, lng: longitude, address }
          
          setSelectedLocation(location)
          setSearchQuery(address.split(',').slice(0, 2).join(', '))
          onLocationSelect(location)
          
          toast({
            title: "Current location found",
            description: `Using your current location`,
          })
        } catch (error) {
          console.error('Reverse geocoding error:', error)
          toast({
            title: "Location error",
            description: "Could not get address for your location",
            variant: "destructive"
          })
        } finally {
          setLoading(false)
        }
      },
      (error) => {
        console.error('Geolocation error:', error)
        toast({
          title: "Location access denied",
          description: "Please allow location access or search manually",
          variant: "destructive"
        })
        setLoading(false)
      }
    )
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-medium">Location</label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSearch()
              }
            }}
            className="pl-10"
          />
        </div>
        <Button
          type="button"
          onClick={handleSearch}
          disabled={loading || !searchQuery.trim()}
          size="sm"
          variant="outline"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
        <Button
          type="button"
          onClick={getCurrentLocation}
          disabled={loading}
          size="sm"
          variant="outline"
          title="Use current location"
        >
          <MapPin className="h-4 w-4" />
        </Button>
        {selectedLocation && (
          <Button
            type="button"
            onClick={handleClear}
            size="sm"
            variant="ghost"
            title="Clear location"
          >
            ×
          </Button>
        )}
      </div>
      {selectedLocation && (
        <p className="text-xs text-muted-foreground">
          Selected: {selectedLocation.address.split(',').slice(0, 2).join(', ')}
        </p>
      )}
    </div>
  )
}

export default LocationSearch
