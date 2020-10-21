/*eslint react-hooks/exhaustive-deps: "off"*/
import React, { useState, useEffect } from 'react'

import styles from '../../styles/workout/timer.module.scss'

const Timer = () => {
	const INIT_TIMER = { min: 0, sec: 58, on: false }

	const [timer, setTimer] = useState(INIT_TIMER)

	const TIME = `${pad(timer.min)}:${pad(timer.sec)}`

	useEffect(() => {
		setTimer({ ...timer, on: true })
	}, [])

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (timer.on === true) {
				setTimer({ ...timer, sec: timer.sec + 1 })
				if (timer.sec === 59) {
					setTimer({ ...timer, min: timer.min + 1, sec: 0 })
				}
			}
		}, 1000);

		return () => {
			clearTimeout(timeout);
		}
	}, [timer.clock, timer.min, timer.sec, timer.on])

	useEffect(() => {
		let min = timer.min
		if (min === 0) return
		if (min <= 1) return
		let count = 0
		let chimer = setInterval(() => {
			count++
			if (count === min - 1) clearInterval(chimer)
		}, 750);
	}, [timer.min])

	return (
		<>
			<p className={styles.timer}>{TIME}</p>
		</>
	)
}

export default Timer

const pad = (n) => {
	while (n < 10) {
		return `0${n.toString()}`
	}
	return n.toString()
}
