import React, { Component, PropTypes } from 'react'
import Tab from './Tab'
import LocalTab from './LocalTab'

class Header extends Component {
  constructor () {
    super()

    this.renderTabs = this.renderTabs.bind(this)
  }

  renderTabs () {
    const { tabs, addFile, handleTabClick } = this.props

    if (!tabs || !tabs.map) { return }

    return tabs.map((tab) => {
      if (tab.id === 'dashboard') {
        return (
          <LocalTab
            key={tab.id}
            handleClick={() => handleTabClick(tab.id)} 
            handleInputChange={addFile}
            {...tab}/>
        )
      }

      return (
        <Tab 
          key={tab.id} 
          handleClick={() => handleTabClick(tab.id)} 
          {...tab}/>
      )
    })
  }

  render () {
    return (
      <div className='UppyDashboardTabs'>
        <h3 className='UppyDashboardTabs-title'>Drop files here, paste or import from</h3>
        <nav>
          <ul className='UppyDashboardTabs-list' role='tablist'>
            { this.renderTabs() }
          </ul>
        </nav>
      </div>
    )
  }
}

Header.defaultProps = {
  tabs: []
}

Header.propTypes = {
  tabs: PropTypes.array
}

export default Header
