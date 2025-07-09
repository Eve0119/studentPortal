import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { MdContentCopy } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import axiosInstance from '../../lib/axios';
import { capitalizeWords, copyToClipboard, getAge} from '../../lib/utils';

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
                            <h2 className="text-xl md:text-2xl font-semibold">
                                Student Profile
                            </h2>
                            <p className="text-sm md:text-base">
                                {isLoading 
                                    ? 'Loading student information...'
                                    : student 
                                        ? <span className='text-secondary-content'>Viewing {student.firstName} {student.lastName}'s profile</span>
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
                        <div className="mt-5 p-5 rounded-xl border border-neutral-content bg-white flex flex-col">
                            <div className='flex justify-between items-start'>
                                <div>
                                    <div>
                                        <span className='text-2xl font-semibold text-primary-content'>{student.firstName} {student.lastName}</span>
                                    </div>
                                    <div>
                                        <span className='text-base text-secondary'>{capitalizeWords(student.grade)}</span>
                                    </div>
                                </div>
                                <div className='gap-1'>
                                    <button className='btn btn-sm btn-outline rounded-lg border-neutral-content'>
                                        <FaRegEdit />
                                        Edit
                                    </button>
                                </div>
                            </div>
                            <div className='mt-4'>
                                <span className='text-primary'>Student ID:  </span>
                                <span className='text-base text-primary-content'> {student.studentId}</span>
                                <button onClick={() => {copyToClipboard(student.studentId)}} className='btn btn-ghost btn-base btn-xs'>
                                    <MdContentCopy className='text-primary'/>
                                </button>
                            </div>
                            <div>
                                <span className='text-primary'>Age: </span>
                                <span className='text-base text-primary-content'> {getAge(student.dateOfBirth)}</span>
                            </div>
                        </div>
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