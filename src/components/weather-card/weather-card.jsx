import './weather-card.css';
import { FaLocationCrosshairs } from "react-icons/fa6";

function WeatherCard ({cityName, cityCountry, temp, weatherTempDescription, weatherIcon, tempMax, tempMin}) {
    const currentDate = new Date();

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('pt-BR', options);
    let dayOfWeek = currentDate.toLocaleDateString('pt-BR', { weekday: 'long' });
    dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

    return (
        <section className='weather-card'>
            <div className="weather-card-info">
                <div className="weather-card-day-info">
                    <div className="weather-card-day">
                        <h2>{dayOfWeek}</h2>
                    </div>
                    <div className="weather-card-data">
                        <p>{formattedDate}</p>
                    </div>
                    <div className="weather-card-location">
                        <FaLocationCrosshairs/>{cityName}, {cityCountry}
                    </div>
                </div>

                <div className="weather-card-temp">
                    <div className="weather-card-icon">
                        {weatherIcon}
                    </div>
                    <div className="weather-card-temperatura">
                        <h1>{Math.round(temp)}°C</h1>
                    </div>
                    <div className="weather-card-tempinfo">
                        {weatherTempDescription}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WeatherCard;