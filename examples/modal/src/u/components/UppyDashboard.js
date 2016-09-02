import React, { Component, PropTypes } from 'react'
import Header from '../components/Header'

class UppyDashboard extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <div>
        <Header
          handleClick={this.props.setActiveTab}
          tabs=[{
            id: 'local',
            name: 'Local Disk',
            icon: 'local'
          }, {
            id: 'google',
            name: 'Google Drive',
            icon: 'google'
          }, {
            id: 'webcam',
            name: 'Webcam',
            icon: 'webcam'
          }]
          />
      </div>
    )
  }
}

module.exports = UppyDashboard
