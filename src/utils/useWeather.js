/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import { useState, useEffect } from 'react'
import Axios from 'axios'

// https://openweathermap.org/api/one-call-api

const log = (message, log) => console.log(`%c${message}`, 'color: lightskyblue', log)

const useWeather = () => {
	const [weather, setWeather] = useState({})

	const getCoords = (position) => {
		const lat = position.coords.latitude
		const lon = position.coords.longitude
		getWeather(lat, lon)
	}
	const getWeather = (lat, lon) => {
		let API = `https://api.openweathermap.org/data/2.5/`
		let LOCATION = `lat=${lat}&lon=${lon}`
		let EXCLUDE = `minutely,hourly,daily`
		let KEY = process.env.REACT_APP_WEATHER_KEY
		let ENDPOINT = `${API}onecall?${LOCATION}&units=imperial&exclude=${EXCLUDE}&appid=${KEY}`
		Axios.get(ENDPOINT)
			.then(res => {
				let results = {
					timezone: res.data.timezone.split('/')[1],
					temperature: Math.ceil(res.data.current.temp),
					humidity: res.data.current.humidity,
					condition: res.data.current.weather[0].main,
					description: `Today has ${res.data.current.weather[0].description}`,
					icon: `http://openweathermap.org/img/wn/${res.data.current.weather[0].icon}@2x.png`
				}
				setWeather(results)
				log('Weather Statistics', { weather: results });
			})
			.catch(() => {
				setWeather({ error: 'Weather data unavailable' })
			})
	}
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(getCoords)
	}, [])

	useEffect(() => {
		const timer = setInterval(() => navigator.geolocation.getCurrentPosition(getCoords), 60000)
		return () => clearInterval(timer)
	}, [])

	return (weather)
}

export default useWeather
