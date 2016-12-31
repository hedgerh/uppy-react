import React, { Component, PropTypes } from 'react'
import { Provider, Webcam } from 'uppy-base'
import extend from '../utils/extend'

class UppyContainer extends Component {
  constructor(props, context) {
    super(props, context)
    this.getInitialState = this.getInitialState.bind(this)
    this.getUploader = this.getUploader.bind(this)
    this.auth = this.auth.bind(this)
    this.list = this.list.bind(this)
    this.logout = this.logout.bind(this)
    this.addFile = this.addFile.bind(this)
    this.removeFile = this.removeFile.bind(this)
    this.startUpload = this.startUpload.bind(this)
    this.validServerProps = this.validServerProps.bind(this)
    this._setIn = this._setIn.bind(this)

    this.state = this.getInitialState()
  }

  /**
   * Get the initial component state.
   * @return {Object} The initial component state
   */
  getInitialState () {
    let sourceState = {}

    this.props.sources.forEach((source) => {
      if (sourceState.hasOwnProperty(source.id)) {
        throw new Error(`Duplicate source ids for ${source.id}`)
      }

      sourceState[source.id] = source.getInitialState()
    })

    return {
      files: [],
      sources: sourceState
    }
  }

  /**
   * Checks if valid server props have been provided.
   * @param  {[type]} server [description]
   * @return {[type]}        [description]
   */
  validServerProps (server) {
    if (!server) { return false }
    if (!server.providers || !server.host) { return false }
    return (server.providers.length > 0 && typeof server.host === 'string')
  }

  /**
   * Checks authentication status of user with given provider.
   * Wraps Provider's `auth` method to handle updating state after calling.
   * Wrapped method is passed down to user as props.
   * @param  {Provider} provider Provider plugin
   * @return {fn}                Wrapped auth fn
   */
  auth (provider) {
    return () => {
      return provider.auth()
      .then((authed) => {
        this._setIn('sources', provider.id, { authed })
        return authed
      })
    }
  }

  /**
   * Fetches a list of files from provider.
   * Wraps Provider's `list` method to handle updating state after calling.
   * Wrapped method is passed down to user as props.
   * @param  {Provider} provider Provider plugin
   * @return {fn}                Wrapped auth fn
   */
  list (provider) {
    return (directory) => {
      return provider.list(directory)
      .then((data) => {
        this._setIn('sources', provider.id, { files: data.items })
        return data
      })
    }
  }

  /**
   * Logs user out of given provider.
   * Wraps Provider's `logout` method to handle updating state after calling.
   * Wrapped method is passed down to user as props.
   * @param  {Provider} provider Provider plugin
   * @return {fn}                Wrapped auth fn
   */
  logout (provider) {
    return () => {
      return provider.logout()
      .then((result) => {
        if (result.ok) {
          this._setIn('sources', provider.id, provider.getInitialState())
        }

        return result
      })
    }
  }

  /**
   * Add a file to upload
   * @param {Object} file File to add
   */
  addFile (file) {
    this.setState({
      files: this.state.files.concat([file])
    })
  } 

  /**
   * Remove a file from upload queue.
   * @param {String} id File ID to remove
   */
  removeFile (id) {
    const files = this.state.files.filter((file) => {
      return file.id !== id
    })

    this.setState({ files })
  }

  /**
   * Start uploading the files in queue.
   * @return {Promise} Resolves when all uploads are completed.
   */
  startUpload() {
    return this.uploader.start(this.state.files)
  }

  /**
   * Helper for updating state, even state that is
   * nested.
   * @param  {String} key       State key to update
   * @param  {[type]} newState  Replaces old state at key
   * @param  {[type]} parentKey Key of parent if key is nested
   */
  _setIn (parentKey, key, newState) {
    if (!parentKey) {
      this.setState({
        [key]: extend(this.state[key], newState)
      })

      return
    }
    
    const parent = this.state[parentKey]
    const updatedState = extend(parent[key], newState)

    this.setState({
      [parentKey]: extend(parent, {
        [key]: updatedState
      })
    })
  }

  render () {
    if (React.Children.count(this.props.children) > 1) {
      throw new Error('Uppy: UppyContainer should have no more than one child.')
      return
    }

    const uppyProps = extend(this.state, {
      addFile: this.addFile,
      removeFile: this.removeFile,
      startUpload: this.startUpload
    })

    return (
      <div>
        { React.Children.map(this.props.children, (child) => React.cloneElement(child, { uppy: uppyProps })) }
      </div>
    )
  }
}

UppyContainer.defaultProps = {}

UppyContainer.propTypes = {}

module.exports = UppyContainer
