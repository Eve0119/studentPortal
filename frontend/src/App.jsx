import React from 'react'
import {Routes, Route} from 'react-router'
import HomePage from './pages/HomePage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'

const App = () => {
  return (
  <div data-theme='lemonade'>
    <Sidebar>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard/:id' element={<Dashboard />} />
      </Routes>
    </Sidebar>
  </div>
  )
}

export default App