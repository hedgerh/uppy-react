import React, { Component, PropTypes } from 'react'

class LocalTab extends Component {
  constructor () {
    super()

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    e.preventDefault()

    if (this._input) {
      this._input.click()
    }

    if (this.props.handleClick) {
      this.props.handleClick()
    }
  }

  render () {
    const {name, icon, handleInputChange} = this.props
    return (
      <li className='UppyDashboardTab'>
        <button className='UppyDashboardTab-btn UppyDashboard-focus'
                role='tab'
                tabIndex='0'
                onClick={this.handleClick}>
          {this.props.icon ? this.props.icon : null}
          <h5 className='UppyDashboardTab-name'>{this.props.name}</h5>
        </button>
        <input className='UppyDashboard-input' 
               type='file' 
               name='files[]' 
               multiple='true' 
               style={{ display: 'none' }}
               ref={(c) => this._input = c }
               onChange={this.props.handleInputChange}/>
      </li>
    )
  }
}

export default LocalTab
