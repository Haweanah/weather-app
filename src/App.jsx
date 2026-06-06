import { useEffect, useState } from 'react' 
import Header from './components/Header'
import CurrentWeather from './components/CurrentWeather'
import DailyForecast from './components/DailyForecast'
import HourlyForecast from './components/HourlyForecast'
import apiErrorLogo from '../public/images/icon-error.svg'
import retryIcon from '../public/images/icon-retry.svg'
import './App.css'
import Attribution from './components/Attribution.jsx'

function App() {
  const [searchedCity, setSearchedCity] = useState("")
  const [weatherData, setWeatherData] = useState({})
  const [forecastData, setForecastData] = useState([])
  const [unit, setUnit] = useState("metric")
  const [cityFound, setCityFound] =  useState(true)
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [apiError, setApiError] = useState(false)
  const [coordinates, setCoordinates] = useState(null)
  const [hourlyData, setHourlyData] = useState([])
  
  useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude

      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`
        )

        const data = await res.json()

        setSearchedCity(data.name)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    },
    () => {
      setLoading(false)
    }
  )
}, [unit])

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

         const { lat, lon } = data.coord

          setCoordinates({
            lat,
            lon
          })
         
          
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
  }, [searchedCity, unit]) 

  useEffect(() => {
  if (!coordinates) return

  async function fetchHourlyData() {
    try {
      const { lat, lon } = coordinates

      const hourlyRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code&forecast_days=7`
      )

      const hourlyJson = await hourlyRes.json()

      setHourlyData(
        hourlyJson.hourly.time.map((time, index) => ({
          time,
          temp: hourlyJson.hourly.temperature_2m[index],
          weatherCode: hourlyJson.hourly.weather_code[index]
        }))
      )
    } catch (error) {
      console.error(error)
    }
  }

  fetchHourlyData()
}, [coordinates])


  function handleSearch(searchInput) {
    setLoading(true)
    setSearchedCity(searchInput)
    setHasSearched(true)
  }

  return (
    <div>
      <Header
        handleSearch={handleSearch}
        unit={unit}
        setUnit={setUnit}
        loading={loading}
        hasSearched={hasSearched}
        apiError={apiError}
        searchedCity={searchedCity}
      />
      
     
{/* LOADING SKELETON */}
{loading && !apiError && (
  <div className="des_container">

    <div className="des_container_left">

      <div className="current-weather-top skeleton-main">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>

      <div className="current-weather-bottom">
        <div className="feels_like skeleton-card"></div>
        <div className="humidity skeleton-card"></div>
        <div className="speed skeleton-card"></div>
        <div className="precipitation skeleton-card"></div>
      </div>

      <div className="daily_forecast">
        <div className="day_card skeleton-card"></div>
        <div className="day_card skeleton-card"></div>
        <div className="day_card skeleton-card"></div>
        <div className="day_card skeleton-card"></div>
        <div className="day_card skeleton-card"></div>
      </div>

    </div>

    <div className="des_container_right">
      <div className="hourly_forecast skeleton-main">
        <div className="hour_card skeleton-card"></div>
        <div className="hour_card skeleton-card"></div>
        <div className="hour_card skeleton-card"></div>
        <div className="hour_card skeleton-card"></div>
        <div className="hour_card skeleton-card"></div>
      </div>
    </div>

  </div>
)}

      {cityFound === true && !loading && !apiError && (
        <div className='des_container'>
          <div className="des_container_left">
            <CurrentWeather
            weatherData={weatherData}
            unit={unit}
            setUnit={setUnit}
            loading={loading}
          />
          <DailyForecast
            forecastData={forecastData}
            unit={unit}
          />
          </div>
          
          <div className="des_container_right">
            <HourlyForecast
            hourlyData={hourlyData}
            unit={unit}
          />
          </div>
          
        </div>
      
      )}
      {!cityFound && apiError && (
  <p className='no-city'>No search result found!</p>
)}
{apiError && (
        <div className="api-error">

        <img src={apiErrorLogo} alt="" />
          <h2>Something went wrong. Please try again.</h2>
          <p>We couldn't connect to the server (API error). please try again in a few moments</p>
        <div className="retry">
                   <button
            className="retry-btn"
            onClick={() => window.location.reload()}
          >
             <img src={retryIcon} alt="" />
 
            Retry
          </button>
        </div>
    </div>
  )
}

<Attribution/>
</div>
  )}
export default App