/*eslint react-hooks/exhaustive-deps: "off"*/
import React, { useState, useEffect } from 'react'
import { useTimer } from 'use-timer';

const Timer = () => {
  // const { time, start, pause, reset, isRunning } = useTimer({ initialTime: 0 })
  const { time, start, reset } = useTimer({ initialTime: 0 })
  const [min, setMin] = useState(0)
  const [sec, setSec] = useState(0)

  const resetClock = () => { reset(); start() }

  useEffect(() => {
    if (time > 9) setSec(null)
    if (time === 60) {
      resetClock()
      setMin(() => min + 1)
      setSec(0)
    }
  }, [time])

  useEffect(() => {
    start()
    return () => {
      reset()
    }
  }, [])

  return <div>{min}:{sec}{time}</div>
}

export default Timer
