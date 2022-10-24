import { useState } from 'react'
import './App.css'

import { AudioRecorder, IDataAvailable } from "@amirseifi/react-voice-recorder"
import "@amirseifi/react-voice-recorder/dist/style.css"

function App() {

  const [isRecordMode, setIsRecordMode] = useState(false)
  const [audioSrc, setAudioSrc] = useState("")


  const onDataReady = (value: IDataAvailable) => {

    const reader = new FileReader()

    reader.onload = (event) => {
      if (event.target !== null)
        setAudioSrc(event.target.result as string)
    }
    reader.readAsDataURL(value.value)

    setIsRecordMode(false)
  }
  const onCancel = () => {
    setIsRecordMode(false)
    setAudioSrc("")
  }

  const onPermissionDenied = () => {
    setIsRecordMode(false)
    setAudioSrc("")
    alert("Permission Denied!!!")
  }

  return (
    <div className="App">

      {
        audioSrc && (
          <audio src={audioSrc} controls />
        )
      }

      <div className='chat-control'>
        <div className='chat-control-container'>


          {
            !isRecordMode && (
              <button onClick={() => { setIsRecordMode(!isRecordMode) }}>click to record</button>
            )
          }
          <div className='voice-recorder'>
            {
              isRecordMode && (
                <AudioRecorder
                  onCancel={onCancel}
                  onDataAvailable={onDataReady}
                  onPermissionDenied={onPermissionDenied}
                  isLogging
                />
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
