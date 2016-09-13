import React, { Component, PropTypes } from 'react'
import Header from '../components/Header'

class UppyDashboard extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <div>
        <h2>Dashboard:</h2>
        <button onClick={this.props.startUpload}>Start Upload</button>
        <ul>
          {this.props.files.map((file) => {
            return <li>{file.name}</li>
          })}
        </ul>
      </div>
    )
  }
}

module.exports = UppyDashboard
