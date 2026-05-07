import { useEffect, useState } from "react"
import { moroccanCities } from "../../assets/cities"

function getHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export default function useNearestCities(selectedCityName) {
  const [nearestCities, setNearestCities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function calculate() {
      setLoading(true)
      let targetCoords = moroccanCities.find((c) => c.name === selectedCityName)

      if (!targetCoords && navigator.geolocation) {
        try {
          const pos = await new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej)
          })
          targetCoords = { lat: pos.coords.latitude, lon: pos.coords.longitude }
        } catch (error) {
          console.error("Location access denied or unavailable.")
        }
      }

      if (targetCoords) {
        const sorted = [...moroccanCities]
          .map((city) => ({
            name: city.name,
            distance: getHaversineDistance(
              targetCoords.lat,
              targetCoords.lon,
              city.lat,
              city.lon,
            ),
          }))
          .sort((a, b) => a.distance - b.distance)
          .map((c) => c.name)

        setNearestCities(sorted)
      }
      setLoading(false)
    }

    calculate()
  }, [selectedCityName])

  return nearestCities
}
