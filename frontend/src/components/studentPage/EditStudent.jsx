import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { FaRegEdit } from "react-icons/fa";
import { IoPersonOutline, IoLocationOutline } from "react-icons/io5";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { RiParentLine } from "react-icons/ri";
import axiosInstance from '../../lib/axios';
import { capitalizeWords, getAge, formatDate} from '../../lib/utils';
import CopyButton from '../ui/CopyButton';

const EditStudent = ({
    setStudent,
    student,
    isEditStudentOpen, 
    setIsEditStudentOpen, 
    studentId

}) => {
    const editStudentRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
   
        const [formData, setFormData] = useState(student);
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

    useEffect(() => {
        if (student) {
            setFormData({
                ...student,
                dateOfBirth: student.dateOfBirth
                    ? student.dateOfBirth.slice(0, 10)
                    : ''
            });
        }
    }, [student]);

    useEffect(() => {
        if (isEditStudentOpen && studentId) { 
            editStudentRef.current?.showModal();
            const fetchStudent = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    console.log("Fetching student data for ID:", studentId);
                    const res =  await axiosInstance.get(`/student/${studentId}`);
                    setStudent(res.data);
                    console.log("Setting student to:", student); 
                } catch (error) {
                    console.error("Error fetching student data", error);
                    setError(error);
                    toast.error("Failed to fetch student data. Please try again later");
                    setStudent(null);
                } finally {
                    setIsLoading(false);
                }   
            }
            fetchStudent();
        } else {
            editStudentRef.current?.close();
            setStudent(null);
            setError(null);
        }
    },[isEditStudentOpen, studentId]);

    return (
    <div>
        <dialog ref={editStudentRef} className='modal'>
            <div className="modal-box !max-w-none w-[90vw] md:w-[80vw] lg:w-[60vw] xl:w-[50vw]">
                <div className="flex justify-between items-start top-0 z-10 bg-base-100 pt-0 align-top pb-2 -mx-4 px-4">
                    <div className='flex justify-start flex-col'>
                        <h2 className="text-xl md:text-2xl font-bold text-primary-content">
                            Edit Student Profile
                        </h2>
                        <div>
                            <p className="text-sm md:text-base">
                                {isLoading 
                                    ? 'Loading student information...'
                                    : student 
                                        ? <span className='text-neutral-content'>Edit {student.firstName} {student.lastName}'s profile</span>
                                        : 'Student information not available'}
                            </p>
                        </div>
                    </div>
                    <button 
                        className="btn btn-sm btn-circle btn-ghost"
                        onClick={() => setIsEditStudentOpen(false)}
                    >
                        ✕
                    </button>
                </div>
                {isLoading ? (
                    <div className="flex justify-center py-8">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : error ? (
                    <div className="alert alert-error mt-4">
                        Failed to load student data
                    </div>
                ) :formData ? (
                    <>
                        <div className='p-5 rounded-xl border border-neutral-content flex flex-col bg-white'>
                            <div className='flex-col gap-2'>
                                <div className='flex items-start'>
                                    <IoPersonOutline className='text-2xl text-primary m-1'/>
                                    <span className='text-2xl text-primary-content font-semibold'>
                                        Student Information
                                    </span>
                                </div>
                                <div>
                                    <span className='text-neutral-content text-base'>Basic information about the student</span>
                                </div>
                            </div>
                            <div className='mt-4 grid grid-cols-1 md:grid-cols-5 gap-x-4 items-start'>
                                <div className='col-span-2 h:full'>
                                    <label className="form-control w-full h-full flex flex-col">
                                        <div className="label">
                                            <span className="text-base font-semibold">Last Name *</span>
                                        </div>
                                        <input 
                                            type="text" 
                                            placeholder="Enter last name" 
                                            className="input input-bordered w-full"
                                            required
                                            name='lastName'
                                            value={formData.lastName}
                                            onChange={handleChange}
                                        />
                                    </label>
                                </div>
                                <div className='col-span-2 h:full'>
                                    <label className='form-control w-full h-full flex flex-col'>
                                        <div className='label'>
                                            <span className='text-base font-semibold'>First Name *</span>
                                        </div>
                                        <input 
                                        type="text" 
                                        placeholder='Enter first name'
                                        className='input input-bordered w-full'
                                        required
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        />
                                    </label>
                                </div>
                                <div className='col-span-1 h:full'>
                                    <label className='form-control w-full h-full flex flex-col'>
                                        <div className='label'>
                                            <span className='text-base font-semibold'>M.I. *</span>
                                        </div>
                                        <input 
                                        type="text" 
                                        placeholder='Middle Initial'
                                        className='input input-bordered w-full'
                                        required
                                        name="middleInitial"
                                        value={formData.middleInitial}
                                        onChange={handleChange}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 items-start'>
                                <div className="h-full">
                                    <label className="form-control w-full h-full flex flex-col">
                                        <div className="label">
                                            <span className="text-base font-semibold">Date of Birth *</span>
                                        </div>
                                        <input 
                                        type="date" 
                                        className="input input-bordered w-full"
                                        required
                                        name='dateOfBirth'
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                        />
                                    </label>
                                </div>
                                <div className="h-full">
                                    <label className="form-control w-full h-full flex flex-col">
                                        <div className="label">
                                            <span className="text-base font-semibold">Gender *</span>
                                        </div>
                                        <select className="select select-bordered w-full " value={formData.gender} onChange={handleChange} name='gender' required>
                                            <option disabled value=''>Select Gender</option>
                                            <option value='male'>Male</option>
                                            <option value='female'>Female</option>
                                        </select>
                                    </label>
                                </div>
                            </div>      
                            <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 items-start'>
                                <div className="h-full">
                                    <label className="form-control w-full h-full flex flex-col">
                                        <div className="label">
                                            <span className="text-base font-semibold">Grade Level *</span>
                                        </div>
                                        <select className='select select-bordered w-full' required name="grade" value={formData.grade} onChange={handleChange}>
                                            <option disabled value=''>Select grade level</option>
                                            <option value="pre-k">Pre-K</option>
                                            <option value="kindergarten">Kindergarten</option>
                                            <option value="grade 1">Grade 1</option>
                                            <option value="grade 2">Grade 2</option>
                                            <option value="grade 3">Grade 3</option>
                                            <option value="grade 4">Grade 4</option>
                                            <option value="grade 5">Grade 5</option>
                                            <option value="grade 6">Grade 6</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="h-full">
                                    <label className="form-control w-full h-full flex flex-col">
                                        <div className="label">
                                            <span className="text-base font-semibold">Student Number *</span>
                                        </div>
                                        <input 
                                        type="text"
                                        className='input input-bordered w-full'
                                        required
                                        name='studentId'
                                        placeholder='Enter student number'
                                        value={formData.studentId}
                                        onChange={handleChange}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5 p-5 rounded-xl border border-neutral-content flex flex-col bg-white'>
                            <div className='flex gap-2'>
                                <RiParentLine className='text-accent text-2xl m-1'/>
                                <span className='text-2xl text-primary-content font-semibold'>
                                Parent/Guardian Information
                                </span>
                            </div>
                            <div>
                                <span className='text-neutral-content text-base'>Primary contact information for the student</span>
                            </div>
                            <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 items-start'>
                                <div className="h-full md:col-span-1">
                                    <label className="form-control w-full h-full flex flex-col">
                                        <div className="label">
                                            <span className="text-base font-semibold">Parent/Guardian Name *</span>
                                        </div>
                                    <input 
                                        type="text" 
                                        placeholder="Enter parent/guardian name" 
                                        className="input input-bordered w-full"
                                        required
                                        name='parentGuardianName'
                                        value={formData.parentGuardianName}
                                        onChange={handleChange}
                                    />
                                    </label>
                                </div>
                                <div className="h-full md:col-span-1">
                                    <label className="form-control w-full h-full flex flex-col">
                                        <div className="label">
                                            <span className="text-base font-semibold">Parent/Guardian Email</span>
                                        </div>
                                    <input 
                                        type="email" 
                                        placeholder="parent@email.com" 
                                        className="input input-bordered w-full"
                                        name='parentEmail'
                                        value={formData.parentEmail}
                                        onChange={handleChange}
                                    />
                                    </label>
                                </div>
                            </div>
                            <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 items-start'>
                                <div className="h-full md:col-span-1">
                                    <label className="form-control w-full h-full flex flex-col">
                                        <div className="label">
                                            <span className="text-base font-semibold">Parent/Guardian Contact Number *</span>
                                        </div>
                                    <input 
                                        type="text" 
                                        placeholder="Enter contact number" 
                                        className="input input-bordered w-full"
                                        required
                                        name='parentContactNumber'
                                        value={formData.parentContactNumber}
                                        onChange={handleChange}
                                    />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="mt-4 text-center">
                        No student data found
                    </div>
                )}
            </div>
        </dialog>
    </div>
  )
}

export default EditStudent