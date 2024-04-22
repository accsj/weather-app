import './weather-app.css';
import 'react-toastify/dist/ReactToastify.css';
import React, {useState, useEffect, useCallback, useMemo} from 'react';
import Axios from 'axios';
import WeatherCard from "../weather-card/weather-card";
import WeatherInfo from '../weather-info/weather-info';
import { IoMoonOutline } from "react-icons/io5";
import { FaRegSun } from "react-icons/fa";
import { CiCloudOn } from "react-icons/ci";
import { BsCloudRain } from "react-icons/bs";
import { BsCloudLightningRainFill } from "react-icons/bs";
import { BsCloudSnow } from "react-icons/bs";
import { FaWater } from "react-icons/fa";
import { toast } from 'react-toastify';

function WeatherApp () {
    const [cityName, setCityName] = useState('');
    const [cityCountry, setCityCountry] = useState('');
    const [temp, setTemp] = useState('');
    const [weatherTempDescription, setWeatherTempDescription] = useState ('');
    const [todayPop, setTodayPop] = useState('');
    const [todayHumidity, setTodayHumidity] = useState('');
    const [todayWindSpeed, setTodayWindSpeed] = useState('');
    const [weatherIcon, setWeatherIcon] = useState ();
    const [weatherMondayIcon, setWeatherMondayIcon] = useState();
    const [weatherTuesdayIcon, setWeatherTuesdayIcon] = useState();
    const [weatherWednesdayIcon, setWeatherWednesdayIcon] = useState();
    const [weatherThursdayIcon, setWeatherThursdayIcon] = useState();
    const [weatherFridayIcon, setWeatherFridayIcon] = useState();
    const [weatherSaturdayIcon, setWeatherSaturdayIcon] = useState();
    const [weatherSundayIcon, setWeatherSundayIcon] = useState();
    const key = 'c27ab44a0b57e90136bdc0673c16ef56';
    const translateWeather = useCallback((description) => {
        const weatherTranslations = {
            'clear sky': 'Céu limpo',
            'few clouds': 'Poucas nuvens',
            'scattered clouds': 'Nuvens dispersas',
            'broken clouds': 'Nuvens quebradas',
            'shower rain': 'Chuva passageira',
            'light rain': 'Chuva leve',
            'rain': 'Chuva',
            'thunderstorm': 'Trovoada',
            'snow': 'Neve',
            'mist': 'Névoa',
            'moderate rain': 'Chuva moderada',
            'overcast clouds': 'Nuvens nubladas',
        };
        return weatherTranslations[description] || description;
    }, []);


    const weatherIconMap = useMemo(() => ({
        '01d': <FaRegSun />,
        '01n': <IoMoonOutline />,
        '02d': <FaRegSun />,
        '02n': <IoMoonOutline />,
        '03d': <CiCloudOn />,
        '03n': <CiCloudOn />,
        '04d': <CiCloudOn />,
        '04n': <CiCloudOn />,
        '09d': <BsCloudRain />,
        '09n': <BsCloudRain />,
        '10d': <BsCloudRain />,
        '10n': <BsCloudRain />,
        '11d': <BsCloudLightningRainFill />,
        '11n': <BsCloudLightningRainFill />,
        '13d': <BsCloudSnow />,
        '13n': <BsCloudSnow />,
        '50d': <FaWater />,
        '50n': <FaWater />,
    }), []);

    // Código para quando fizer upgrade e conseguir a localização automática do usuário

    /*
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    useEffect (() => {
        navigator.geolocation.getCurrentPosition( location => {
            setLatitude(location.coords.latitude)
            setLongitude(location.coords.longitude)
        });

    }, [])*/

    useEffect(()=> {
        const fixedLocation = async () => {
            try {
                const response = await Axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=Rio de Janeiro&appid=${key}&units=metric`);
                setCityName(response.data.city.name);
                setCityCountry(response.data.city.country);
                setTemp(response.data.list[0].main.temp);
                setTodayPop(response.data.list[0].pop);
                setTodayHumidity(response.data.list[0].main.humidity);
                setTodayWindSpeed(response.data.list[0].wind.speed);
                const weatherDescription = response.data.list[0].weather[0].description;
                setWeatherTempDescription(translateWeather(weatherDescription));
                const weatherIconCode = response.data.list[0].weather[0].icon;
                setWeatherIcon(weatherIconMap[weatherIconCode]); 
                const weatherIconMonday = response.data.list[1].weather[0].icon;
                setWeatherMondayIcon(weatherIconMap[weatherIconMonday]);
                const weatherIconTuesday = response.data.list[2].weather[0].icon;
                setWeatherTuesdayIcon(weatherIconMap[weatherIconTuesday]);
                const weatherIconWednesday = response.data.list[3].weather[0].icon;
                setWeatherWednesdayIcon(weatherIconMap[weatherIconWednesday]);
                const weatherIconThursday = response.data.list[4].weather[0].icon;
                setWeatherThursdayIcon(weatherIconMap[weatherIconThursday]);
                const weatherIconFriday = response.data.list[5].weather[0].icon;
                setWeatherFridayIcon(weatherIconMap[weatherIconFriday]);
                const weatherIconSaturday = response.data.list[6].weather[0].icon;
                setWeatherSaturdayIcon(weatherIconMap[weatherIconSaturday]);
                const weatherIconSunday = response.data.list[7].weather[0].icon;
                setWeatherSundayIcon(weatherIconMap[weatherIconSunday]);
            } catch (err) {
                toast.error('Erro ao obter informações', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            }
        }
        fixedLocation();
    },[translateWeather, weatherIconMap]);


    const handleSubmit = async (inputLocation) => {
        try {
            const response = await Axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(inputLocation)}&appid=${key}&units=metric`);
            setCityName(response.data.city.name);
            setCityCountry(response.data.city.country);
            setTemp(response.data.list[0].main.temp);
            const weatherDescription = response.data.list[0].weather[0].description;
            setWeatherTempDescription(translateWeather(weatherDescription));
            const weatherIconCodeCurrentDay = response.data.list[0].weather[0].icon;
            setWeatherIcon(weatherIconMap[weatherIconCodeCurrentDay]); 
            const weatherIconMonday = response.data.list[1].weather[0].icon;
            setWeatherMondayIcon(weatherIconMap[weatherIconMonday]);
            const weatherIconTuesday = response.data.list[2].weather[0].icon;
            setWeatherTuesdayIcon(weatherIconMap[weatherIconTuesday]);
            const weatherIconWednesday = response.data.list[3].weather[0].icon;
            setWeatherWednesdayIcon(weatherIconMap[weatherIconWednesday]);
            const weatherIconThursday = response.data.list[4].weather[0].icon;
            setWeatherThursdayIcon(weatherIconMap[weatherIconThursday]);
            const weatherIconFriday = response.data.list[5].weather[0].icon;
            setWeatherFridayIcon(weatherIconMap[weatherIconFriday]);
            const weatherIconSaturday = response.data.list[6].weather[0].icon;
            setWeatherSaturdayIcon(weatherIconMap[weatherIconSaturday]);
            const weatherIconSunday = response.data.list[7].weather[0].icon;
            setWeatherSundayIcon(weatherIconMap[weatherIconSunday]);
        } catch (err) {
            toast.error('Erro ao obter informações', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
    };

    return (
        <main className="weather-app-container">
            <WeatherCard cityName={cityName} cityCountry={cityCountry} temp={temp} weatherTempDescription={weatherTempDescription} weatherIcon={weatherIcon}/>
            <WeatherInfo onSubmit={handleSubmit} temp={temp} weatherMondayIcon={weatherMondayIcon} weatherTuesdayIcon={weatherTuesdayIcon} weatherWednesdayIcon={weatherWednesdayIcon} weatherThursdayIcon={weatherThursdayIcon} weatherFridayIcon={weatherFridayIcon} weatherSaturdayIcon={weatherSaturdayIcon} weatherSundayIcon={weatherSundayIcon} todayPop={todayPop} todayHumidity={todayHumidity} todayWindSpeed={todayWindSpeed}/>
        </main>
    )
}

export default WeatherApp;