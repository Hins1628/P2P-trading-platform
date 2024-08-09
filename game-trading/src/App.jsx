import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Main from './pages/main'
import Market from './pages/market'
import ProductDetail from './pages/productDetail'
import UserConsole from './pages/userConsole'
import UserDetail from './pages/userDetail'
import Search from './pages/search'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/Main" element={<Main />} />
        <Route path="/Market" element={<Market />} />
        <Route path="/Product/:productId" element={<ProductDetail />} />
        <Route path="/UserConsole" element={<UserConsole />} />
        <Route path="/UserDetail/:userId" element={<UserDetail />} />
        <Route path="/Search" element={<Search />} />
      </Routes>
    </Router>
  )
}

export default App
