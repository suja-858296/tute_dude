import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NoteState from './context/notes/noteState.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NoteState>
      <App />
    </NoteState>
  </StrictMode>,
)
