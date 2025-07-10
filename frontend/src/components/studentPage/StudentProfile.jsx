import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { MdContentCopy } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import axiosInstance from '../../lib/axios';
import { capitalizeWords, copyToClipboard, getAge, formatDate} from '../../lib/utils';

const StudentProfile = ({
    isStudentProfileOpen, 
    setIsStudentProfileOpen,
    studentId
}) => {
    const studentProfileRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [student, setStudent] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isStudentProfileOpen && studentId) {
            studentProfileRef.current?.showModal();
            const fetchStudent = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const res = await axiosInstance.get(`/student/${studentId}`);
                    setStudent(res.data);
                } catch (error) {
                    console.error("Error fetching student:", error);
                    setError(error);
                    toast.error("Failed to load student data");
                    setStudent(null);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchStudent();
        } else {
            studentProfileRef.current?.close();
            setStudent(null);
            setError(null);
        }
    }, [isStudentProfileOpen, studentId]); 

    return (
        <div>
            <dialog ref={studentProfileRef} className="modal">
                <div className="modal-box !max-w-none w-[90vw] md:w-[80vw] lg:w-[60vw] xl:w-[70vw]">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-primary-content">
                                Student Profile
                            </h2>
                            <p className="text-sm md:text-base">
                                {isLoading 
                                    ? 'Loading student information...'
                                    : student 
                                        ? <span className='text-neutral-content'>Viewing {student.firstName} {student.lastName}'s profile</span>
                                        : 'Student information not available'}
                            </p>
                        </div>
                        <button 
                            className="btn btn-sm btn-circle btn-ghost"
                            onClick={() => setIsStudentProfileOpen(false)}
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
                    ) : student ? (
                        <>
                            <div className="mt-5 p-7 rounded-xl border border-neutral-content bg-white flex flex-col">
                                <div className='flex justify-between items-start'>
                                    <div>
                                        <div>
                                            <span className='text-3xl font-extrabold text-primary-content'>{student.firstName} {student.lastName}</span>
                                        </div>
                                        <div>
                                            <span className='text-xl text-neutral'>{capitalizeWords(student.grade)}</span>
                                        </div>
                                    </div>
                                    <div className='gap-1'>
                                        <button className='btn btn-sm btn-outline rounded-lg border-neutral-content bg-primary hover:bg-accent hover:border-neutral-content text-white'>
                                            <FaRegEdit />
                                            Edit
                                        </button>
                                    </div>
                                </div>
                                <div className='grid grid-cols-10 mt-4'>
                                    <div className='col-span-1'>
                                        <span className='text-primary pr-2 font-medium'>Student ID:  </span>
                                    </div>
                                    <div className='col-span-9 justify-start'>
                                        <span className='text-base text-primary-content font-bold'> {student.studentId}</span>
                                        <button onClick={() => {copyToClipboard(student.studentId)}} className='btn btn-ghost btn-base btn-xs'>
                                            <MdContentCopy className='text-primary'/>
                                        </button>
                                    </div>
                                    <div className='col-span-1'>
                                        <span className='text-primary pr-2 font-medium'>Age: </span>
                                    </div>
                                    <div className='col-span-9 justify-start'>
                                        <span className='text-base text-primary-content font-bold'> {getAge(student.dateOfBirth)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-5'>
                                <div className=" col-span-1 mt-5 p-7 rounded-xl border border-neutral-content bg-white flex flex-col">
                                    <div className='flex gap-2'>
                                        <IoPersonOutline className='text-primary text-2xl mt-1'/>
                                        <span className='text-2xl text-primary-content font-semibold'>
                                            Personal Information
                                        </span>
                                    </div>
                                    <div className='grid grid-cols-2 gap-4 justify-start mt-5'>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>First Name</span>
                                            <div>
                                                <span className='text-primary-content text-lg font-bold'>{student.firstName}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-neutral font-medium text-sm '>Last Name</span>
                                            <div>
                                                <span className='text-primary-content text-lg font-bold'>{student.lastName}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>Date of Birth</span>
                                            <div>
                                                <span className='text-primary-content text-lg font-bold'>{formatDate(new Date(student.dateOfBirth))}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>Gender</span>
                                            <div>
                                                <span className='text-primary-content text-lg font-bold'>{capitalizeWords(student.gender)}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>Contact Number</span>
                                            <div>
                                                <span className='text-primary-content text-lg font-bold'>{student.contactNumber || 'Not provided'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" col-span-1 mt-5 p-7 rounded-xl border border-neutral-content bg-white flex flex-col">
                                    <div className='flex gap-2'>
                                        <HiOutlineAcademicCap className='text-primary text-2xl mt-1'/>
                                        <span className='text-2xl text-primary-content font-semibold'>
                                            Academic Information
                                        </span>
                                    </div>
                                    <div className='grid grid-cols-2 gap-4 justify-start mt-5'>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>Grade Level</span>
                                            <div>
                                                <span className='text-primary-content text-lg font-bold'>{capitalizeWords(student.grade)}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>General Average</span>
                                            <div>
                                                <span className='text-primary-content text-lg font-bold'>{student.generalAverage || 'No grades yet'}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>Enrollment Date</span>
                                            <div>
                                                <span className='text-primary-content text-lg font-bold'>{formatDate(new Date(student.enrollmentDate))}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>Attendance Rate</span>
                                            <div>
                                                <span className='text-primary-content text-lg font-bold'>{student.attendanceRate || 'No attendace yet'}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>Adviser</span>
                                            <div>
                                                <span className='text-primary-content text-lg font-bold'>{student.adviser || 'No adviser yet'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" col-span-1 p-7 rounded-xl border border-neutral-content bg-white flex flex-col">
                                    <div className='flex gap-2'>
                                        <HiOutlineAcademicCap className='text-primary text-2xl mt-1'/>
                                        <span className='text-2xl text-primary-content font-semibold'>
                                            Address
                                        </span>
                                    </div>
                                    <div className='grid grid-cols-2 gap-4 justify-start mt-5'>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>Grade Level</span>
                                            <div>
                                                <span className='text-primary-content text-lg font-bold'>{capitalizeWords(student.grade)}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>General Average</span>
                                            <div>
                                                <span className='text-primary-content text-lg font-bold'>{student.grades?.generalAverage || 'No grades yet'}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>Enrollment Date</span>
                                            <div>
                                                <span className='text-primary-content text-lg font-bold'>{formatDate(new Date(student.enrollmentDate))}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>Attendance Rate</span>
                                            <div>
                                                <span className='text-primary-content text-lg font-bold'>{student.attendance?.attendanceRate || 'No attendace yet'}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>Adviser</span>
                                            <div>
                                                <span className='text-primary-content text-lg font-bold'>{student.adviser || 'No adviser yet'}</span>
                                            </div>
                                        </div>
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
    );
};

export default StudentProfile;