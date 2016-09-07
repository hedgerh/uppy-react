import React, { Component, PropTypes } from 'react'
import UppyModal from '../u/containers/UppyModal'
// import UppyDashboard from '../u/containers/UppyDashboard'

class App extends Component {
  constructor () {
    super()

    this.state = {
      modalOpen: false,
      activeTab: 'local'
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

  handleTabClick (id) {
    if (!tabID) { return }

    this.setState({
      activeTab: id
    })
  }

  render () {
    console.log(this.props)
    return (
      <div>
        <button onClick={this.toggleModal}>Toggle Modal!</button>
        <UppyModal
          open={this.state.modalOpen}
          activeTab={this.state.activeTab}
          handleTabClick={this.handleTabClick}
          panes=[{ 
            name: 'Google Drive', 
            id: 'google',
            files: [],
            icon: '',
            component: FileBrowser
          },
          ]
          addFile={this.addFile}/>
      </div>
    )
  }
}

App.defaultProps = {
  files: []
}

export default App
