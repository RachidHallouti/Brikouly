import { moroccanCities } from "../../assets/cities"

export default async function getNearestCities(city = null) {
  const cities = moroccanCities
  let cords = cities.find((e) => e.name === city) || null

  if (navigator.geolocation && !cords) {
    const userLocation = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (p) => {
          resolve({ lat: p.coords.latitude, lon: p.coords.longitude })
        },
        () => resolve(null),
      )
    })
    if (userLocation) cords = userLocation
  }
  if (!cords) {
    return null
  }
  const nearestCities = []
  for (const city of cities) {
    const distance =
      (cords.lat - city.lat) * (cords.lat - city.lat) +
      (cords.lon - city.lon) * (cords.lon - city.lon)
    nearestCities.push({ name: city.name, distance })
  }
  nearestCities.sort((a, b) => a.distance - b.distance)
  const citiiiies = nearestCities.map((c) => c.name)
  return citiiiies
}
