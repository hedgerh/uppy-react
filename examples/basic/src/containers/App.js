import React, { Component, PropTypes } from 'react'
import { Provider } from 'uppy-base'
import { UppyInput } from 'uppy-react'

const googleDrive = new Provider({ 
  provider: 'google',
  host: 'http://localhost:3020' 
})

class App extends Component {
  constructor () {
    super()

    this.addFile = this.addFile.bind(this)
  }

  addFile (evt) {
    const files = Array.prototype.slice.call(evt.target.files || [], 0)

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
      <div>
        <UppyInput
          addFile={this.props.addFile}/>
        <ul>
          {this.props.files.map((file) => {
            return (
              <li key={file.name}>{file.name} - {file.type}</li>
            )
          })}
        </ul>
        <button onClick={this.props.startUpload}>Start Upload!</button>
      </div>
    )
  }
}

App.defaultProps = {
  files: []
}

App.propTypes = {
  files: PropTypes.array,
  addFile: PropTypes.func,
  removeFile: PropTypes.func,
  startUpload: PropTypes.func
}

export default App
