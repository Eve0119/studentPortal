import { beforeAuthStateChanged } from 'firebase/auth';
import React, {useRef, useState, useEffect} from 'react'
import { IoIosClose } from "react-icons/io";

const TeacherForm = ({isTeacherFormOpen, setIsTeacherFormOpen}) => {

    const initialFormState = {
        lastName: '',
        firstName: '',
        middleInitial: '',
        email: '',
        assignedGradeLevel: '',
        contactNumber: '',
        address: {
            street: '',
            barangay: '',
            city: '',
            zip: ''
        },
        dateOfBirth: '',
        gender: '',
        civilStatus: '',
        benefits: {
            sssNumber: '',
            philHealthNumber: '',
            pagIbigNumber: '',
            tinNumber: ''
            },
        dateHired: ''
    }

    const [formData, setFormData] = useState(initialFormState);
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleAddressChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value
            }
        }));
    };

    const teacherFormRef = useRef(null)
    useEffect(() => {
        if (isTeacherFormOpen) {
            teacherFormRef.current.showModal()
        } else {
            teacherFormRef.current?.close()
        }
    }, [isTeacherFormOpen])

  return (
    <div>
        <dialog ref={teacherFormRef} id='teacherModal1' className="modal modal-middle">
            <div className=" flex flex-col modal-box !max-w-none w-[90vw] md:w-[80vw] lg:w-[60vw] xl:w-[40vw]">
                <div className='flex justify-between align-top pt-0 pr-0'>
                    <div className='flex flex-col'>
                        <span className='text-2xl text-primary-content font-bold'>Add New Teacher</span>
                        <span className='text-neutral-content'>Enter details for the new teaching staff member</span>
                    </div>
                    <button className="btn btn-circle btn-ghost btn-xs" onClick={() => {setIsTeacherFormOpen(false)}}>
                        <IoIosClose className='text-xl' />
                    </button>
                </div>
                <form onSubmit={null} className='flex flex-col gap-4 mt-4'>
                    <div className='bg-white p-4 pt-7 pb-7 rounded-lg border border-neutral-content'>
                        <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
                            <div className='flex flex-col col-span-2 gap-1'>
                                <h1 className='font-semibold'>
                                    Last Name *
                                </h1>
                                <input 
                                    type='text' 
                                    className='input input-bordered w-full h-8' 
                                    placeholder='Enter Last Name' 
                                    required
                                />
                            </div>
                            <div className='flex flex-col col-span-2 gap-1'>
                                <h1 className='font-semibold'>
                                    First Name *
                                </h1>
                                <input 
                                    type='text' 
                                    className='input input-bordered w-full h-8' 
                                    placeholder='Enter First Name' 
                                    required
                                />
                            </div>
                            <div className='flex flex-col col-span-1 gap-1'>
                                <h1 className='font-semibold'>
                                    M.I. *
                                </h1>
                                <input 
                                    type='text' 
                                    className='input input-bordered w-full h-8' 
                                    placeholder='Middle' 
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </dialog>
    </div>
  )
}

export default TeacherForm