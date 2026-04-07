export default function DailyForecast({ forecastData }) {
  if (!Array.isArray(forecastData) || forecastData.length ===0) {
    return <p>Loading Daily Forecast...</p>
  }



  const dailyForecast = forecastData.filter((_, index) => index % 8 === 0)

   const getWeatherIcon = (main) => {
    if (main === "Clear") return "/images/icon-sunny.webp";
    if (main === "Clouds") return "/images/icon-partly-cloudy.webp";
    if (main === "Rain") return "/images/icon-rain.webp";
    if (main === "Drizzle") return "/images/icon-drizzle.webp";
    if (main === "Thunderstorm") return "/images/icon-storm.webp";
    if (main === "Snow") return "/images/icon-snow.webp";
    if (main === "Mist" || main === "Fog") return "/images/icon-fog.webp";
    return "/images/icon-unknown.webp";
  };

  return (
    <section className="daily_forecast">
       {dailyForecast.slice(0, 7).map((item, index) => {
        const dayName = new Date(item.dt_txt).toLocaleDateString("en-NG", {
          weekday: "short",
        });

        const temp = item.main.temp;
        const weatherMain = item.weather[0].main;
        const iconSrc = getWeatherIcon(weatherMain);

        return (
          <div key={index} className="day_card">
            <p>{dayName}</p>
            <div className="weather_condition">
              <img src={iconSrc} alt="weather icon" />
            </div>
            <p>{Math.round(temp)}°</p>
          </div>
        );
      })}
    
    </section>
  );
}