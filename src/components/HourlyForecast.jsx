import { useState } from "react";
export default function HourlyForecast ({ forecastData, unit }) {   

  const [selectedDay, setSelectedDay] = useState("");

 const firstDay =
  forecastData.length > 0
    ? new Date(forecastData[0].dt_txt).toLocaleDateString("en-NG", {
        weekday: "long",
      })
    : "";

    const activeDay = selectedDay || firstDay 

  if (!Array.isArray(forecastData) || forecastData.length === 0) {
    return <p>Loading Hourly forecast</p>;
  }

   

    const days = [
  "All",
  ...Array.from(
    new Set(
    forecastData.map((item) =>
      new Date(item.dt_txt).toLocaleDateString("en-NG", {
        weekday: "long",
      })
    )
  ),
  )  
]

const filteredData =
  activeDay === "All"
    ? forecastData
    : forecastData.filter(
        (item) =>
          new Date(item.dt_txt).toLocaleDateString("en-NG", {
            weekday: "long",
          }) === activeDay
      );
    
    const hourly_data = filteredData.slice(0, 8)
    const getWeatherIcon = (main) => {
    if (main === "Clear") return "/images/icon-sunny.webp";
    if (main === "Clouds") return "/images/icon-partly-cloudy.webp";
    if (main === "Rain") return "/images/icon-rain.webp";
    if (main === "Drizzle") return "/images/icon-drizzle.webp";
    if (main === "Thunderstorm") return "/images/icon-storm.webp";
    return "/images/icon-unknown.webp";
  };

  const unitSymbol = unit === "metric" ? "°" : "°";

  


    return (

        <section className="hourly_forecast">
            <div className="hourly_header">
                <h3>Hourly forecast</h3>
                <select 
                className="selected_day"
                name=""
                id=""
                value={activeDay}
                onChange={(e) => setSelectedDay(e.target.value)}>

                    {days.map((day, index) => (
                        <option key={index} value={day}>{day}</option>
                    ))}
                                    </select>
            </div>
            
            <div className="hourly_list">
                {hourly_data.map((item, index) => {
                const time = new Date(item.dt_txt).toLocaleTimeString("en-NG", {
                    hour: "numeric",
                    hour12: true,
                })

                const temp = item.main.temp;
                const weatherMain = item.weather[0].main;
                const iconSrc = getWeatherIcon(weatherMain);

                 return (
                    
                <div key={index} className="hour_card">
                    <div className="hour_card_left">
                        <img src={iconSrc} alt="weather icon" />
                    
                    <p>{time}</p>
                   
                    </div>
                     <p className="hour_card_right">{Math.round(temp)}{unitSymbol}</p>
                </div>
                );
                    })}
            </div>
        </section>
    )
}