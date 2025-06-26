import React from 'react'
import {Routes, Route} from 'react-router'
import HomePage from './pages/HomePage.jsx'
import Dashboard from './pages/Dashboard.jsx'

const App = () => {
  return (
    <div data-theme='lemonade'>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/dashboard/:id' element={<Dashboard/>}/>
      </Routes>
    </div>
  )
}

export default App