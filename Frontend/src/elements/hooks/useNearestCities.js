import { useEffect, useState } from "react"
import getNearestCities from "./nearestCities"

export default function useNearestCities(city) {
  const [location, setLocation] = useState([])

  useEffect(() => {
    getNearestCities(city).then((e) => {
      setLocation(e)
    })
  }, [city])
  return location
}
