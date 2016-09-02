import React, { Component, PropTypes } from 'react'
import Header from '../components/Header'

class UppyModal extends Component {
  constructor () {
    super()

    this.getTabs = this.getTabs.bind(this)
  }

  getTabs () {
    let tabs = [{
      id: 'local',
      name: 'Local Disk'
    }]

    const {providers} = this.props

    if (providers) {
      let providerTabs = Object.keys(providers).map((providerID) => {
        const provider = providers[providerID]
        return {
          id: providerID,
          name: provider.name
        }
      })

      tabs = tabs.concat(providerTabs)
    }

    if (this.props.webcam) {
      tabs = tabs.concat([{
        id: 'webcam',
        name: 'Webcam'
      }])
    }

    return tabs
  }

  render () {
    return (
      <div className='UppyModal'>
        <Header
          tabs={this.getTabs()}
          handleTabClick={this.props.handleTabClick}
          addFile={this.props.addFile}/>
      </div>
    )
  }
}

export default UppyModal
