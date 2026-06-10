/**
 * Places shown on the interactive globe in the About page.
 *
 * Edit this list freely — add a row per place with its latitude/longitude.
 * Tip: right-click a spot in Google Maps to copy its "lat, lng" coordinates.
 */

export interface VisitedPlace {
  name: string
  country: string
  /** latitude in degrees, north positive */
  lat: number
  /** longitude in degrees, east positive */
  lng: number
  /** optional one-line memory */
  note?: string
}

export const visitedPlaces: VisitedPlace[] = [
  { name: 'New York', country: 'USA', lat: 40.7128, lng: -74.006, note: 'Home base' },
  { name: 'Los Angeles', country: 'USA', lat: 34.0522, lng: -118.2437 },
  { name: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832 },
  { name: 'Beijing', country: 'China', lat: 39.9042, lng: 116.4074 },
  { name: 'Shanghai', country: 'China', lat: 31.2304, lng: 121.4737 },
  { name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503 },
  { name: 'London', country: 'UK', lat: 51.5074, lng: -0.1278 },
]
