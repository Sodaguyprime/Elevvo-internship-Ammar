import { useState, useEffect } from "react";
import fetchWeather from "./fetchWeather";
import { reverseGeocode, searchCities } from "./fetchNearbyCities";

function App() {
  const [currentCity, setCurrentCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // On load: get user location → reverse geocode → fetch weather
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const cityName = await reverseGeocode(coords.latitude, coords.longitude);
          setCurrentCity(cityName);
          setSelectedCity({ name: cityName, lat: coords.latitude, lon: coords.longitude });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      // Fallback: default to Muscat
      async () => {
        try {
          const cityName = await reverseGeocode(23.5841, 58.4078);
          setCurrentCity(cityName);
          setSelectedCity({ name: cityName, lat: 23.5841, lon: 58.4078 });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    );
  }, []);

  // Fetch weather when selected city changes
  useEffect(() => {
    if (!selectedCity) return;
    setWeather(null);
    fetchWeather(selectedCity.lat, selectedCity.lon)
      .then(setWeather)
      .catch((err) => setError(err.message));
  }, [selectedCity]);

  // Search cities as user types
  useEffect(() => {
    if (!searchQuery) { setSearchResults([]); return; }
    const timeout = setTimeout(() => {
      searchCities(searchQuery).then(setSearchResults).catch(console.error);
    }, 400); // debounce 400ms
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  if (loading) return <p>Detecting location...</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <div>
      <p>Current location: {currentCity}</p>

      {/* Search */}
      <input
        type="text"
        placeholder="Search for a city..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Search Results */}
      {searchResults.map((city) => (
        <div key={`${city.name}-${city.lat}`}>
          <button onClick={() => {
            setSelectedCity(city);
            setSearchQuery("");
            setSearchResults([]);
          }}>
            {city.name}, {city.country}
          </button>
        </div>
      ))}

      {/* Weather Output */}
      {selectedCity && (
        <div>
          <p>City: {selectedCity.name}</p>
          {weather ? (
            <>
              <p>Temperature: {weather.temperature}°C</p>
              <p>Humidity: {weather.humidity}%</p>
              <p>Wind Speed: {weather.windspeed} km/h</p>
              <p>Weather Code: {weather.weathercode}</p>
            </>
          ) : (
            <p>Loading weather...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;