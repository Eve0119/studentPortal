import React, {useState} from 'react'
import {Routes, Route} from 'react-router'
import HomePage from './pages/HomePage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Navbar from './components/navigation/Navbar.jsx'
import Sidebar from './components/navigation/Sidebar.jsx'
import Students from './pages/Students.jsx'
import Grades from './pages/Grades.jsx'

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div data-theme='lemonade' className="flex h-screen">
      <Sidebar open={sidebarOpen} />
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'ml-30' : 'ml-0'}`}>
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/dashboard/:id' element={<Dashboard />} />
            <Route path='/students' element={<Students />} />
            <Route path='/grades' element={<Grades />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App