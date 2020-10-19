import React from 'react'
import Moment from 'react-moment';
import { useStateValue } from '../global/state'
import useWeather from '../utils/useWeather';
import useClock from '../utils/useClock';

import loader from '../assets/spinner.gif'

import styles from '../styles/common/greeting.module.scss'

const Greeting = () => {
	const [{ user }] = useStateValue()
	const { meridiem } = useClock()

	useWeather()

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
	const [{ weather: { loading, temperature, humidity, icon, description, error } }] = useStateValue()

	if (error) return <h1>{error}</h1>

	return (
		<div className={styles.weather}>
			<div className={styles.top}>
				{loading
					? <p className={styles.description}>Fetching Weather</p>
					: <p className={styles.description}>Today has {description}</p>
				}

			</div>
			<div className={styles.bottom}>
				<div className={styles.temperature}>
					{loading
						? <p><img className={styles.loader} src={loader} alt="" /></p>
						: <h1>{temperature}<span className={styles.symbol}>°</span></h1>
					}
					<p>Temperature</p>
				</div>
				<div className={styles.icon}><img src={icon} draggable={false} alt="" /></div>
				<div className={styles.humidity}>
					{loading
						? <p><img className={styles.loader} src={loader} alt="" /></p>
						: <h1>{humidity}<span className={styles.symbol}>%</span></h1>
					}
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
