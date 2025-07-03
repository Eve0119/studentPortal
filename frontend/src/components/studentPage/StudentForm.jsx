import React, {useEffect, useRef} from 'react'
import { IoIosClose } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";

const StudentForm = ({isStudentFormOpen, setIsStudentFormOpen}) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (isStudentFormOpen) {
        dialogRef.current?.showModal();
        } else {
        dialogRef.current?.close();
        }
    }, [isStudentFormOpen]);
    
  return (
    <div>
        <dialog ref={dialogRef} id='studentModal1' className="modal modal-middle ">
        <div className="modal-box !max-w-none w-[90vw] md:w-[80vw] lg:w-[60vw] xl:w-[50vw]">
            <div className='flex justify-between align-top pt-0 pr-0'>
                <span className='text-2xl text-primary-content font-bold'>Add New Student</span>
                <button className="btn btn-circle btn-ghost btn-xs" onClick={() => {setIsStudentFormOpen(false)}}>
                    <IoIosClose className='text-xl' />
                </button>
            </div>
            <div className='mb-5'>
                <span className='text-neutral-content text-base'>Enter the student's information to create their profile in the system</span>
            </div>
            <div className='p-5 rounded-xl border border-neutral-content flex flex-col'>
                <div className='flex gap-2'>
                    <IoPersonOutline className='text-primary text-2xl m-1'/>
                    <span className='text-2xl text-primary-content font-semibold'>
                    Student Information
                    </span>
                </div>
                <div>
                    <span className='text-neutral-content text-base'>Basic information about the student</span>
                </div>
                <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 items-start'>
                    <div className="h-full">
                    <label className="form-control w-full h-full flex flex-col">
                        <div className="label">
                        <span className="text-base font-semibold">First Name *</span>
                        </div>
                        <input 
                        type="text" 
                        placeholder="Enter first name" 
                        className="input input-bordered w-full" 
                        />
                    </label>
                    </div>
                    <div className="h-full">
                    <label className="form-control w-full h-full flex flex-col">
                        <div className="label">
                        <span className="text-base font-semibold">Last Name *</span>
                        </div>
                        <input 
                        type="text" 
                        placeholder="Enter last name" 
                        className="input input-bordered w-full" 
                        />
                    </label>
                    </div>
                </div>
            </div>
        </div>
        </dialog> 
    </div>
  )
}

export default StudentForm