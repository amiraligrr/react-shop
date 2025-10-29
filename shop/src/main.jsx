import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Lut from './laut/lut.jsx'
import Context from './context/context.jsx'
createRoot(document.getElementById('root')).render(

  <Context>
  <BrowserRouter>
  <Lut>
  <StrictMode>
    <App />
  </StrictMode>,
  </Lut>
  </BrowserRouter>
  </Context>


  
)

