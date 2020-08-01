import React from 'react'

const TypeHead = ({ children, title }) => {
  return (
    <>
      <div className="type">
        <span className="type-title">{title}</span>
        <span className="type-action">
          {children}
        </span>
      </div>
    </>
  )
}

export default TypeHead 