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
  const [cityFound, setCityFound] =  useState(null)
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false);
  const [apiError, setApiError] = useState(false)
  
  useEffect(() => {
    if (!searchedCity) return;

    async function fetchWeather() {
      try {
        setLoading(true)
        setApiError(false)
         setHasSearched(true);
         const apiKey = "90818551b7ba977c7bba4f1d8d7deffc"
      
      // Current weather
        const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=${unit}`
      )

      if (!res.ok) {
        throw new Error("Something went wrong")
      }

      const data = await res.json()
      
        if (data.cod === "404") {
          setCityFound(false);
          setWeatherData({});
          setForecastData([]);
          setHasSearched(true);
          setLoading(false)
          return;
      
      }  
         setCityFound(true)
         setWeatherData(data)
         
      // Forecast
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=${apiKey}&units=${unit}`
      )
      if (!forecastRes.ok) {
        throw new Error("Forecast request failed")
      }

      const forecastResData = await forecastRes.json();
      setForecastData(forecastResData.list);
      setLoading(false);
    } catch (error) {
      console.error(error)
      setApiError(true)
    } finally {
      setLoading(false)
    }
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
        loading={loading}
        hasSearched={hasSearched}
      />

      {cityFound === true && (
        <>
          <CurrentWeather
            weatherData={weatherData}
            unit={unit}
            setUnit={setUnit}
          />
          <DailyForecast
            forecastData={forecastData}
            unit={unit}
          />
          <HourlyForecast
            forecastData={forecastData}
            unit={unit}
          />
        </>
      
      )}
      {cityFound === false && (
  <p className='no-city'>No search result found!</p>
)}
{apiError && (
        <div className="api-error">

          <img
            src="/images/logo.svg"
            alt="weather logo"
          />

          <h2>Something went wrong. Please try again.</h2>
          <p>We couldn't connect to the server (API error). please try again in a few moments</p>
         <button
            className="retry-btn"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
    </div>
  )
}
</div>
  )}
export default App