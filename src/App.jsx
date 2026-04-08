import { useEffect, useState } from 'react' 
import Header from './components/Header'
import CurrentWeather from './components/CurrentWeather'
import DailyForecast from './components/DailyForecast'
import HourlyForecast from './components/HourlyForecast'
import './App.css'

function App() {
  const [searchedCity, setSearchedCity] = useState("")
  const [weatherData, setWeatherData] = useState({})
  const [forecastData, setForecastData] = useState([])
  const [unit, setUnit] = useState("metric")
  const [cityFound, setCityFound] =  useState(false)
  
  useEffect(() => {
    if (!searchedCity) return;

    async function fetchWeather() {
      const apiKey = "90818551b7ba977c7bba4f1d8d7deffc"
      
      // Current weather
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=${unit}`
      )

      const data = await res.json()
      
        if (data.cod === "404") {
          setCityFound(false);
          setWeatherData({});
          setForecastData([]);
          return;
        }

        setCityFound(true)
        setWeatherData(data)

      
      // Forecast
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=${apiKey}&units=${unit}`
      )
      
      if (!forecastRes.ok) {
        console.error("Forecast request failed");
        return;
      }

      const forecastResData = await forecastRes.json();
      setForecastData(forecastResData.list);
    } 
    
    fetchWeather()
  }, [searchedCity, unit]) // added unit so fetch updates when unit changes

  function handleSearch(searchInput) {
    setSearchedCity(searchInput)
  }

  return (
    <div>
      <Header
        handleSearch={handleSearch}
        unit={unit}
        setUnit={setUnit}
      />

      {cityFound && (
        <>
          <CurrentWeather
            weatherData={weatherData}
            unit={unit}
            setUnit={setUnit}
          />
          <DailyForecast
            weatherData={weatherData}
            forecastData={forecastData}
            unit={unit}
            setUnit={setUnit}
          />
          <HourlyForecast
            weatherData={weatherData}
            forecastData={forecastData}
            unit={unit}
            setUnit={setUnit}
          />
        </>
      )}
    </div>
  )
}

export default App