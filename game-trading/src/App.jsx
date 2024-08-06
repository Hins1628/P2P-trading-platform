import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Main from './pages/main'
import Market from './pages/market'
import Product from './pages/product'
import UserConsole from './pages/userConsole'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/Main" element={<Main />} />
        <Route path="/Market" element={<Market />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/UserConsole" element={<UserConsole />} />
      </Routes>
    </Router>
  )
}

export default App
