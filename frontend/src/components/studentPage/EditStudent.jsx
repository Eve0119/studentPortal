import React, { useState, useRef, useEffect } from 'react'
import toast from 'react-hot-toast'
import axiosInstance from '../../lib/axios';

const EditStudent = ({
    isEditStudentOpen, 
    setIsEditStudentOpen, 
    studentId,
    setStudent,
    student
}) => {
    const editStudentRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isEditStudentOpen && studentId) { 
            editStudentRef.current?.showModal();
            const fetchStudent = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const res =  await axiosInstance.get(`/student/${studentId}`);
                    setStudent(res.data);
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
            <div>
                <div>
                    <div>
                        <h2>
                            Edit Student Profile
                        </h2>
                    </div>
                </div>
            </div>
        </dialog>
    </div>
  )
}

export default EditStudent