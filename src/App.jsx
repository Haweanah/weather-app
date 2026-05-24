import { useEffect, useState } from 'react' 
import Header from './components/Header'
import CurrentWeather from './components/CurrentWeather'
import DailyForecast from './components/DailyForecast'
import HourlyForecast from './components/HourlyForecast'
import LoadingSkeleton from './components/LoadingSkeleton'
import './App.css'

function App() {
  const [searchedCity, setSearchedCity] = useState("")
  const [weatherData, setWeatherData] = useState({})
  const [forecastData, setForecastData] = useState([])
  const [unit, setUnit] = useState("metric")
  const [cityFound, setCityFound] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [apiError, setApiError] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      const apiKey = "YOUR_API_KEY"

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`
      )

      const data = await res.json()
      setWeatherData(data)
      setCityFound(true)

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`
      )

      const forecastData = await forecastRes.json()
      setForecastData(forecastData.list)

      setInitialLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!searchedCity) return

    async function fetchWeather() {
      try {
        setLoading(true)
        setApiError(false)
        setHasSearched(true)

        const apiKey = "YOUR_API_KEY"

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=${unit}`
        )

        if (!res.ok) throw new Error("Weather request failed")

        const data = await res.json()

        if (data.cod === "404") {
          setCityFound(false)
          setWeatherData({})
          setForecastData([])
          setLoading(false)
          return
        }

        setCityFound(true)
        setWeatherData(data)

        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=${apiKey}&units=${unit}`
        )

        const forecastResData = await forecastRes.json()
        setForecastData(forecastResData.list)

      } catch (err) {
        setApiError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [searchedCity, unit])

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

      {/* ✅ FIX: conditional rendering goes like this */}
      {initialLoading && <LoadingSkeleton />}

      {!initialLoading && cityFound === true && (
        <>
          <CurrentWeather weatherData={weatherData} unit={unit} />
          <DailyForecast forecastData={forecastData} unit={unit} />
          <HourlyForecast forecastData={forecastData} unit={unit} />
        </>
      )}

      {!initialLoading && cityFound === false && (
        <p className="no-city">No search result found!</p>
      )}

      {!initialLoading && apiError && (
        <div className="api-error">
          <h2>Something went wrong</h2>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}
    </div>
  )
}

export default App