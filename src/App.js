import { useState } from "react";
import "./App.css";
import classes from "./styles/Weather.module.css";

function App() {
  const apiKey = "b59938430e629cd6a05e293107c3b695";
  const [weatherData, setWeatherData] = useState();
  const [city, setCity] = useState();

  const getWeather = (e) => {
    if (e.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setCity("");
        });
    }
  };

  return (
    <div className="container">
      <input
        className="input"
        placeholder="City Name.."
        onChange={(e) => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
      />

      {typeof weatherData === "undefined" ? (
        <div>
          <p>Welcome to Weather App,Search and press enter key</p>
        </div>
      ) : (
        <div>
          <p className={classes.name}>{weatherData.name}</p>
          <p className={classes.temp}>{Math.round(weatherData.main.temp)} °F</p>
          <p className={classes.condition}>{weatherData.weather[0].main}</p>
          <p></p>
        </div>
      )}
    </div>
  );
}

export default App;
