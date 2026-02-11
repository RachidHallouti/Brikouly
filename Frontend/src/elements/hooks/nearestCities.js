import { moroccanCities } from "../../assets/cities"

export default async function getNearestCities() {
  const cities = moroccanCities
  const userLocation = await new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => {
          resolve({ lat: p.coords.latitude, lon: p.coords.longitude })
        },
        () => resolve(null),
      )
    } else {
      resolve(null)
    }
  })
  if (!userLocation) {
    return cities
  }
  const nearestCities = []
  for (const city of cities) {
    const distance =
      Math.abs(userLocation.lat - city.lat) +
      Math.abs(userLocation.lon - city.lon)
    nearestCities.push({ name: city.name, distance })
  }
  nearestCities.sort((a, b) => a.distance - b.distance)
  return nearestCities
}
