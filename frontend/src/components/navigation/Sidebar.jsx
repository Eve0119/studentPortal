import React from 'react'

const Sidebar = ({ open, setOpen }) => (
  <div
    className={`
      bg-base-200 text-base-content h-full flex flex-col items-center
      transition-all duration-150 overflow-hidden
      ${open ? 'w-64' : 'w-0'}
    `}
    style={{ minWidth: open ? '16rem' : '0rem' }}
  >
    <ul
      className={`
        menu p-2 w-full transition-opacity duration-1
        ${open ? 'opacity-300 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
    >
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
      {/* Add more items here */}
    </ul>
  </div>
)

export default Sidebar