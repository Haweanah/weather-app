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

  const [unit, setUnit] = useState("metric"); 
  

  useEffect(() => {
    console.log("useEffect triggered:", searchedCity)
    if (!searchedCity) return;
    async function fetchWeather() {
      const apiKey = "90818551b7ba977c7bba4f1d8d7deffc"
      const res = await fetch (
         `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=${unit}`
      )
      console.log(res);

      const data = await res.json()
      console.log(data);
      setWeatherData(data)

   const forecastRes = await fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=${apiKey}&units=${unit}`
);

console.log(forecastRes)
  
  if (!forecastRes.ok) {
    console.error("Forecast request failed");
    return;
  }

  const forecastResData = await forecastRes.json();
  setForecastData(forecastResData.list);


} 
       fetchWeather()
  }, [searchedCity]
)

 function handleSearch (searchInput) {
  console.log("Searching for:", searchInput);
 
    setSearchedCity(searchInput )
  }
  return (
    <div>
    
    <Header
    handleSearch={handleSearch}
    unit={unit}
    setUnit={setUnit}
    />
    <CurrentWeather
    weatherData={weatherData}
     />
    <DailyForecast
    weatherData={weatherData}
    forecastData={forecastData}
    />
     <HourlyForecast
    weatherData={weatherData}
    forecastData={forecastData}
    />
   
    </div>
  )
}

export default App
