import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
import styles from '../styles/greeting.module.scss'

import Moment from 'react-moment';

const Greeting = () => {
	const [{ user }] = useStateValue()

	return (
		<div className={styles.greeting}>
			<Clock />
			<h1>Hello {user.details.username}</h1>
		</div>
	)
}

export default Greeting

const Clock = () => {
	const [time, setTime] = useState(new Date())
	const timer = setInterval(() => setTime(new Date()), 1000)

	useEffect(() => {
		setTime(new Date())
		return () => clearInterval(timer)
	}, [])

	return (
		<div className={styles.clock}>
			<p className={styles.time}><Moment format="LT">{new Date()}</Moment></p>
			<p className={styles.date}>{time.toDateString()}</p>
		</div>
	)
}
