import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Today from "./Today";
import Forecast from "./Forecast";
import Daily from "./Daily";
import {convertTime, convertDate, capitalizeNormal} from "./Utils";

export default function Weather() {
    const openWeatherAPIKey = '78009687f27f486b7721bd70f2fb3df9'
    const openWeatherAPIUrlBase = 'https://api.openweathermap.org/data/3.0/onecall'
    const [current, setCurrent] = useState({})
    const [forecasts, setForecasts] = useState([])
    const [city, setCity] = useState("New York")
    const [zipCode, setZipCode] = useState(10001)
    const [lat, setLat] = useState(40.7128)
    const [lon, setLon] = useState(-74.0060)
    const zipCodeRef = useRef()
    const [isCurrent, setIsCurrent] = useState(false)

    // On load and updated state, get the weather at the current location
    useEffect(() => {
        setIsCurrent(true)
        getWeather(lat, lon)
        return () => {
            setIsCurrent(false)
        }
    }, [zipCode, lat, lon])

    // When submit button is pressed, update the state with new zipCode
    const submitZip = async () => {
        getCoordinatesWithZip(zipCodeRef.current.value)
    };

    // Call API to get coordinates associated with new zipCode and update state
    const getCoordinatesWithZip = async (zip) => {
        await axios.get('http://api.openweathermap.org/geo/1.0/zip', {
            params: {
                zip: zip,
                appid: openWeatherAPIKey
            }
        }).then((response) => {
            console.log(response)
            setLat(response.data.lat)
            setLon(response.data.lon)
            setCity(response.data.name)
            setZipCode(zip)
        }).catch((error) => {
            console.log(error)
        })
    }

    // Update state with current weather conditions (today + 7 day forecast)
    const setCurrentConditions = (data) => {
        let currentConditions = {}
        currentConditions.city = city
        currentConditions.description = capitalizeNormal(data.current.weather[0].description)
        currentConditions.temp = data.current.temp
        currentConditions.dailyHi = data.daily[0].temp.max
        currentConditions.dailyLo = data.daily[0].temp.min
        currentConditions.windSpeed = data.current.wind_speed
        currentConditions.humidity = data.current.humidity
        currentConditions.pressure = data.current.pressure
        currentConditions.sunrise = convertTime(data.current.sunrise)
        currentConditions.sunset = convertTime(data.current.sunset)
        setCurrent(currentConditions)
        parseDailyForecasts(data.daily)
    };

    // Parse daily forecast data with day of week, temps, and description for each day
    const parseDailyForecasts = (rawDailies) => {
        let newForecasts = []
        for (let i = 0; i < 7; i++) {
            let thisForecast = rawDailies[i]
            let newDay = {
                date: convertDate(thisForecast.dt),
                temp_max: thisForecast.temp.max,
                temp_min: thisForecast.temp.min,
                description: capitalizeNormal(thisForecast.weather[0].description)
            }
            if(i === 0) {
                newDay.date = 'Today'
            }
            newForecasts.push(<Daily daily={newDay}/>)
        }
        setForecasts(newForecasts)
    }

    // Call OpenWeather API (onecall) to get weather data for current location
    const getWeather = (lat, lon) => {
        axios.get(openWeatherAPIUrlBase, {
                params: {
                    lat: lat,
                    lon: lon,
                    appid: openWeatherAPIKey,
                    exclude: 'minutely,hourly,alerts',
                    units: 'imperial'
                },
            }).then((response) => {
            console.log(response)
            setCurrentConditions(response.data)
            }).catch((error) => {
                console.log(error)
            })
    };

    return ( isCurrent && (
        <>
            <div class="container">
                <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css"></link>
                <main class="container">
                    <section></section>
                    <h1>Weather</h1>
                    <div id="input">
                        <input type="text" placeholder="Enter Zip Code:" ref={zipCodeRef}></input>
                        <button type="submit" onClick={submitZip}>Submit</button>
                    </div>
                    <div class="grid">
                        <Today current={current} />
                        {forecasts && <Forecast dailyForecasts={forecasts}/>}
                    </div>
                </main>
            </div>
        </>
    ))
}

