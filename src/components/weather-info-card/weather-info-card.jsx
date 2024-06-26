import './weather-info-card.css';
import React,{ useState, useEffect } from 'react';

function WeatherInfoCard ({temp, weatherMondayIcon, weatherTuesdayIcon, weatherWednesdayIcon, weatherThursdayIcon, weatherFridayIcon, weatherSaturdayIcon, weatherSundayIcon, weatherMondayTemp, weatherTuesdayTemp, weatherWednesdayTemp, weatherThursdayTemp, weatherFridayTemp, weatherSaturdayTemp, weatherSundayTemp}) {
    const [daysOfWeek, setDaysOfWeek] = useState([]);

    useEffect(() => {
        const weekDays = ['Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.', 'Dom.'];
        const currentDate = new Date();
        const currentDayIndex = currentDate.getDay();

        const nextDaysOfWeek = [];
        for (let i = 0; i < 7; i++) {
            const dayIndex = (currentDayIndex + i) % 7;
            nextDaysOfWeek.push(weekDays[dayIndex]);
        }

        setDaysOfWeek(nextDaysOfWeek);
    }, []);

    const getTemperatureForDay = (day) => {
        switch (day) {
            case 'Seg.':
                return weatherMondayTemp;
            case 'Ter.':
                return weatherTuesdayTemp;
            case 'Qua.':
                return weatherWednesdayTemp;
            case 'Qui.':
                return weatherThursdayTemp;
            case 'Sex.':
                return weatherFridayTemp;
            case 'Sáb.':
                return weatherSaturdayTemp;
            case 'Dom.':
                return weatherSundayTemp;
            default:
                return null;
        }
    };

    return (
        <div className="weather-info-card-container">
            <div className="weather-info-card">
                {daysOfWeek.slice(0, 4).map((day, index) => (
                    <div className={`card-${day.toLowerCase()}`} key={index}>
                        {day === 'Seg.' && weatherMondayIcon && React.cloneElement(weatherMondayIcon, { className: 'weather-icon' })}
                        {day === 'Ter.' && weatherTuesdayIcon && React.cloneElement(weatherTuesdayIcon, { className: 'weather-icon' })}
                        {day === 'Qua.' && weatherWednesdayIcon && React.cloneElement(weatherWednesdayIcon, { className: 'weather-icon' })}
                        {day === 'Qui.' && weatherThursdayIcon && React.cloneElement(weatherThursdayIcon, { className: 'weather-icon' })}
                        {day === 'Sex.' && weatherFridayIcon && React.cloneElement(weatherFridayIcon, { className: 'weather-icon' })}
                        {day === 'Sáb.' && weatherSaturdayIcon && React.cloneElement(weatherSaturdayIcon, { className: 'weather-icon' })}
                        {day === 'Dom.' && weatherSundayIcon && React.cloneElement(weatherSundayIcon, { className: 'weather-icon' })}
                        <p>{day}</p>
                        <h4>{Math.round(getTemperatureForDay(day))}°C</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeatherInfoCard;
