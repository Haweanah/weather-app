export default function CurrentWeather (props) {
    if (!props.weatherData.cod) return <p>Loading...</p>;
    const { name, main, sys, dt, wind, rain, snow} = props.weatherData;
    const country = sys?.country
    const date = new Date(dt * 1000)

    const formattedDate = date.toLocaleString('en-NG', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        
    })


    
    return (
        <section className="current-weather">
            <article className="current-weather-top">
                <h2>{name}, {country}</h2>
                
            <p className="date">{formattedDate}</p>
            <div className="brightness">
                <img 
                className="sun-image"
                src="/images/icon-sunny.webp" alt="The Sun" />
                <p className="temp">{Math.round(main.temp)}°</p>
            </div>
            </article>

            <article className="current-weather-bottom">
                <div className="feels_like">
                    <p>Feels Like</p>
                    <span>{Math.round(main.feels_like)}°</span>
                </div>
                <div className="humidity">
                    <p>Humidity</p>
                  
                  
                    <span>{Math.round(main.humidity)}%</span>
                </div>
                <div className="speed">
                    <p>Wind</p>
                    <span>{Math.round(wind.speed)}km/hr</span>
                    </div>
                <div className="precipitation">
                    <p>Precipitation</p>
                    <span>{rain?.["1h"] ? rain["1h"] : snow?.["1h"] ? snow["1h"] : 0}mm</span>
                    </div>
            </article>


             </section>
    )
}