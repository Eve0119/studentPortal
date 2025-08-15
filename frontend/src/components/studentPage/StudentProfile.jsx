import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegEdit } from "react-icons/fa";
import { IoPersonOutline, IoLocationOutline } from "react-icons/io5";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { RiParentLine } from "react-icons/ri";
import axiosInstance from '../../lib/axios';
import { capitalizeWords, getAge, formatDate } from '../../lib/utils';
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
                <div className="modal-box !max-w-none !pt-0 w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] 2xl:w-[50vw] max-h-[90vh] sm:max-h-[95vh] overflow-y-auto rounded-lg">
                    {/* Header */}
                    <div className="flex justify-between items-center sticky top-0 z-10 bg-gradient-to-r from-primary to-primary-focus text-white pt-4 pb-4 px-6 -mx-6 rounded-t-lg shadow-md">
                        <div className='flex flex-col'>
                            <h2 className="text-xl md:text-2xl font-bold">
                                Student Profile
                            </h2>
                            <p className="text-sm md:text-base opacity-90">
                                {isLoading 
                                    ? 'Loading student information...'
                                    : student 
                                        ? `${student.firstName} ${student.lastName}'s profile`
                                        : 'Student information not available'}
                            </p>
                        </div>
                        <button 
                            className="btn btn-circle btn-ghost btn-sm text-primary hover:bg-white/20"
                            onClick={() => setIsStudentProfileOpen(false)}
                        >
                            ✕
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <span className="loading loading-spinner loading-lg text-primary"></span>
                        </div>
                    ) : error ? (
                        <div className="alert alert-error mt-6 mx-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Failed to load student data. Please try again.</span>
                        </div>
                    ) : student ? (
                        <div className="space-y-6 px-4 py-6">
                            {/* Profile Header with Image */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="relative group">
                                    <div className="avatar">
                                        <div className="w-24 sm:w-32 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                                            {student.profileImage?.url ? (
                                                <img 
                                                    src={student.profileImage.url} 
                                                    alt={`${student.firstName} ${student.lastName}`}
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="bg-neutral-focus text-neutral-content w-full h-full flex items-center justify-center text-4xl">
                                                    {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div>
                                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                                {student.firstName} {student.lastName}
                                            </h1>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="badge badge-primary badge-lg text-white">
                                                    {capitalizeWords(student.grade)}
                                                </span>
                                                <span className="text-gray-600">
                                                    {getAge(student.dateOfBirth)} years old
                                                </span>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => {
                                                setIsStudentProfileOpen(false);
                                                setIsEditStudentOpen(true);
                                            }} 
                                            className="btn btn-primary btn-sm sm:btn-md gap-2"
                                        >
                                            <FaRegEdit />
                                            Edit Profile
                                        </button>
                                    </div>
                                    
                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <p className="text-xs text-gray-500">Student ID</p>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold">{student.studentId}</p>
                                                    <CopyButton textToCopy={student.studentId} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <p className="text-xs text-gray-500">Email</p>
                                                <p className="font-semibold">{student.email || 'Not provided'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Grid Sections */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Personal Information */}
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-3 mb-4">
                                        <IoPersonOutline className="text-2xl text-primary" />
                                        <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">First Name</p>
                                                <p className="font-medium">{student.firstName}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Last Name</p>
                                                <p className="font-medium">{student.lastName}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-2">
                                                <div>
                                                    <p className="text-sm text-gray-500">Date of Birth</p>
                                                    <p className="font-medium">{formatDate(new Date(student.dateOfBirth))}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div>
                                                    <p className="text-sm text-gray-500">Gender</p>
                                                    <p className="font-medium">{capitalizeWords(student.gender)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <p className="text-sm text-gray-500">Contact Number</p>
                                                <p className="font-medium">{student.contactNumber || 'Not provided'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Academic Information */}
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-3 mb-4">
                                        <HiOutlineAcademicCap className="text-2xl text-primary" />
                                        <h3 className="text-xl font-semibold text-gray-800">Academic Information</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Grade Level</p>
                                                <p className="font-medium">{capitalizeWords(student.grade)}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">General Average</p>
                                                <p className="font-medium">{student.grades?.generalAverage || 'No grades yet'}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Enrollment Date</p>
                                                <p className="font-medium">{formatDate(new Date(student.enrollmentDate))}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Attendance Rate</p>
                                                <p className="font-medium">{student.attendance?.attendanceRate || 'No attendance yet'}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Adviser</p>
                                            <p className="font-medium">{student.adviser || 'No adviser yet'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Address Information */}
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-3 mb-4">
                                        <IoLocationOutline className="text-2xl text-primary" />
                                        <h3 className="text-xl font-semibold text-gray-800">Address</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Street</p>
                                            <p className="font-medium">{capitalizeWords(student.address?.street)}</p>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Barangay</p>
                                                <p className="font-medium">{capitalizeWords(student.address?.barangay)}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">City</p>
                                                <p className="font-medium">{capitalizeWords(student.address?.city)}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">ZIP Code</p>
                                            <p className="font-medium">{student.address?.zip || 'Not provided'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Parent/Guardian Information */}
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-3 mb-4">
                                        <RiParentLine className="text-2xl text-primary" />
                                        <h3 className="text-xl font-semibold text-gray-800">Parent/Guardian</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Name</p>
                                            <p className="font-medium">{capitalizeWords(student.parentGuardianName)}</p>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-2">
                                                <div>
                                                    <p className="text-sm text-gray-500">Contact Number</p>
                                                    <p className="font-medium">{student.parentContactNumber}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div>
                                                    <p className="text-sm text-gray-500">Email</p>
                                                    <p className="font-medium">{student.parentEmail || 'Not provided'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="mt-4 text-lg font-medium text-gray-600">No student data found</p>
                        </div>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default StudentProfile;