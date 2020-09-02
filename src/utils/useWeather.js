/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import { useEffect } from 'react'
import Axios from 'axios'
import { useStateValue } from '../state/state'

import placeholder from '../images/weather_placeholder.png'

// https://openweathermap.org/api/one-call-api

const useWeather = () => {
	const [{ user, weather }, dispatch] = useStateValue()

	const getWeather = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			const lat = position.coords.latitude
			const lon = position.coords.longitude
			const API = `https://api.openweathermap.org/data/2.5/`
			const LOCATION = `lat=${lat}&lon=${lon}`
			const EXCLUDE = `minutely,hourly,daily`
			const KEY = process.env.REACT_APP_WEATHER_KEY
			const ENDPOINT = `${API}onecall?${LOCATION}&units=imperial&exclude=${EXCLUDE}&appid=${KEY}`
			Axios.get(ENDPOINT)
				.then(res => {
					const results = {
						timezone: res.data.timezone.split('/')[1],
						temperature: Math.ceil(res.data.current.temp),
						humidity: res.data.current.humidity,
						description: res.data.current.weather[0].description,
						icon: `http://openweathermap.org/img/wn/${res.data.current.weather[0].icon}@2x.png`
					}
					dispatch({
						type: 'WEATHER_ACTION',
						weather: results
					})
					console.log('%cWeather Statistics', 'color: lightskyblue', { weather: results });
				})
				.catch(() => {
					dispatch({
						type: 'WEATHER_ACTION',
						error: 'Weather data unavailable'
					})
				})
		})
	}

	useEffect(() => {
		if (!user.isAuthenticated) return
		if (Object.keys(weather).length === 0) {
			dispatch({
				type: 'WEATHER_ACTION',
				weather: {
					timezone: 'Unknown',
					temperature: 0,
					humidity: 0,
					description: 'no weather data',
					icon: placeholder
				}
			})
		}
		getWeather()
		const fiveMinute = setInterval(() => {
			if (window.location.pathname !== '/') return
			getWeather()
		}, 300000)
		const thirtyMinute = setInterval(() => getWeather(), 1500000)
		return () => {
			clearInterval(fiveMinute)
			clearInterval(thirtyMinute)
		}
	}, [])

	return (weather)
}

export default useWeather
