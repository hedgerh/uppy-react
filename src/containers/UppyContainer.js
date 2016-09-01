import React, { Component, PropTypes } from 'react'

class UppyContainer extends Component {
  constructor() {
    super()
    this.state = {
      files: []
    }

    this.addFile = this.addFile.bind(this)
    this.removeFile = this.removeFile.bind(this)
    this.startUpload = this.startUpload.bind(this)
  }

  componentWillMount () {
    const {uploader, endpoint} = this.props

    if (!uploader || !endpoint) {
      console.log('ERROR: Uploader or endpoint not defined')
      return
    }

    const Uploader = uploader
    this.uploader = new Uploader({ endpoint })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.uploader !== this.props.uploader) {
      this.uploader = new Uploader({
        endpoint: nextProps.endpoint
      })
    }

    if (nextProps.endpoint !== this.props.endpoint) {
      this.uploader.opts.endpoint = nextProps.endpoint
    }
  }
  
  addFile (file) {
    const {files} = this.state
    this.setState({
      files: files.concat([file])
    })
  }

  removeFile (fileID) {
    const filteredFiles = this.state.files.filter((file) => {
      return file.id !== fileID
    })

    this.setState({
      files: filteredFiles
    })
  }
  
  startUpload() {
    this.uploader.start(this.state.files)
  }
  
  render () {
    const {children} = this.props
    const propsToPass = {
      files: this.state.files,
      addFile: this.addFile,
      removeFile: this.removeFile,
      startUpload: this.startUpload
    }
    console.log(React.Children.map(children, (child) => React.cloneElement(child, propsToPass)))
    return (
      // probably should only allow this.props.children.length === 1
      <div>
        { children.length > 1 ? React.Children.map(this.props.children, (child) => React.cloneElement(child, propsToPass)) : React.cloneElement(children, propsToPass) }
      </div>
    )
  }
}

UppyContainer.defaultProps = {}

UppyContainer.propTypes = {}

export default UppyContainer