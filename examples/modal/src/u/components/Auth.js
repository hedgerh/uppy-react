import React, { PropTypes } from 'react'

const Auth = (props) => {
  return (
    <a href={props.authURL}>Auth</a>
  )
}

Auth.propTypes = {
  authURL: PropTypes.string.isRequired
}

export default Auth
