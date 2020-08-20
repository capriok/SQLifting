import React from 'react'
import plus from '../gallery/plus.png'
import minus from '../gallery/minus.png'

const CountSetter = ({ count, incrementer, decrementer }) => {
  return (
    <div className="number-setter">
      <div className="dec" onClick={decrementer}><img src={minus} alt="" /></div>
      <div className="field">{count}</div>
      <div className="inc" onClick={incrementer}><img src={plus} alt="" /></div>
    </div>
  )
}

export default CountSetter
