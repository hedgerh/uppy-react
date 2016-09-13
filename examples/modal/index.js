import React from 'react'
import { render } from 'react-dom'
import { Tus10 } from 'uppy-base'
import { UppyContainer } from 'uppy-react'
import App from './src/containers/App'

const initialProps = {
  uploader: {
    use: Tus10,
    endpoint: 'http://master.tus.io:8080/files/'
  },
  server: {
    host: 'http://localhost:3020',
    providers: ['google', 'instagram']
  }
}

const Root = () => {
  return (
    <UppyContainer {...initialProps}>
      <App/>
    </UppyContainer>
  )
}

render(<Root/>, document.getElementById('root'))
