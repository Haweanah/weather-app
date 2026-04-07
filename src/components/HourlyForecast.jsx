export default function HourlyForecast ({ forecastData }) {    if (!Array.isArray(forecastData) || forecastData.length === 0) {
    return <p>Loading Hourly forecast</p>
}
    const hourly_data = forecastData.slice(0, 8)
    const getWeatherIcon = (main) => {
    if (main === "Clear") return "/images/icon-sunny.webp";
    if (main === "Clouds") return "/images/icon-partly-cloudy.webp";
    if (main === "Rain") return "/images/icon-rain.webp";
    if (main === "Drizzle") return "/images/icon-drizzle.webp";
    if (main === "Thunderstorm") return "/images/icon-storm.webp";
    return "/images/icon-unknown.webp";
  };
    return (

        <section className="hourly_forecast">
            {hourly_data.map((item, index) => {
                const time = new Date(item.dt_txt).toLocaleTimeString("en-NG", {
                    hour: "numeric",
                    hour12: true,
                })

                 const temp = item.main.temp;
                const weatherMain = item.weather[0].main;
                const iconSrc = getWeatherIcon(weatherMain);
                    })}
        </section>
    )
}