import axios from "axios";
import { useState } from "react";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const API_KEY =
    process.env.REACT_APP_WEATHER_API_KEY;

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

  const getWeather = async (selectedCity?: string) => {
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
      setWeather(response.data);
      setCity(response.data.location.name);
      setSuggestions([]);
    } catch {
      setError("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #74ABE2, #5563DE)",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "20px",
          maxWidth: "420px",
          width: "100%",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "26px",
            marginBottom: "20px",
            color: "#333",
            fontWeight: "bold",
          }}
        >
          🌤️ Weather App
        </h1>

        <div style={{ position: "relative" }}>
          <input
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              fetchSuggestions(e.target.value);
            }}
            onKeyDown={(e) => e.key === "Enter" && getWeather()}
            placeholder="Enter city name"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              boxSizing: "border-box",
            }}
          />

          {suggestions.length > 0 && (
            <ul
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderTop: "none",
                borderRadius: "0 0 8px 8px",
                maxHeight: "180px",
                overflowY: "auto",
                zIndex: 1000,
                margin: 0,
                padding: 0,
                listStyle: "none",
              }}
            >
              {suggestions.map((s, index) => (
                <li
                  key={index}
                  onClick={() => getWeather(s.name)}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f0f0f0")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  {s.name}, {s.country}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={() => getWeather()}
          style={{
            marginTop: "15px",
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            background: "#5563DE",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = "#4351c7")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background = "#5563DE")
          }
        >
          Get Weather
        </button>

        {error && (
          <div
            style={{
              marginTop: "15px",
              backgroundColor: "#ffe5e5",
              color: "#cc0000",
              padding: "10px",
              borderRadius: "8px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {error}
          </div>
        )}

        {loading && (
          <p
            style={{
              marginTop: "15px",
              textAlign: "center",
              color: "#555",
            }}
          >
            Loading...
          </p>
        )}

        {weather && !loading && (
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              backgroundColor: "#f9f9ff",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "inset 0 0 8px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                marginBottom: "10px",
                color: "#333",
                fontWeight: "bold",
              }}
            >
              {weather.location.name}, {weather.location.country}
            </h2>
            <p
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#5563DE",
                margin: "5px 0",
              }}
            >
              {weather.current.temp_c}°C
            </p>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#555",
                margin: "5px 0",
              }}
            >
              {weather.current.condition.text}
            </p>
            <img
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
              style={{ width: "64px", height: "64px", marginTop: "10px" }}
            />

<div
  style={{
    marginTop: "15px",
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "10px",
  }}
>
  <style>
    {`
      @media (min-width: 600px) {
        .weather-details {
          grid-template-columns: 1fr 1fr !important;
        }
      }
    `}
  </style>

  <div className="weather-details" style={{ display: "contents" }}>
    <p>
      <strong>🌡️ Feels Like:</strong> {weather.current.feelslike_c}°C
    </p>
    <p>
      <strong>💧 Humidity:</strong> {weather.current.humidity}%
    </p>
    <p>
      <strong>🌬️ Wind:</strong> {weather.current.wind_kph} km/h
    </p>
    <p>
      <strong>🕒 Local Time:</strong> {weather.location.localtime}
    </p>
  </div>
</div>

          </div>
        )}
      </div>
    </div>
  );
}
