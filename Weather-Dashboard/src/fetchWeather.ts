const fetchWeather = async () => {
  const params = new URLSearchParams({
    latitude: "23.5841",
    longitude: "58.4078",
    current: "temperature_2m,weathercode,windspeed_10m,relative_humidity_2m",
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);

  if (!response.ok) throw new Error("Failed to fetch weather data");

  const data = await response.json();

  return {
    temperature: data.current.temperature_2m,   // °C
    windspeed: data.current.windspeed_10m,       // km/h
    humidity: data.current.relative_humidity_2m, // %
    weathercode: data.current.weathercode,       // WMO code
  };
};

export default fetchWeather;
