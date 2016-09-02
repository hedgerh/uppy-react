import React, { PropTypes } from 'react'
import Tab from './Tab'
import LocalTab from './LocalTab'

const _renderTabs = ({ tabs, addFile, handleTabClick }) => {
  if (!tabs || !tabs.map) { return }

  return tabs.map((tab) => {
    if (tab.id === 'local') {
      return (
        <LocalTab
          key={tab.id}
          handleClick={handleTabClick} 
          handleInputChange={addFile}
          {...tab}/>
      )
    }

    return <Tab key={tab.id} handleClick={handleTabClick} {...tab}/>
  })
}

const Header = (props) => {
  return (
    <div>
      <ul>
        { _renderTabs(props) }
      </ul>
    </div>
  )
}

Header.defaultProps = {
  tabs: []
}

Header.propTypes = {
  tabs: PropTypes.array
}

export default Header
