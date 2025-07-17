import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom';
import { IoPersonOutline } from "react-icons/io5";
import { GrScorecard } from "react-icons/gr";
import { FaRegCalendarCheck } from "react-icons/fa";
import { TbBooks } from "react-icons/tb";
import { LuChartSpline } from "react-icons/lu";


const Sidebar = ({ open }) => {

  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/dashboard')) setActiveItem('dashboard');
    else if (path.includes('/students')) setActiveItem('students');
    else if (path.includes('/grades')) setActiveItem('grades');
    else if (path.includes('/attendance')) setActiveItem('attendance');
    else if (path.includes('/classes')) setActiveItem('classes');
  }, [location]);

  return(
    <div
      className={`
        bg-success text-base-content h-full flex flex-col items-center
        transition-all duration-150 overflow-hidden border border-neutral-content border-shadow-lg
        ${open ? 'w-64' : 'w-0'}
      `}
      style={{ minWidth: open ? '16rem' : '0rem' }}
    >
      {/* Creative Logo & Tagline Container */}
      <div className='p-4 w-full flex items-center justify-center relative group py-5 bg-white border-b border-neutral-content'>
        <div className='flex items-end gap-3 transform transition-transform duration-300 hover:scale-105'>
          {/* Logo with creative border */}
          <div className='relative'>
            <div className='absolute -inset-2 rounded-lg bg-gradient-to-br from-primary to-accent opacity-20 group-hover:opacity-30 transition-opacity'></div>
            <img 
              src="../../assets/blackMatteLogo.png" 
              alt="Logo" 
              className='h-12 w-auto relative z-10 drop-shadow-sm'
            />
          </div>
          
          {/* Tagline with creative typography */}
          <div className='flex flex-col items-start'>
            <h3 className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent'>
              Your Portal
            </h3>
            <h4 className='text-sm font-medium text-neutral-content relative'>
              <span className='absolute -left-3 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-accent'></span>
              to the Future
            </h4>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <ul
        className={`
          menu p-2 pt-10 w-full transition-opacity duration-150 text-neutral gap-2
          ${open ? 'opacity-300 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        <li><Link to={'/dashboard/0111'} className={`hover:bg-white active:!bg-white ${activeItem === 'dashboard' ? '!bg-white !text-primary' : ''}`} onClick={() => setActiveItem('dashboard')}>
          <LuChartSpline className='text-xl'/>
          <span className='text-lg font-medium'>Dashboard</span></Link>
        </li>
        <li><Link to={'/students'} className={`hover:bg-white active:!bg-white ${activeItem === 'students' ? '!bg-white !text-primary' : ''}`} onClick={() => setActiveItem('students')}>
          <IoPersonOutline className='text-xl'/>
          <span className='text-lg font-medium'>Students</span></Link>
        </li>
        <li><Link to={'/grades'} className={`hover:bg-white active:!bg-white ${activeItem === 'grades' ? '!bg-white !text-primary' : ''}`} onClick={() => setActiveItem('grades')}>
          <GrScorecard className='text-xl'/>
          <span className='text-lg font-medium'>Grades</span></Link>
        </li>
        <li><Link to={'/'} className={`hover:bg-white active:!bg-white ${activeItem === 'attendace' ? '!bg-white !text-primary' : ''}`} onClick={() => setActiveItem('attendance')}>
          <FaRegCalendarCheck className='text-xl'/>
          <span className='text-lg font-medium'>Attendance</span></Link>
        </li>
        <li><Link to={'/'} className={`hover:bg-white active:!bg-white ${activeItem === 'classes' ? '!bg-white !text-primary' : ''}`} onClick={() => setActiveItem('classes')}>
          <TbBooks className='text-xl'/>
          <span className='text-lg font-medium'>Classes</span></Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar;