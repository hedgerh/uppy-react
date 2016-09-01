import React, { Component, PropTypes } from 'react'
import { Provider, Webcam } from 'uppy-base'

function extend (...objs) {
  return Object.assign.apply(this, [{}].concat(objs))
}

class UppyContainer extends Component {
  constructor() {
    super()

    this.webcam = new Webcam()

    this.state = {
      files: [],
      webcam: {
        stream: null,
        start: this.startWebcam(this.webcam),
        stop: this.stopWebcam(this.webcam),
        takeSnapshot: this.takeSnapshot(this.webcam)
      }
    }

    // bind `this` to methods
    this.addFile = this.addFile.bind(this)
    this.auth = this.auth.bind(this)
    this.getInitialProviderState = this.getInitialProviderState.bind(this)
    this.getProviders = this.getProviders.bind(this)
    this.getUploader = this.getUploader.bind(this)
    this.list = this.list.bind(this)
    this.logout = this.logout.bind(this)
    this.removeFile = this.removeFile.bind(this)
    this.startUpload = this.startUpload.bind(this)
    this.checkServerProps = this.checkServerProps.bind(this)
    this.startWebcam = this.startWebcam.bind(this)
    this.stopWebcam = this.stopWebcam.bind(this)
    this.takeSnapshot = this.takeSnapshot.bind(this)
    this._update = this._update.bind(this)
  }

  componentDidMount () {
    const { uploader, server } = this.props
    this.uploader = this.getUploader(uploader)

    if (this.checkServerProps(server)) {
      const { providers, host } = server

      this.providers = this.getProviders(providers, host)
      this.setState({
        providers: this.getInitialProviderState(this.providers)
      })
    }

    this.webcam.init()
  }


  /**
   * Initialization Helpers - Pretty boring stuff
   */

  /**
   * Creates a new instance of the given Uploader plugin.
   * @param  {Uploader} uploader  Uppy plugin of 'uploader' type
   * @param  {String}   endpoint  Target endpoint for file uploads
   * @return {Uploader}           Instance of given uploader plugin
   */
  getUploader (uploader) {
    if (!uploader) {
      throw new Error('UppyContainer: Missing uploader prop.')
      return
    }
    if (!uploader.use) {
      throw new Error('UppyContainer: No upload plugin provided to uploader.use prop')
      return
    } 

    if (!uploader.endpoint) {
      throw new Error('UppyContainer: No upload endpoint provided to uploader.endpoint prop')
      return
    }

    const Uploader = uploader.use

    // TODO: error check to make sure uploader is legit
    return new Uploader({
      endpoint: uploader.endpoint
    })
  }

  /**
   * Creates new Provider instances for each
   * given provider name.
   * @param  {Array<String>} providers  Provider names
   * @param  {String} host              Endpoint for Uppy Server
   * @return {Object}                   Provider instances
   */
  getProviders (providers, host) {
    let _providers = {}

    providers.forEach((provider) => {
      if (!_providers.hasOwnProperty(provider)) {
        _providers[provider] = new Provider({
          provider: provider,
          host: host
        })
      }
    })

    return _providers
  }

  /**
   * Generates an initial state for all of the given
   * provider plugins.
   * @param  {Object} providers Provider plugins
   * @return {Object}           Initial provider state
   */
  getInitialProviderState (providers) {
    let initialState = {}

    if (providers) {
      Object.keys(providers).forEach((id) => {
        const provider = providers[id]
        initialState[id] = {
          id,
          name: provider.name,
          files: [],
          authed: false,
          auth: this.auth(provider),
          list: this.list(provider),
          logout: this.logout(provider)
        }
      })
    }

    return initialState
  }

  /**
   * Checks if valid server props have been provided.
   * @param  {[type]} server [description]
   * @return {[type]}        [description]
   */
  checkServerProps (server) {
    if (!server) { 
      return false 
    }

    if (!server.providers || !server.host) {
      return false
    }

    return (server.providers.length > 0 && typeof server.host === 'string')
  }

  /**
   * Uppy Server Provider Plugin Wrappers
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
        this._update(provider.id, { authed }, 'providers')
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
        const files = this.procFiles(data)
        this._update(provider.id, files)
        return files
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
          this._update(provider.id, { 
            authed: false,
            files: [],
            folders: [] 
          })
        }

        return result
      })
    }
  }


  /**
   * Webcam Plugin Wrappers
   */
  
  /**
   * Starts webcam and adds video stream to state.
   * @param  {Webcam} webcam Webcam plugin instance
   * @return {fn}            Wrapped start method
   */
  startWebcam (webcam) {
    return () => {
      return webcam.start()
      .then((stream) => {
        this._update('webcam', { stream: stream })
      })
    }
  }

  /**
   * Stops webcam and removes video stream from state.
   * @param  {Webcam} webcam  Webcam plugin instance
   * @return {fn}             Wrapped stop method
   */
  stopWebcam (webcam) {
    return () => {
      return webcam.stop()
      .then((result) => {
        if (result.ok) {
          this._update('webcam', { stream: null })
        }
      })
    }
  }

  /**
   * Takes a snapshot from the webcam's video stream.
   * @param  {Webcam} webcam  Webcam plugin instance
   * @return {fn}             Wrapped takeSnapshot method
   */
  takeSnapshot (webcam) {
    return () => {

    }
  }

  /**
   * Wrapper for updating state, even state that is
   * nested.
   * @param  {String} key       State key to update
   * @param  {[type]} newState  Replaces old state at key
   * @param  {[type]} parentKey Key of parent if key is nested
   */
  _update (key, newState, parentKey) {
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
   * Add a file to the upload queue.
   * @param {File} file
   */
  addFile (file) {
    const {files} = this.state
    this.setState({
      files: files.concat([file])
    })
  }

  /**
   * Remove a file from the upload queue.
   * @param  {String} fileID
   */
  removeFile (fileID) {
    const filteredFiles = this.state.files.filter((file) => {
      return file.id !== fileID
    })

    this.setState({
      files: filteredFiles
    })
  }

  /**
   * Start uploading the files in queue.
   * @return {Promise} Resolves when all uploads are completed.
   */
  startUpload() {
    return this.uploader.start(this.state.files)
  }
  
  render () {
    const propsToPass = extend(this.state, {
      addFile: this.addFile,
      removeFile: this.removeFile,
      startUpload: this.startUpload
    })
    return (
      <div>
        { React.Children.map(this.props.children, (child) => React.cloneElement(child, propsToPass)) }
      </div>
    )
  }
}

UppyContainer.defaultProps = {}

UppyContainer.propTypes = {}

module.exports = UppyContainer
