import React, { Component, PropTypes } from 'react'
import { toArray } from 'uppy-utils'

class FormInput extends Component {
  constructor() {
    super()

    this.addFile = this.addFile.bind(this)
  }

  addFile (event) {
    if (!this.props.addFile) {
      return 'Error: No addFile method provided!'
    }

    const files = Array.prototype.slice.call(event.target.files || [], 0)

    files.forEach((file) => {
      this.props.addFile({
        name: file.name,
        type: file.type,
        data: file
      })
    })
  }

  render () {
    let propsToPass = {}

    // filtering out the addFile and children props to pass to our input element
    Object.keys(this.props).forEach((prop) => {
      if (prop !== 'children' && prop !== 'addFile') {
        propsToPass[prop] = this.props[prop]
      }
    })
    return (
      <input 
        type='file'
        name='files[]'
        {...propsToPass}
        onChange={this.addFile}/>
    )
  }
}

FormInput.propTypes = {
  addFile: PropTypes.func.isRequired
}

module.exports = FormInput
