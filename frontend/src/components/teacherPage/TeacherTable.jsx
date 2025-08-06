import React from 'react'
import { IoIosAdd } from "react-icons/io";
import TeacherForm from './TeacherForm'

const TeacherTable = ({isTeacherFormOpen, setIsTeacherFormOpen}) => {
  return (
    <div className="w-full">     
      <div className='flex flex-col w-auto mx-4 my-4 md:m-6 p-4 md:p-6 gap-4 md:gap-6 bg-white border border-neutral-content rounded-lg'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
          <div className='flex-1 min-w-0'>
            <h1 className='text-primary-content text-xl font-bold sm:text-2xl truncate'>Teaching Staff</h1>
            <p className='text-neutral-content text-sm md:text-base whitespace-normal'>Manage and organize all teaching staff</p>
          </div>
          <div className='w-full sm:w-auto'>
            <button 
              className='btn btn-accent text-white w-full sm:w-auto'
              onClick={() => {
                setIsTeacherFormOpen(true);
                console.log("Add Teacher Button Clicked");
              }}
            >
              <IoIosAdd className='text-base-100 text-lg'/>
              <span className='hidden xs:inline'>Add Teacher</span>
            </button>
          </div>
        </div>

        {/* Table placeholder - add your actual table component here */}
        <div className='overflow-x-auto bg-gray-50 rounded-lg p-4'>
          <p className='text-gray-500 text-center'>Teacher table will appear here</p>
        </div>
      </div>
      
      <TeacherForm 
        setIsTeacherFormOpen={setIsTeacherFormOpen} 
        isTeacherFormOpen={isTeacherFormOpen}
      />
    </div>
  )
}

export default TeacherTable