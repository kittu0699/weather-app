import React, { useEffect, useRef, useState } from 'react'
import "./Weather.css";

import clear_icon from "../assets/sun.png";
import moon_icon from "../assets/moon.png";
import cloud_icon from "../assets/cloud.png";
import nCloud_icon from "../assets/nightCloud.png";
import rain_icon from "../assets/dRain.png"; 
import snow_icon from "../assets/dSnow.png" 
import wind_icon from "../assets/dWind.png"; 
import drizzle_icon from "../assets/drizzle.png"; 
import humidity_icon from "../assets/humidity.png"; 
import nRain_icon from "../assets/nRain.png"; 
import nSnow_icon from "../assets/nSnow.png"; 
import nWind_icon from "../assets/nWind.png";
import nDrizzle_icon from "../assets/nDrizzle.png";
import wind from "../assets/wind.png";
import humidity1_icon from "../assets/Humidity1.png"



const Weather = () => {

    const inputRef = useRef ();

    const [weatherData, setWeatherData] = useState(false);

   
    const allIcons = {
        "01d":clear_icon,
        "01n":moon_icon,
        "02d":wind_icon,
        "02n":nWind_icon,
        "03d":cloud_icon,
        "03n":nCloud_icon,
        "04d":drizzle_icon,
        "04n":nDrizzle_icon,
        "09d":rain_icon,
        "09n":nRain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13n":nSnow_icon,
        "50d":humidity1_icon,
        "50n":humidity1_icon
    }


const search = async (city) =>{

    if(city === ""){
        alert("Enter City Name");
        return;
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

        const response = await fetch(url);

        const data = await response.json();


        if(!response.ok){
            alert(data.message);
            return;
        }

        console.log(data);

        const icon = allIcons[data.weather[0].icon] || clear_icon;

        setWeatherData({
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            temperature: Math.floor(data.main.temp),
            location: data.name,
            icon: icon
        })


    } catch (error) {
        setWeatherData(false);
        console.error("Error in Fetching Weather Data");     
    }
}

    useEffect (()=>{
        search("Patna")
    },[]);

  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search' />
            <span className='icon' onClick={()=>search(inputRef.current.value)}>
            <i className="fa-solid fa-magnifying-glass "></i>
            </span>
        </div>
        { weatherData?
        <>
         <img src={weatherData.icon} alt="" className='weather-icon' />
        <p className="temperature">{weatherData.temperature}°c</p>
        <p className="location">{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity_icon} alt="humidity" />
            <div><p>{weatherData.humidity}%</p>
            <span>Humidity</span>
            </div> 
          </div>
          <div className="col">
            <img src={wind} alt="humidity" />
            <div>
            <p>{weatherData.windSpeed}Km/h</p>
            <span>Wind Speed</span>
            </div>
          </div>
        </div>
        </>:<></>
        }
       
    </div>
  )
}

export default Weather