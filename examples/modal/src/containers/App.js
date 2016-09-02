import React, { Component, PropTypes } from 'react'
import UppyModal from '../u/containers/UppyModal'
// import UppyDashboard from '../u/containers/UppyDashboard'

class App extends Component {
  constructor () {
    super()

    this.state = {
      modalOpen: false,
      activeModalTab: 'local'
    }

    this.addFile = this.addFile.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.handleTabClick = this.handleTabClick.bind(this)
  }

  toggleModal () {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  handleTabClick (tabID) {
    if (!tabID) {
      return
    }

    this.setState({
      activeModalTab: tabID
    })
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
    console.log(this.props)
    return (
      <div>
        <button onClick={this.toggleModal}>Toggle Modal!</button>
        <UppyModal
          open={this.state.modalOpen}
          activeTab={this.state.activeModalTab}
          handleTabClick={this.handleTabClick}
          {...this.props}
          addFile={this.addFile}/>
      </div>
    )
  }
}

App.defaultProps = {
  files: []
}

export default App
