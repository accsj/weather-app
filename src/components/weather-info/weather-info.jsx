import './weather-info.css';
import React, {useState} from 'react';
import WeatherBtnSearch from '../weather-btn-search/weather-btn-search';
import WeatherInfoCard from '../weather-info-card/weather-info-card';

function WeatherInfo ({onSubmit, temp, weatherMondayIcon, weatherTuesdayIcon, weatherWednesdayIcon, weatherThursdayIcon, weatherFridayIcon, weatherSaturdayIcon, weatherSundayIcon, todayPop, todayHumidity, todayWindSpeed, weatherMondayTemp, weatherTuesdayTemp, weatherWednesdayTemp, weatherThursdayTemp, weatherFridayTemp, weatherSaturdayTemp, weatherSundayTemp}) {
    const [locationInput, setLocationInput] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(locationInput);
        setLocationInput('');
    };

    const handleInputChange = (event) => {
        setLocationInput(event.target.value);
    };

    return (
        <section className='weather-info'>
            <div className="weather-info-time">
                <div className="precipitacao">
                    <h3>Precipitação</h3>
                    <div className="todayPop">
                        {todayPop}
                    </div>
                </div>
                <div className="umidade">
                    <h3>Umidade</h3>
                    <div className="todayHumidity">
                        {todayHumidity}
                    </div>
                </div>
                <div className="wind-speed">
                    <h3>Vel. do vento</h3> 
                    <div className="todayWindSpeed">
                        {todayWindSpeed} km/h
                    </div>
                </div>
            </div>
            <div className="weather-info-cards">
                <WeatherInfoCard temp={temp} weatherMondayIcon={weatherMondayIcon} weatherTuesdayIcon={weatherTuesdayIcon} weatherWednesdayIcon={weatherWednesdayIcon} weatherThursdayIcon={weatherThursdayIcon} weatherFridayIcon={weatherFridayIcon} weatherSaturdayIcon={weatherSaturdayIcon} weatherSundayIcon={weatherSundayIcon} weatherMondayTemp={weatherMondayTemp} weatherTuesdayTemp={weatherTuesdayTemp} weatherWednesdayTemp={weatherWednesdayTemp} weatherThursdayTemp={weatherThursdayTemp} weatherFridayTemp={weatherFridayTemp} weatherSaturdayTemp={weatherSaturdayTemp} weatherSundayTemp={weatherSundayTemp}/>
            </div>
            <form className='weather-location-form' onSubmit={handleSubmit}>
                <div className="input_box">
                    <input 
                    type="text"
                    name='location' 
                    value={locationInput}
                    onChange={handleInputChange}
                    placeholder='Digite sua localidade'
                    required />
                </div>
                <WeatherBtnSearch/>
            </form>
        </section>
    )
}

export default WeatherInfo;