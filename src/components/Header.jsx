import { useState, useEffect } from "react"

export default function Header (props) {

    const [searchInput, setSearchInput] = useState("");
    const [showUnits, setShowUnits] = useState(false)
    const [suggestions, setSuggestions] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(-1)
   

useEffect(() => {

  async function fetchSuggestions() {

    if (!searchInput.trim()) {
      setSuggestions([])
      return
    }

    const apiKey = "90818551b7ba977c7bba4f1d8d7deffc"

    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=${apiKey}`
    )

    const data = await res.json()

    setSuggestions(data)
  }

  fetchSuggestions()

}, [searchInput])


     function handleSubmit(e) {
    e.preventDefault();
    props.handleSearch(searchInput.trim());
    setSearchInput("")
  }

  function handleKeyDown(e) {
   

  // DOWN ARROW
  if (e.key === "ArrowDown") {
  e.preventDefault()

  setSelectedIndex(prev =>
    prev < suggestions.length - 1 ? prev + 1 : prev
  )
}
  // UP ARROW
  if (e.key === "ArrowUp") {
  e.preventDefault()

  setSelectedIndex(prev =>
    prev > 0 ? prev - 1 : prev
  )
}
  // ENTER KEY
  if (e.key === "Enter" && selectedIndex >= 0) {
    e.preventDefault()
    const selectedCity = suggestions[selectedIndex]
    setSearchInput(selectedCity.name)
    props.handleSearch(selectedCity.name)
    setSuggestions([])
    setSelectedIndex(-1)
  }
}

    return (
        <section>
        <header>
        <div className="logo">
            <img src="/images/logo.svg" alt="weather app logo" />
        </div>
        
     <div className="units">

  <button
    className="units-btn"
    onClick={() => setShowUnits(prev => !prev)}
  >
    <img
      src="/images/icon-units.svg"
      alt="units icon"
    />

    <span>Units</span>

    <img
      src="/images/icon-dropdown.svg"
      alt="dropdown arrow"
    />
  </button>

  {showUnits && (
    <div className="units-dropdown">
        <button
  className="switch-units-btn"

  onClick={() => {
    props.setUnit(
      props.unit === "metric"
        ? "imperial"
        : "metric"
    )
  }}
>
  Switch to {
    props.unit === "metric"
      ? "Imperial"
      : "Metric"
  }
</button>

      <div className="dropdown-section">
        <h4>Temperature</h4>

        <button
  className={
    props.unit === "metric"
      ? "active-option"
      : ""
  }
  onClick={() => {
    props.setUnit("metric")
    
  }}
>
  <span>Celsius (°C)</span>

  {props.unit === "metric" && (
    <span className="checkmark">✔</span>
  )}
</button>
        <button
  className={
    props.unit === "imperial"
      ? "active-option"
      : ""
  }
  onClick={() => {
    props.setUnit("imperial")
    
  }}
>
  <span>Fahrenheit (°F)</span>

  {props.unit === "imperial" && (
    <span className="checkmark">✔</span>
  )}
</button>
      </div>

      <div className="dropdown-section">
        <h4>Wind Speed</h4>

        <button
          className={
            props.unit === "metric"
              ? "active-option"
              : ""
          }

          onClick={() => {
            props.setUnit("metric")
            
          }}
        >
          km/h
          {props.unit === "metric" && (
    <span className="checkmark">✔</span>
  )}
        </button>

        <button
          className={
            props.unit === "imperial"
              ? "active-option"
              : ""
          }

          onClick={() => {
            props.setUnit("imperial")
            
          }}
        >
            
          mph
          {props.unit === "imperial" && (
    <span className="checkmark">✔</span>
  )}
        </button>
      </div>

      <div className="dropdown-section">
        <h4>Precipitation</h4>

        <button
          className={
            props.unit === "metric"
              ? "active-option"
              : ""
          }

          onClick={() => {
            props.setUnit("metric")
            
          }}
        >
          Millimeters (mm)
          {props.unit === "metric" && (
  <span className="checkmark">✔</span>
)}
        </button>

        <button
          className={
            props.unit === "imperial"
              ? "active-option"
              : ""
          }

          onClick={() => {
            props.setUnit("imperial")
            
          }}
        >
          Inches (in)
          {props.unit === "imperial" && (
  <span className="checkmark">✔</span>
)}
        </button>
      </div>

    </div>
  )}
</div>             
</header>
{!props.hasSearched && (
<div className="header-search-section">
    <h1>How's the sky looking today?
</h1>
<form 
onSubmit={handleSubmit
}
>
    <div className="search-input">
        <img
        className="search-icon"
        src="/images/icon-search.svg" alt="search icon" />
        <input 
        type="search"
        value={searchInput}
        placeholder={`Search for a place..`}
        onKeyDown={handleKeyDown}
        onChange={(e) => setSearchInput(e.target.value)}
        />
        
    </div>
  {
  suggestions.length > 0 && (
    <div className="suggestions">
      {
        suggestions.map((city, index) => (
          <p
            key={index}
            className={selectedIndex === index ? "active_suggestion" : ""}
            onClick={() => {
              setSearchInput(city.name)
              props.handleSearch(city.name)
              setSuggestions([])
            }}
          >
            {city.name}, {city.country}
          </p>
        ))
      }
    </div>
  )
}
{props.loading && (
  <div className="searching_box">
    <div className="loader"></div>
    <p>Search in progress...</p>
  </div>
)}



        <input type="submit" value="Search" 
        disabled={!searchInput.trim()}
        />

</form>
        </div>)}
        </section>
    )
}