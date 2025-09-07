import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./WeatherApp.css";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [bgClass, setBgClass] = useState("sunny");
  const prevBgClass = useRef("sunny");

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`
      );
      setSuggestions(response.data);
    } catch {
      setSuggestions([]);
    }
  };

  const getWeather = async () => {
    const query = selectedCity || city;
    if (!query.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}`
      );
      const newWeather = response.data;
      setWeather(newWeather);
      setCity(newWeather.location.name);
      setSuggestions([]);

      const condition = newWeather.current.condition.text.toLowerCase();
      const isNight = newWeather.current.is_day === 0;

      const newBg =
        isNight ? "night" :
        condition.includes("rain") ? "rainy" :
        condition.includes("cloud") ? "cloudy" :
        "sunny";

      prevBgClass.current = bgClass;
      setBgClass(newBg);
    } catch {
      setError("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app-container">
      <div className={`background-layer ${prevBgClass.current}`} />
      <div className={`background-layer active ${bgClass}`} />

      <div className="weather-app-content">
        <div className="weather-card">
          <h1>🌤️ Weather App</h1>

          <div style={{ position: "relative" }}>
            <input
              type="text"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setSelectedCity(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              onKeyDown={(e) => e.key === "Enter" && getWeather()}
              placeholder="Enter city name"
              className="input"
            />

            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((s, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setCity(s.name);
                      setSelectedCity(s.name);
                      setSuggestions([]);
                    }}
                  >
                    {s.name}, {s.country}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button onClick={getWeather} className="button">
            Get Weather
          </button>

          {error && <div className="error">{error}</div>}
          {loading && <p className="loading">Loading...</p>}

          {weather && !loading && (
            <div className="weather-info animated">
              <h2>
                {weather.location.name}, {weather.location.country}
              </h2>
              <p className="temp">{weather.current.temp_c}°C</p>
              <p className="condition">{weather.current.condition.text}</p>
              <img
                src={weather.current.condition.icon}
                alt={weather.current.condition.text}
                className="icon"
              />
              <div className="details">
                <p><strong>🌡️ Feels Like:</strong> {weather.current.feelslike_c}°C</p>
                <p><strong>💧 Humidity:</strong> {weather.current.humidity}%</p>
                <p><strong>🌬️ Wind:</strong> {weather.current.wind_kph} km/h</p>
                <p><strong>🕒 Local Time:</strong> {weather.location.localtime}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
