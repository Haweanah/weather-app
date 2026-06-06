import { useState } from "react";
export default function HourlyForecast ({ hourlyData, unit }) {   
  const [selectedDay, setSelectedDay] = useState("");

 const firstDay =
  hourlyData.length > 0
    ? new Date(hourlyData[0].time).toLocaleDateString("en-NG", {
        weekday: "long",
      })
    : "";

  const activeDay = selectedDay || firstDay 
    

  if (!Array.isArray(hourlyData) || hourlyData.length === 0) {
    return null;
  }

const days = [
  "All",
  ...Array.from(
    new Set(
   hourlyData.map((item) =>
      new Date(item.time).toLocaleDateString("en-NG", {
        weekday: "long",
      })
    )
  ),
  )  
]

const filteredData =
  activeDay === "All"
    ? hourlyData
    : hourlyData.filter(
        (item) =>
          new Date(item.time).toLocaleDateString("en-NG", {
            weekday: "long",
          }) === activeDay
      );
      
   const hourly_data = filteredData.slice(0, 24)

   
  const unitSymbol = unit === "metric" ? "°" : "°";

  
  const getWeatherIcon = (code) => {
  if (code === 0) return "/images/icon-sunny.webp";

  if ([1, 2, 3].includes(code))
    return "/images/icon-partly-cloudy.webp";

  if ([51, 53, 55, 61, 63, 65].includes(code))
    return "/images/icon-rain.webp";

  if ([95, 96, 99].includes(code))
    return "/images/icon-storm.webp";

  return "/images/icon-unknown.webp";
};

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
                const time = new Date(item.time).toLocaleTimeString("en-NG", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                })

                const iconSrc = getWeatherIcon(item.weatherCode);

                 return (
                    
                <div key={index} className="hour_card">
                    <div className="hour_card_left">
                        <img src={iconSrc} alt="weather icon" />
                    
                    <p>{time}</p>
                   
                    </div>
                     <p className="hour_card_right">{Math.round(item.temp)}{unitSymbol}</p>
                </div>
                );
                    })}
            </div>
        </section>
    )
}