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
    const distance = getHaversineDistance(
      cords.lat,
      cords.lon,
      city.lat,
      city.lon,
    )
    nearestCities.push({ name: city.name, distance })
  }
  nearestCities.sort((a, b) => a.distance - b.distance)
  const citiiiies = nearestCities.map((c) => c.name)
  return citiiiies
}
