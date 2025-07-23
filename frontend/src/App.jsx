import React, {useState} from 'react'
import {Routes, Route, Outlet} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Navbar from './components/navigation/Navbar.jsx'
import Sidebar from './components/navigation/Sidebar.jsx'
import Students from './pages/Students.jsx'
import Grades from './pages/Grades.jsx'
import Login from './components/publicRoutes/Login.jsx'

// Layout component for routes with Navbar/Sidebar
const DashboardLayout = ({ sidebarOpen, setSidebarOpen }) => (
  <div className="flex h-screen">
    <Sidebar open={sidebarOpen} />
    <div className={`flex-1 flex flex-col ${sidebarOpen ? 'ml-30' : 'ml-0'}`}>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 overflow-auto">
        <Outlet /> {/* This renders nested routes */}
      </div>
    </div>
  </div>
);

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div data-theme='lemonade'>
      <Routes>
        {/* Public routes without Navbar/Sidebar */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes with Navbar/Sidebar */}
        <Route element={<DashboardLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;