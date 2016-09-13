import React, { Component, PropTypes } from 'react'

class Webcam extends Component {
  constructor (props) {
    super(props)

    this.props.start()
  }

  componentWillMount () {
    this.props.start()
  }

  componentWillUnmount () {
    this.props.stop()
  }

  render () {
    const {stream} = this.props

    return (
      <div>
        <video src={stream ? URL.createObjectURL(stream) : null}/>
      </div>
    )
  }
}

export default Webcam
