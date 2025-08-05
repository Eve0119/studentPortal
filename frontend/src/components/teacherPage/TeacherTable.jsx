import React from 'react'
import { IoIosAdd } from "react-icons/io";
import TeacherForm from './TeacherForm'

const TeacherTable = ({isTeacherFormOpen, setIsTeacherFormOpen}) => {
  return (
    <div>     
      <div className='flex flex-col w-auto m-7 p-6 gap-6 bg-white border border-neutral-content rounded-lg'>
        <div className='flex flex-row justify-between'>
          <div>
            <h1 className='text-primary-content text-2xl font-bold md:text-2xl'>Teaching Staff</h1>
            <div className='text-neutral-content text-sm md:text-base'>Manage and manage all teaching staff m</div>
          </div>
          <div className='items-end'>
            <button className='btn btn-accent text-white' onClick={() => {setIsTeacherFormOpen(true), console.log("Add Teacher Button Clicked")}}>
              <IoIosAdd className='text-base-100 text-lg md:text-xl'/>
              Add Teacher
            </button>
          </div>
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