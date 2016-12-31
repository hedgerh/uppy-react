import React, { Component, PropTypes } from 'react'
import Auth from './Auth'

class FileBrowser extends Component {
  constructor () {
    super()

    this.addFile = this.addFile.bind(this)
  }

  componentWillMount () {
    if (!this.props.authed) {
      this.props.auth()
    }

    if (this.props.authed && this.props.files.length === 0) {
      this.props.list()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.authed !== this.props.authed) {
      this.props.list()
    }
  }

  addFile (file) {
    const tagFile = {
      data: file,
      name: file.title,
      type: file.mimeType,
      isRemote: true,
      remote: {
        body: {
          fileId: file.id
        },
        provider: this.props.id
      }
    }

    this.props.addFile(tagFile)
  }

  render () {
    if (this.props.authed === false) {
      return <Auth authURL={this.props.authURL}/>
    }

    return (
      <div>
        {this.props.name}
        {this.props.files.map((file) => {
          return <div onClick={() => this.addFile(file)} key={file.id}>{file.title}</div>
        })}
      </div>
    )
  }
}

export default FileBrowser
