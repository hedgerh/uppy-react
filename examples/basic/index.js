import React from 'react'
import { render } from 'react-dom'
import { Tus10 } from 'uppy-base'
import { UppyContainer } from 'uppy-react'

import App from './src/containers/App'

render(
  <UppyContainer
    uploader={Tus10}
    endpoint='http://master.tus.io:8080/files/'>
    <App/>
  </UppyContainer>, document.getElementById('root')
)
