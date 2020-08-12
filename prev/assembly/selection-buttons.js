import React from 'react'
import { Tooltip } from 'react-tippy'
import unselect from '../../gallery/unselect.png'
import trash from '../../gallery/trash.png'

const SelectionButtons = ({ cancelClick, submitClick }) => {
  return (
    <>
      <Tooltip
        title="Cancel selection"
        position="bottom"
        trigger="mouseenter">
        <img src={unselect} alt="" className="type-action-img"
          onClick={cancelClick} />
      </Tooltip>
      <Tooltip
        title="Delete Selection"
        position="bottom"
        trigger="mouseenter">
        <img src={trash} alt="" className="type-action-img"
          onClick={submitClick} />
      </Tooltip>
    </>
  )
}

export default SelectionButtons
