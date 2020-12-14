/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import { useState, useEffect } from 'react'

const useClock = () => {
	const [time, setTime] = useState<Date>(new Date())
	let meridiem = time.toLocaleTimeString().split(':')[2].slice(3)

	useEffect(() => {
		const timer = setInterval(() => setTime(new Date()), 1000)
		return () => clearInterval(timer)
	}, [])


	return { time, meridiem }
}

export default useClock
