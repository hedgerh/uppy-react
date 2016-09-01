import React, { Component, PropTypes } from 'react'
const { toArray } = require('uppy-utils')

class FormInput extends Component {
  constructor() {
    super()

    this.addFile = this.addFile.bind(this)
  }

  addFile (event) {
    if (!this.props.addFile) {
      return 'Error: No addFile method provided!'
    }

    const files = toArray(event.target.files)
    // const files = Array.prototype.slice.call(event.target.files || [], 0)

    files.forEach((file) => {
      this.props.addFile({
        name: file.name,
        type: file.type,
        data: file
      })
    })
  }

  render () {
    return (
      <input 
        type='file'
        name='files[]'
        onChange={this.addFile}
        {...this.props}/>
    )
  }
}

FormInput.propTypes = {
  addFile: PropTypes.fun.isRequired
}

export default FormInput
