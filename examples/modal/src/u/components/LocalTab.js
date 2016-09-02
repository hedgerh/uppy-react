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
    return (
      <li>
        <button
          onClick={this.handleClick}>{this.props.name}</button>
        <input
          type='file'
          name='files[0]'
          onChange={this.props.handleInputChange}
          style={{ display: 'none' }} 
          ref={(c) => this._input = c }/>
      </li>
    )
  }
}

export default LocalTab
