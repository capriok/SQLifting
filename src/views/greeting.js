/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/import React from 'react'
import { useStateValue } from '../state'
import styles from '../styles/greeting.module.scss'

import Moment from 'react-moment';
import useWeather from '../utils/useWeather';
import useClock from '../utils/useClock';


const Greeting = () => {
	const [{ user }] = useStateValue()
	const { meridiem } = useClock()

	let greeting = 'Hello'
	switch (meridiem) {
		case 'AM':
			greeting = 'Good morning'
			break;
		case 'PM':
			greeting = 'Good afternoon'
			break;
		default:
			break;
	}

	return (
		<div className={styles.greeting}>
			<h1 className={styles.message}>{greeting} {user.details.username.capitalize()}</h1>
			<Weather />
			<Clock />
		</div>
	)
}

export default Greeting

const Weather = () => {
	const [{ weather: { temperature, humidity, icon, description, error } }] = useStateValue()
	if (error) return <h1>{error}</h1>
	return (
		<div className={styles.weather}>
			<div className={styles.top}>
				<p className={styles.description}>Today has {description}</p>
			</div>
			<div className={styles.bottom}>
				<div className={styles.temperature}>
					<h1>{temperature}<span className={styles.symbol}>°</span></h1>
					<p>Temperature</p>
				</div>
				<img className={styles.icon} src={icon} draggable={false} alt="" />
				<div className={styles.humidity}>
					<h1>{humidity}<span className={styles.symbol}>%</span></h1>
					<p>Humidity</p>
				</div>
			</div>
		</div>
	)
}

const Clock = () => {
	const { time } = useClock()

	return (
		<div className={styles.clock}>
			<p className={styles.time}><Moment format="LT">{time}</Moment></p>
			<p className={styles.date}>{time.toDateString()}</p>
		</div>
	)
}
