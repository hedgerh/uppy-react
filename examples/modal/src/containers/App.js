import React, { Component, PropTypes } from 'react'
import UppyModal from '../../../../src/uppy-modal/containers/UppyModal'

class App extends Component {
  constructor () {
    super()

    this.state = {
      modalOpen: false,
      activeTab: 'dashboard'
    }

    this.toggleModal = this.toggleModal.bind(this)
    this.handleTabClick = this.handleTabClick.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.uppy.files.length !== this.props.uppy.files.length) {
      this.handleTabClick('dashboard')
    }
  }

  toggleModal () {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  handleTabClick (id) {
    if (!id) { return }

    this.setState({
      activeTab: id
    })
  }

  render () {
    return (
      <div>
        <button onClick={this.toggleModal}>Toggle Modal!</button>
        <UppyModal
          open={this.state.modalOpen}
          active={this.state.activeTab}
          handleTabClick={this.handleTabClick}
          {...this.props.uppy}/>
      </div>
    )
  }
}

export default App
