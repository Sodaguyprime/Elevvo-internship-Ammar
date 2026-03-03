import { useState, useEffect, useRef } from "react";

// ── Weather code → label + emoji icon ──────────────────────────────────────
const getWeatherInfo = (code) => {
  if (code === 0)               return { label: "Clear Sky",        icon: "☀️" };
  if (code <= 2)                return { label: "Partly Cloudy",    icon: "⛅" };
  if (code === 3)               return { label: "Overcast",         icon: "☁️" };
  if (code <= 49)               return { label: "Foggy",            icon: "🌫️" };
  if (code <= 59)               return { label: "Drizzle",          icon: "🌦️" };
  if (code <= 69)               return { label: "Rain",             icon: "🌧️" };
  if (code <= 79)               return { label: "Snow",             icon: "❄️" };
  if (code <= 84)               return { label: "Rain Showers",     icon: "🌨️" };
  if (code <= 94)               return { label: "Thunderstorm",     icon: "⛈️" };
  return                               { label: "Storm",            icon: "🌩️" };
};

// ── WMO day-of-week ─────────────────────────────────────────────────────────
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

// ── Hardcoded cities per country (fallback + extras) ────────────────────────
const COUNTRY_CITIES = {
  "Oman":         [{ name:"Muscat",   lat:23.5841, lon:58.4078 }, { name:"Salalah",  lat:17.0151, lon:54.0924 }, { name:"Sohar",    lat:24.3647, lon:56.7454 }],
  "UAE":          [{ name:"Dubai",    lat:25.2048, lon:55.2708 }, { name:"Abu Dhabi",lat:24.4539, lon:54.3773 }, { name:"Sharjah",  lat:25.3463, lon:55.4209 }],
  "Saudi Arabia": [{ name:"Riyadh",   lat:24.6877, lon:46.7219 }, { name:"Jeddah",   lat:21.2854, lon:39.2376 }, { name:"Mecca",    lat:21.3891, lon:39.8579 }],
  "United States":[{ name:"New York", lat:40.7128, lon:-74.006 }, { name:"Los Angeles",lat:34.0522,lon:-118.2437},{ name:"Chicago", lat:41.8781,lon:-87.6298}],
  "United Kingdom":[{name:"London",   lat:51.5074, lon:-0.1278 }, { name:"Manchester",lat:53.4808,lon:-2.2426 }, { name:"Birmingham",lat:52.4862,lon:-1.8904}],
  "India":        [{ name:"Mumbai",   lat:19.0760, lon:72.8777 }, { name:"Delhi",    lat:28.6139, lon:77.2090 }, { name:"Bangalore",lat:12.9716,lon:77.5946}],
  "Default":      [{ name:"Muscat",   lat:23.5841, lon:58.4078 }, { name:"Dubai",    lat:25.2048, lon:55.2708 }, { name:"London",   lat:51.5074, lon:-0.1278}],
};

// ── API helpers ──────────────────────────────────────────────────────────────
const reverseGeocode = async (lat, lon) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
    { headers: { "Accept-Language": "en" } }
  );
  const data = await res.json();
  return {
    city: data.address.city || data.address.town || data.address.village || "Unknown",
    country: data.address.country || "Default",
  };
};

