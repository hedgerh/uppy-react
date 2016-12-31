import React, { Component, PropTypes } from 'react'
import Header from '../components/Header'
import Dashboard from '../components/Dashboard'
import FileBrowser from '../components/FileBrowser'
import Webcam from '../components/Webcam'
// const { defaultIcon, dashboardIcon, webcamIcon, googleIcon } from '../components/icons'


// TODO: Make tabs dynamic/use props instead of hard-coded.
const _sources = {
  default: {
    icon: ''
  },
  dashboard: {
    name: 'Local Disk',
    icon: ''
  },
  webcam: {
    name: 'Webcam',
    icon: '',
    component: Webcam
  },
  google: {
    name: 'Google Drive',
    icon: '',
    component: FileBrowser
  }
}

class UppyModal extends Component {
  constructor () {
    super()

    this.getTabs = this.getTabs.bind(this)
    this.getActivePane = this.getActivePane.bind(this)
    this.addLocalFile = this.addLocalFile.bind(this)
  }

  getTabs () {
    let tabs = []
    if (this.props.useLocal !== false) {
      tabs = tabs.concat([{
        id: 'dashboard',
        name: _sources.dashboard.name,
        icon: _sources.dashboard.icon
      }])
    }

    const {sources} = this.props

    if (sources) {
      let sourceTabs = Object.keys(sources).map((sourceID) => {
        const source = sources[sourceID]
        if (_sources[sourceID]) {
          return {
            id: sourceID,
            name: _sources[sourceID].name || sourceID.toUpperCase(),
            icon: _sources[sourceID].icon || _sources.default.icon
          }
        }

        return {
          id: sourceID,
          name: sourceID.toUpperCase(),
          icon: _sources.default.icon
        }
      })

      tabs = tabs.concat(sourceTabs)
    }

    return tabs
  }

  getActivePane (activeID) {
    const {
      sources, 
      files, 
      startUpload, 
      addFile, 
      removeFile
    } = this.props

    switch (activeID) {
      case 'dashboard':
        return (
          <Dashboard 
            files={files}
            startUpload={startUpload}
            removeFile={removeFile}/>
        )
      case 'webcam':
        return (
          <Webcam 
            {...sources.webcam} 
            addFile={addFile}/>
        )
      default:
        if (_sources[activeID] && _sources[activeID].component) {
          const ActiveComponent = _sources[activeID].component
          const propsToPass = Object.assign({}, this.props.sources[activeID], { 
            name: _sources[activeID].name,
            addFile: addFile
          })

          return React.cloneElement(<ActiveComponent/>, propsToPass)
        }
        return <div>No Component Data</div>
    }
  }

  addLocalFile (evt) {
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
    if (!this.props.open) { return null }
    return (
      <div className='UppyModal'>
        <Header
          tabs={this.getTabs()}
          handleTabClick={this.props.handleTabClick}
          addFile={this.addLocalFile}/>
        { this.getActivePane(this.props.active) }
      </div>
    )
  }
}

UppyModal.propTypes = {
  open: PropTypes.bool.isRequired
}

export default UppyModal
