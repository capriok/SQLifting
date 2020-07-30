import React from 'react'
import Input from 'godspeed/build/Input'
import useBoxControl from '../../hooks/useBoxControl';

const TypeMap = ({ arr, type, prop, setter }) => {
  const { controlDBCheckbox } = useBoxControl()
  return (
    <div className="type-map">
      {arr.length > 0
        ? arr.map((item, i) => (
          <div className="item" key={i}>
            <div className="shift">
              <label className="label">
                <Input className="input" type="checkbox" checked={item.checked}
                  onChange={() => controlDBCheckbox(i, type, prop, setter)} />
                <div className="item-name">{item.name}</div>
              </label>
            </div>
          </div>
        ))
        : <div className="item">
          <p className="shift no-res">No Results</p>
        </div>}
    </div>
  )
}

export default TypeMap