const searchCities = async (query) => {
  if (!query) return [];
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en`
  );
  const data = await res.json();
  return (data.results ?? []).map((p) => ({
    name: p.name, country: p.country, lat: p.latitude, lon: p.longitude,
  }));
};

const fetchWeather = async (lat, lon) => {
  const params = new URLSearchParams({
    latitude: lat, longitude: lon,
    current: "temperature_2m,weathercode,windspeed_10m,relative_humidity_2m",
    daily: "weathercode,temperature_2m_max,temperature_2m_min",
    timezone: "auto", forecast_days: 3,
  });
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  const data = await res.json();
  return {
    temperature: Math.round(data.current.temperature_2m),
    windspeed:   Math.round(data.current.windspeed_10m),
    humidity:    data.current.relative_humidity_2m,
    weathercode: data.current.weathercode,
    daily: data.daily.time.map((t, i) => ({
      date:    new Date(t),
      code:    data.daily.weathercode[i],
      max:     Math.round(data.daily.temperature_2m_max[i]),
      min:     Math.round(data.daily.temperature_2m_min[i]),
    })),
  };
};

// ── Animated background gradient based on weather ───────────────────────────
const getBg = (code, loading) => {
  if (loading) return "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)";
  if (code === 0) return "linear-gradient(135deg, #f7971e 0%, #ffd200 50%, #f7971e 100%)";
  if (code <= 2)  return "linear-gradient(135deg, #4facfe 0%, #89d4cf 100%)";
  if (code <= 3)  return "linear-gradient(135deg, #8e9eab 0%, #c5c5c5 100%)";
  if (code <= 69) return "linear-gradient(135deg, #1c3d5a 0%, #3a7bd5 100%)";
  if (code <= 79) return "linear-gradient(135deg, #a8edea 0%, #d0e8f1 100%)";
  return              "linear-gradient(135deg, #232526 0%, #414345 100%)";
};

// ── Main Component ───────────────────────────────────────────────────────────
export default function WeatherDashboard() {
  const [cities, setCities]           = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather]         = useState(null);
  const [loadingLoc, setLoadingLoc]   = useState(true);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [error, setError]             = useState(null);
  const [query, setQuery]             = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching]     = useState(false);
  const searchTimeout                 = useRef(null);

  // On mount: detect location
  useEffect(() => {
    const load = async (lat, lon) => {
      try {
        const { city, country } = await reverseGeocode(lat, lon);
        const list = COUNTRY_CITIES[country] ?? COUNTRY_CITIES["Default"];
        setCities(list);
        // Try to match detected city in list, else use first
        const match = list.find(c => c.name.toLowerCase() === city.toLowerCase()) ?? list[0];
        setSelectedCity(match);
      } catch {
        setCities(COUNTRY_CITIES["Default"]);
        setSelectedCity(COUNTRY_CITIES["Default"][0]);
      } finally {
        setLoadingLoc(false);
      }
    };

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => load(coords.latitude, coords.longitude),
      ()           => load(23.5841, 58.4078) // fallback Muscat
    );
  }, []);

  // Fetch weather when city changes
  useEffect(() => {
    if (!selectedCity) return;
    setLoadingWeather(true);
    setWeather(null);
    fetchWeather(selectedCity.lat, selectedCity.lon)
      .then(setWeather)
      .catch(e => setError(e.message))
      .finally(() => setLoadingWeather(false));
  }, [selectedCity]);

  // Search debounce
  useEffect(() => {
    clearTimeout(searchTimeout.current);
    if (!query) { setSearchResults([]); return; }
    setSearching(true);
    searchTimeout.current = setTimeout(async () => {
      const results = await searchCities(query);
      setSearchResults(results);
      setSearching(false);
    }, 400);
  }, [query]);

  const info = weather ? getWeatherInfo(weather.weathercode) : null;
  const bg   = getBg(weather?.weathercode, loadingWeather || loadingLoc);

  const styles = {
    app: {
      minHeight: "100vh", background: bg,
      transition: "background 1.2s ease",
      fontFamily: "'Segoe UI', sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "2rem 1rem",
    },
    card: {
      background: "rgba(255,255,255,0.12)",
      backdropFilter: "blur(20px)",
      borderRadius: "24px",
      border: "1px solid rgba(255,255,255,0.2)",
      padding: "2rem",
      width: "100%", maxWidth: "480px",
      boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
      color: "#fff",
    },
    title: { margin: 0, fontSize: "1.1rem", opacity: 0.7, letterSpacing: "0.1em", textTransform: "uppercase" },
    cityName: { margin: "0.2rem 0 1.5rem", fontSize: "2rem", fontWeight: 700 },
    cityRow: { display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" },
    cityBtn: (active) => ({
      padding: "0.4rem 1rem", borderRadius: "20px", border: "none", cursor: "pointer",
      background: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)",
      color: active ? "#333" : "#fff", fontWeight: active ? 700 : 400,
      transition: "all 0.2s", fontSize: "0.9rem",
    }),
    bigIcon: { fontSize: "5rem", textAlign: "center", margin: "0.5rem 0", lineHeight: 1 },
    bigTemp: { fontSize: "4rem", fontWeight: 800, textAlign: "center", margin: 0 },
    label:   { textAlign: "center", opacity: 0.8, margin: "0.3rem 0 1.5rem", fontSize: "1.1rem" },
    statsRow: { display: "flex", justifyContent: "space-around", marginBottom: "1.5rem" },
    stat: { textAlign: "center" },
    statVal: { fontSize: "1.3rem", fontWeight: 700 },
    statLbl: { fontSize: "0.75rem", opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.05em" },
    divider: { borderColor: "rgba(255,255,255,0.2)", margin: "1rem 0" },
    forecastRow: { display: "flex", justifyContent: "space-between", gap: "0.5rem" },
    forecastCard: {
      flex: 1, background: "rgba(255,255,255,0.1)", borderRadius: "16px",
      padding: "0.75rem 0.5rem", textAlign: "center",
    },
    forecastDay:  { fontSize: "0.75rem", opacity: 0.7, textTransform: "uppercase" },
    forecastIcon: { fontSize: "1.6rem", margin: "0.3rem 0" },
    forecastTemp: { fontSize: "0.9rem", fontWeight: 600 },
    searchWrap: { position: "relative", marginBottom: "1.5rem" },
    searchInput: {
      width: "100%", padding: "0.7rem 1rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.3)",
      background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "1rem",
      outline: "none", boxSizing: "border-box",
    },
    dropdown: {
      position: "absolute", top: "110%", left: 0, right: 0,
      background: "rgba(30,30,50,0.95)", backdropFilter: "blur(10px)",
      borderRadius: "12px", overflow: "hidden", zIndex: 10,
      border: "1px solid rgba(255,255,255,0.15)",
    },
    dropItem: {
      padding: "0.75rem 1rem", cursor: "pointer", color: "#fff",
      borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: "0.95rem",
    },
    loading: { textAlign: "center", padding: "3rem", color: "#fff", fontSize: "1.2rem" },
    pulse: { animation: "pulse 1.5s infinite" },
  };

  if (loadingLoc) return (
    <div style={styles.app}>
      <div style={styles.loading}>📍 Detecting your location...</div>
    </div>
  );

  if (error) return (
    <div style={styles.app}>
      <div style={styles.loading}>⚠️ {error}</div>
    </div>
  );

  return (
    <div style={styles.app}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeIn 0.5s ease forwards; }
        input::placeholder { color: rgba(255,255,255,0.5); }
        .drop-item:hover { background: rgba(255,255,255,0.1); }
      `}</style>

      <div style={styles.card}>
        {/* Header */}
        <p style={styles.title}>Weather Dashboard</p>
        <p style={styles.cityName}>{selectedCity?.name}</p>

        {/* City Tabs */}
        <div style={styles.cityRow}>
          {cities.map(c => (
            <button key={c.name} style={styles.cityBtn(c.name === selectedCity?.name)}
              onClick={() => setSelectedCity(c)}>
              {c.name}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={styles.searchWrap}>
          <input
            style={styles.searchInput}
            placeholder="🔍  Search any city..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {(searchResults.length > 0 || searching) && (
            <div style={styles.dropdown}>
              {searching && <div style={{...styles.dropItem, opacity:0.6}}>Searching...</div>}
              {searchResults.map(r => (
                <div key={`${r.name}-${r.lat}`} className="drop-item" style={styles.dropItem}
                  onClick={() => {
                    setSelectedCity(r);
                    setQuery("");
                    setSearchResults([]);
                  }}>
                  {r.name}, {r.country}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Weather */}
        {loadingWeather ? (
          <div style={{...styles.bigIcon, ...styles.pulse}}>⏳</div>
        ) : weather && (
          <div className="fade-in">
            <div style={styles.bigIcon}>{info.icon}</div>
            <p style={styles.bigTemp}>{weather.temperature}°C</p>
            <p style={styles.label}>{info.label}</p>

            <div style={styles.statsRow}>
              <div style={styles.stat}>
                <div style={styles.statVal}>💧 {weather.humidity}%</div>
                <div style={styles.statLbl}>Humidity</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statVal}>💨 {weather.windspeed} km/h</div>
                <div style={styles.statLbl}>Wind</div>
              </div>
            </div>

            <hr style={styles.divider} />

            {/* 3-Day Forecast */}
            <div style={styles.forecastRow}>
              {weather.daily.map((day, i) => {
                const fi = getWeatherInfo(day.code);
                return (
                  <div key={i} style={styles.forecastCard}>
                    <div style={styles.forecastDay}>{i === 0 ? "Today" : DAYS[day.date.getDay()]}</div>
                    <div style={styles.forecastIcon}>{fi.icon}</div>
                    <div style={styles.forecastTemp}>{day.max}° / {day.min}°</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
