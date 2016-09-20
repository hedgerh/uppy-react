import React from 'react'
import { render } from 'react-dom'
import { Tus10, Remote, Webcam } from 'uppy-base'
import { UppyContainer } from 'uppy-react'
import App from './src/containers/App'

const googleDrive = new Remote({ source: 'google' })
const instagram = new Remote({ source: 'instagram' })
const webcam = new Webcam({})

const initialProps = {
  uploader: Tus10,
  endpoint: 'http://master.tus.io:8080/files',
  remote: {
    host: 'http://localhost:3020',
    onList: () => {},
    onAuth: () => {},
    onLogout: () => {},
  },
  sources: [
    webcam,
    googleDrive,
    instagram
  ],
  onAddFile: () => {},
  onRemoveFile: () => {},
  onUploadStart: () => {},
  onProgress: () => {},
  onSuccess: () => {}
}

const Root = () => {
  return (
    <UppyContainer {...initialProps}>
      <App/>
    </UppyContainer>
  )
}

render(<Root/>, document.getElementById('root'))
