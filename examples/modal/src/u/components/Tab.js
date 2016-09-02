import React from 'react'

const Tab = (props) => {
  return (
    <li>
      <button
        onClick={props.handleClick}>
        {props.name}
      </button>
    </li>
  )
}

export default Tab
