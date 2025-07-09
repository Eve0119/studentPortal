import React, { useEffect, useRef, useState } from 'react'
import axiosInstance from '../../lib/axios';
import toast from 'react-hot-toast';

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
                <div className="modal-box !max-w-none w-[90vw] md:w-[80vw] lg:w-[60vw] xl:w-[80vw]">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-xl md:text-2xl font-semibold">
                                Student Profile
                            </h2>
                            <p className="text-sm md:text-base">
                                {isLoading 
                                    ? 'Loading student information...'
                                    : student 
                                        ? <span className='text-secondary-content'>`Viewing {student.firstName} ${student.lastName}'s profile`</span>
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
                        <div className="mt-6 space-y-4">
                            {/* Student details here */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-bold">Full Name</h3>
                                    <p>{student.firstName} {student.lastName}</p>
                                </div>
                                <div>
                                    <h3 className="font-bold">Student ID</h3>
                                    <p>{student.studentId}</p>
                                </div>
                                {/* Add more student details as needed */}
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