import { useState ,useEffect} from 'react'

import './App.css'
import { Route , Routes} from 'react-router-dom'
import Home from './pages/home'
import Product from './pages/product'
import Login from './pages/login'
import axios from 'axios'
import Cookies from 'js-cookie';
import Details from './pages/details'
import Sabad from './pages/sabad'
import Prof from './pages/prof'
import About from './pages/about'
function App() {
  const [count, setCount] = useState(0)
  const [Prod, setProd] = useState([])

  return (
    <>
     <Routes>
      <Route path="/about" element={<About/>} />
      <Route path="/prof" element={<Prof/>} />
      <Route path="/sabad" element={<Sabad/>} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/deatile/:id" element={<Details/>} />
      </Routes>
    </>
  )
}

export default App
