import React from 'react'
import { IoIosAdd } from "react-icons/io";
import { FaCloudDownloadAlt } from "react-icons/fa";

const GradeTable = ({setIsGradeFormOpen}) => {
  return (
    <div className='bg-white p-4 md:p-6 m-4 md:m-7 rounded-lg border border-neutral-content w-auto'>
        <div className='flex flex-col sm:flex-row gap-4 w-full'>
            <div className='flex-1 min-w-0'>
                <h2 className='text-xl md:text-2xl font-bold'>Student Grades</h2>
                <p className='text-sm md:text-base text-neutral-content'>View and manage student academic performance</p>
            </div>
            <div className='flex flex-col xs:flex-row gap-2 sm:gap-3 justify-end'>
                <button 
                    className="btn btn-neutral btn-sm md:btn-md whitespace-nowrap" 
                    onClick={() => setIsGradeFormOpen(true)}
                >
                    <IoIosAdd className='text-base-100 text-lg'/>
                    <span className='text-base-100 text-xs sm:text-sm'>
                        Add Grade
                    </span>
                </button>
                <button className="btn btn-outline btn-primary btn-sm md:btn-md flex items-center justify-center gap-1">
                    <span className="text-xs sm:text-sm">Export</span>
                    <FaCloudDownloadAlt className='text-lg sm:text-xl'/>
                </button>                
            </div>
        </div>
    </div>
  )
}

export default GradeTable