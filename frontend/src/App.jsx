import React from 'react'
import {Routes, Route} from 'react-router'
import HomePage from './pages/HomePage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Navbar from './components/navigation/Navbar.jsx'
import Sidebar from './components/navigation/Sidebar.jsx'
import Students from './pages/Students.jsx'

const App = () => {
  return (
  <div data-theme='lemonade'>
    <Sidebar>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard/:id' element={<Dashboard />} />
        <Route path='/students' element={<Students />} />
      </Routes>
    </Sidebar>
  </div>
  )
}

export default App