import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { FaRegEdit } from "react-icons/fa";
import { IoPersonOutline, IoLocationOutline } from "react-icons/io5";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { RiParentLine } from "react-icons/ri";
import axiosInstance from '../../lib/axios';
import { capitalizeWords, getAge, formatDate} from '../../lib/utils';
import CopyButton from '../ui/CopyButton';

const StudentProfile = ({
    isStudentProfileOpen, 
    setIsStudentProfileOpen,
    studentId,
    setIsEditStudentOpen,
    student,
    setStudent
}) => {
    const studentProfileRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
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
            <dialog ref={studentProfileRef} className="modal modal-middle backdrop-blur-sm">
                <div className="modal-box !max-w-none !pt-0 w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[60vw] xl:w-[70vw] max-h-[90vh] sm:max-h-[95vh] overflow-y-auto">
                    <div className="flex justify-between items-start sticky top-0 z-10 bg-base-100 pt-4 pb-2 -mx-4 px-4">
                        <div className='flex justify-start flex-col'>
                            <h2 className="text-xl md:text-2xl font-bold text-primary-content">
                                Student Profile
                            </h2>
                            <div>
                                <p className="text-sm md:text-base">
                                    {isLoading 
                                        ? 'Loading student information...'
                                        : student 
                                            ? <span className='text-neutral-content'>Viewing {student.firstName} {student.lastName}'s profile</span>
                                            : 'Student information not available'}
                                </p>
                            </div>
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
                            <div className="mt-5 p-4 sm:p-7 rounded-xl border border-neutral-content bg-white flex flex-col">
                                <div className='flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0'>
                                    <div>
                                        <div>
                                            <span className='text-2xl sm:text-3xl font-extrabold text-primary-content'>{student.firstName} {student.lastName}</span>
                                        </div>
                                        <div>
                                            <span className='text-lg sm:text-xl text-neutral'>{capitalizeWords(student.grade)}</span>
                                        </div>
                                    </div>
                                    <div className='w-full sm:w-auto'>
                                        <button onClick={()=>{
                                            setIsStudentProfileOpen(false);
                                            setIsEditStudentOpen(true);
                                        }} className='btn btn-sm btn-outline rounded-lg border-neutral-content bg-primary hover:bg-accent hover:border-neutral-content text-white w-full sm:w-auto'>
                                            <FaRegEdit />
                                            Edit
                                        </button>
                                    </div>
                                </div>
                                <div className='grid grid-cols-1 sm:grid-cols-9 mt-4 gap-2 sm:gap-0'>
                                    <div className='sm:col-span-1'>
                                        <span className='text-primary pr-2 font-medium'>Student ID:  </span>
                                    </div>
                                    <div className='sm:col-span-8 justify-start'>
                                        <span className='text-base text-primary-content font-bold'> {student.studentId}</span>
                                        <CopyButton textToCopy={student.studentId} />
                                    </div>
                                    <div className='sm:col-span-1'>
                                        <span className='text-primary pr-2 font-medium'>Age: </span>
                                    </div>
                                    <div className='sm:col-span-8 justify-start'>
                                        <span className='text-base text-primary-content font-bold'> {getAge(student.dateOfBirth)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5'>
                                <div className="mt-5 p-4 sm:p-7 rounded-xl border border-neutral-content bg-white flex flex-col">
                                    <div className='flex gap-2'>
                                        <IoPersonOutline className='text-primary text-2xl mt-1'/>
                                        <span className='text-xl sm:text-2xl text-primary-content font-semibold'>
                                            Personal Information
                                        </span>
                                    </div>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 justify-start mt-5'>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>First Name</span>
                                            <div>
                                                <span className='text-primary-content text-base sm:text-lg font-bold'>{student.firstName}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-neutral font-medium text-sm '>Last Name</span>
                                            <div>
                                                <span className='text-primary-content text-base sm:text-lg font-bold'>{student.lastName}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>Date of Birth</span>
                                            <div>
                                                <span className='text-primary-content text-base sm:text-lg font-bold'>{formatDate(new Date(student.dateOfBirth))}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>Gender</span>
                                            <div>
                                                <span className='text-primary-content text-base sm:text-lg font-bold'>{capitalizeWords(student.gender)}</span>
                                            </div>
                                        </div>
                                        <div className='sm:col-span-2'>
                                            <span className='text-neutral font-medium text-sm'>Contact Number</span>
                                            <div>
                                                <span className='text-primary-content text-base sm:text-lg font-bold'>{student.contactNumber || 'Not provided'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 mt-5 sm:p-7 rounded-xl border border-neutral-content bg-white flex flex-col">
                                    <div className='flex gap-2'>
                                        <HiOutlineAcademicCap className='text-primary text-2xl mt-1'/>
                                        <span className='text-xl sm:text-2xl text-primary-content font-semibold'>
                                            Academic Information
                                        </span>
                                    </div>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 justify-start mt-5'>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>Grade Level</span>
                                            <div>
                                                <span className='text-primary-content text-base sm:text-lg font-bold'>{capitalizeWords(student.grade)}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>General Average</span>
                                            <div>
                                                <span className='text-primary-content text-base sm:text-lg font-bold'>{student.grades?.generalAverage || 'No grades yet'}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>Enrollment Date</span>
                                            <div>
                                                <span className='text-primary-content text-base sm:text-lg font-bold'>{formatDate(new Date(student.enrollmentDate))}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>Attendance Rate</span>
                                            <div>
                                                <span className='text-primary-content text-base sm:text-lg font-bold'>{student.attendance?.attendanceRate || 'No attendance yet'}</span>
                                            </div>
                                        </div>
                                        <div className='sm:col-span-2'>
                                            <span className='text-neutral font-medium text-sm'>Adviser</span>
                                            <div>
                                                <span className='text-primary-content text-base sm:text-lg font-bold'>{student.adviser || 'No adviser yet'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-7 rounded-xl border border-neutral-content bg-white flex flex-col">
                                    <div className='flex gap-2'>
                                        <IoLocationOutline className='text-primary text-2xl mt-1'/>
                                        <span className='text-xl sm:text-2xl text-primary-content font-semibold'>
                                            Address
                                        </span>
                                    </div>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 justify-start mt-5'>
                                        <div className='sm:col-span-2'>
                                            <span className='text-neutral font-medium text-sm'>Street</span>
                                            <div>
                                                <span className='text-primary-content text-base sm:text-lg font-bold'>{capitalizeWords(student.address?.street)}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>Barangay</span>
                                            <div>
                                                <span className='text-primary-content text-base sm:text-lg font-bold'>{capitalizeWords(student.address?.barangay)}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>City</span>
                                            <div>
                                                <span className='text-primary-content text-base sm:text-lg font-bold'>{capitalizeWords(student.address?.city)}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>ZIP Code</span>
                                            <div>
                                                <span className='text-primary-content text-base sm:text-lg font-bold'>{capitalizeWords(student.address?.zip || 'Not provided')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-7 rounded-xl border border-neutral-content bg-white flex flex-col">
                                    <div className='flex gap-2'>
                                        <RiParentLine className='text-primary text-2xl mt-1'/>
                                        <span className='text-xl sm:text-2xl text-primary-content font-semibold'>
                                            Parent/Guardian
                                        </span>
                                    </div>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 justify-start mt-5'>
                                        <div className='sm:col-span-2'>
                                            <span className='text-neutral font-medium text-sm'>Name</span>
                                            <div>
                                                <span className='text-primary-content text-base sm:text-lg font-bold'>{capitalizeWords(student.parentGuardianName)}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>Contact Number</span>
                                            <div>
                                                <span className='text-primary-content text-base sm:text-lg font-bold'>{capitalizeWords(student.parentContactNumber)}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-neutral font-medium text-sm'>Email</span>
                                            <div>
                                                <span className='text-primary-content text-base sm:text-lg font-bold'>{capitalizeWords(student.parentEmail || 'Not provided')}</span>
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