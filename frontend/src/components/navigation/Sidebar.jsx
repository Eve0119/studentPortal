import React from 'react'
import { Link } from 'react-router'

const Sidebar = ({ open, setOpen }) => (
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
        menu p-2 pt-10 w-full transition-opacity duration-150 text-neutral
        ${open ? 'opacity-300 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
    >
      <li><a className='hover:bg-primary/10 active:bg-primary/20'>Sidebar Item 1</a></li>
      <li><a className='hover:bg-primary/10 active:bg-primary/20'>Sidebar Item 2</a></li>
      {/* Add more items here */}
    </ul>
  </div>
)

export default Sidebar