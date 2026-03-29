import { useState } from 'react'
import Header from './components/Header'
import CurrentWeather from './components/CurrentWeather'
import WeatherDetails from './components/WeatherDetails'
import Forecast from './components/Forecast'
import './App.css'

function App() {
  const [searchedCity, setSearchedCity] = useState("")

 function handleSearch () {
    setSearchedCity(prevSearchedCity => prevSearchedCity)
  }
  return (
    <div>
    
    <Header
    handleSearch={handleSearch}
    />
    <CurrentWeather/>
    <WeatherDetails/>
    <Forecast/>
    </div>
  )
}

export default App
