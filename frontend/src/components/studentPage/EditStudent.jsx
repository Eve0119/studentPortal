import React, { useState, useRef, useEffect } from 'react'
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
                    setStudent = res.data
                } catch (error) {
                    
                }
            }
        }
    },[])

    return (
    <div></div>
  )
}

export default EditStudent