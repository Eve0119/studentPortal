import React from 'react'
import { IoIosAdd } from "react-icons/io";
import { FaCloudDownloadAlt } from "react-icons/fa";

const GradeTable = ({setIsGradeFormOpen}) => {
  return (
    <div className='bg-white p-6 m-7 rounded-lg border border-neutral-content w-auto'>
        <div className='flex w-auto '>
            <div className='flex-col'>
                <h2 className='text-2xl font-bold'>Student Grades</h2>
                <p className='text-neutral-content'>View and manage student academic performance</p>
            </div>
            <div className='justify-end flex flex-1 flex-row gap-3'>
                <button className="btn btn-neutral btn-sm md:btn-md whitespace-nowrap" onClick={() => setIsGradeFormOpen(true)}>
                    <IoIosAdd className='text-base-100 text-lg md:text-xl'/>
                    <span className='text-base-100 text-xs md:text-sm'>
                        Add Grade
                    </span>
                </button>
                <button className="btn btn-outline btn-primary w-full sm:w-auto">
                    <span className="hidden sm:inline">Export Report</span>
                    <FaCloudDownloadAlt className='text-xl sm:ml-2'/>
                </button>                
            </div>
        </div>
    </div>
  )
}

export default GradeTable