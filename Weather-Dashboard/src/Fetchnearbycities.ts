export interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

// Step 1: Get current city name from coordinates using Nominatim
export const reverseGeocode = async (lat: number, lon: number): Promise<string> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
    { headers: { "Accept-Language": "en" } }
  );
  if (!response.ok) throw new Error("Failed to reverse geocode");
  const data = await response.json();
  return data.address.city || data.address.town || data.address.village || "Unknown";
};

// Step 2: Search cities by name using Open-Meteo geocoding
export const searchCities = async (query: string): Promise<City[]> => {
  if (!query) return [];

  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en`
  );
  if (!response.ok) throw new Error("Failed to search cities");
  const data = await response.json();

  return (data.results ?? []).map((place: any) => ({
    name: place.name,
    country: place.country,
    lat: place.latitude,
    lon: place.longitude,
  }));
};