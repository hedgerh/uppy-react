import React, { Component, PropTypes } from 'react'
import { Provider, Webcam } from 'uppy-base'
import extend from '../utils/extend'

class UppyContainer extends Component {
  constructor(props, context) {
    super(props, context)
    this.addFile = this.addFile.bind(this)
    this.auth = this.auth.bind(this)
    this.getInitialProviderState = this.getInitialProviderState.bind(this)
    this.getUploader = this.getUploader.bind(this)
    this.list = this.list.bind(this)
    this.logout = this.logout.bind(this)
    this.removeFile = this.removeFile.bind(this)
    this.startUpload = this.startUpload.bind(this)
    this.validServerProps = this.validServerProps.bind(this)
    this.startWebcam = this.startWebcam.bind(this)
    this.stopWebcam = this.stopWebcam.bind(this)
    this.takeSnapshot = this.takeSnapshot.bind(this)
    this.setIn = this.setIn.bind(this)

    this.state = this.getInitialState()
  }

  componentDidMount () {
  }

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

  // Initialization Helpers

  /**
   * Creates a new instance of the given Uploader plugin.
   * @param  {Uploader} uploader  Uppy plugin of 'uploader' type
   * @param  {String}   endpoint  Target endpoint for file uploads
   * @return {Uploader}           Instance of given uploader plugin
   */
  getUploader (uploader) {

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
   * Uppy Server Helper Methods
   */
  /**
   * Checks authentication status of user with given provider.
   * Wraps Provider's `auth` method to handle updating state after calling.
   * after calling.  
   * Wrapped method is passed down to user as props.
   * @param  {Provider} provider Provider plugin
   * @return {fn}                Wrapped auth fn
   */
  auth (provider) {
    return () => {
      return provider.auth()
      .then((authed) => {
        this.setIn(provider.id, { authed }, 'sources')
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
        console.log(data)
        // const files = this.processFiles(data)
        this.setIn(provider.id, { files: data.items }, 'sources')
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
          this.setIn(provider.id, {
            authed: false,
            files: [],
            folders: []
          }, 'sources')
        }

        return result
      })
    }
  }

  /**
   * Wrapper for updating state, even state that is
   * nested.
   * @param  {String} key       State key to update
   * @param  {[type]} newState  Replaces old state at key
   * @param  {[type]} parentKey Key of parent if key is nested
   */
  setIn (key, newState, parentKey) {
    // TODO: Make deep nested updates prettier
    // TODO: Make nested updates infinitely deep
    if (parentKey) {
      const parent = this.state[parentKey]
      const updatedState = extend(parent[key], newState)

      this.setState({
        [parentKey]: extend(parent, {
          [key]: updatedState
        })
      })
    } else {
      const updatedState = extend(this.state[key], newState)

      this.setState({
        [key]: updatedState
      })
    }
  }

  /**
   * Start uploading the files in queue.
   * @return {Promise} Resolves when all uploads are completed.
   */
  startUpload() {
    return this.uploader.start(this.state.files)
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
