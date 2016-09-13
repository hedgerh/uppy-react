import React from 'react'

const Tab = (props) => {
  return (
    <li className='UppyDashboardTab'>
      <button className='UppyDashboardTab-btn'
              role='tab'
              tabIndex='0'
              aria-controls={`${props.panelSelectorPrefix}--${props.id}`}
              onClick={props.handleClick}>
        {props.icon ? props.icon : null}
        <h5 className='UppyDashboardTab-name'>{props.name}</h5>
      </button>
    </li>
  )
}

Tab.defaultProps = {
  panelSelectorPrefix: 'UppyDashboardContent-panel'
}

export default Tab
