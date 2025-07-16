import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axiosInstance from '../lib/axios'
import { IoIosAdd } from "react-icons/io";
import StudentTable from '../components/studentPage/StudentTable';
import StudentForm from '../components/studentPage/StudentForm';
import StudentProfile from '../components/studentPage/StudentProfile';
import EditStudent from '../components/studentPage/EditStudent';

const Students = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [students, setStudents] = useState([])
    const [student, setStudent] = useState(null)
    const [search, setSearch] = useState('')
    const [gradeFilter, setGradeFilter] = useState('')
    const [genderFilter, setGenderFilter] = useState('')
    const [isStudentFormOpen, setIsStudentFormOpen] = useState(false)
    const [isStudentProfileOpen, setIsStudentProfileOpen] = useState(false)
    const [isEditStudentOpen, setIsEditStudentOpen] = useState(false)
    const [studentId, setStudentId] = useState('')

    useEffect(() => {
      const fetchStudents = async () => {
        try {
          const res = await axiosInstance.get('/student')
          setStudents(res.data)
        } catch (error) {
          console.error("Error fetching students", error)
          toast.error("Failed to fetch students. Please try again later")
        } finally {
          setIsLoading(false)
        }
      }
      fetchStudents()
    },[])

    const filteredStudents = students.filter((task) => {
      const matchesSearch = task.firstName.toLowerCase().includes(search.toLowerCase()) ||
                           task.lastName.toLowerCase().includes(search.toLowerCase()) ||
                           task.middleInitial.toLowerCase().includes(search.toLowerCase()) ||
                           task.studentId.toLowerCase().includes(search.toLowerCase())

      const matchesGradeFilter = gradeFilter.trim() === '' ||
                               task.grade.trim().toLowerCase() === gradeFilter.trim().toLowerCase();

      const matchesGenderFilter = genderFilter.trim() === '' ||
                                task.gender.trim().toLowerCase() === genderFilter.trim().toLowerCase();
      
      return matchesSearch && matchesGradeFilter && matchesGenderFilter
    })

    const handleSubmitStudentForm = async (formData) => {
        try {
            const response = await axiosInstance.post('/student', formData);
            toast.success('Student added successfully!');
            setIsStudentFormOpen(false);
            
            // Refresh student list
            const res = await axiosInstance.get('/student');
            setStudents(res.data);
            
        } catch (error) {
            toast.error('Failed to add student');
            console.error("Submission error:", error);
        }
    };

  return (
    <div>
      {/* Responsive Header Section */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 m-4 md:mr-10 md:ml-10 mt-1 mb-5'>
        <div>
          <h1 className='text-primary-content font-bold text-xl md:text-2xl lg:text-3xl'>
            Students
          </h1>
          <p className='text-secondary-content text-sm md:text-base'>
            Manage student records and information
          </p>
        </div>
        
        {/* Responsive Button */}
        <button 
          className="btn btn-primary btn-sm md:btn-md whitespace-nowrap"
          onClick={() => setIsStudentFormOpen(true)}
        >
          <IoIosAdd className='text-base-100 text-lg md:text-xl'/>
          <span className='text-base-100 text-xs md:text-sm'>
            Add New Student
          </span>
        </button>
      </div>
      <EditStudent 
        setStudent={setStudent}
        student={student}
        isEditStudentOpen={isEditStudentOpen}
        setIsEditStudentOpen={setIsEditStudentOpen}
        studentId={studentId}
      />
      <StudentProfile 
        setIsEditStudentOpen={setIsEditStudentOpen}
        isStudentProfileOpen={isStudentProfileOpen}
        setIsStudentProfileOpen={setIsStudentProfileOpen}
        studentId={studentId}
        setStudentId={setStudentId}
        student={student}
        setStudent={setStudent}
      />
      <StudentForm 
        isStudentFormOpen={isStudentFormOpen}
        setIsStudentFormOpen={setIsStudentFormOpen}
        handleSubmitStudentForm={handleSubmitStudentForm}
      />
      <StudentTable

        genderFilter={genderFilter}
        gradeFilter={gradeFilter} 
        search={search}
        isLoading={isLoading} 
        filteredStudents={filteredStudents}
        setGenderFilter={setGenderFilter}
        setGradeFilter={setGradeFilter}
        setSearch={setSearch}
        setIsStudentProfileOpen={setIsStudentProfileOpen}
        setStudentId={setStudentId}
        setIsEditStudentOpen={setIsEditStudentOpen}
      />
    </div>
  )
}

export default Students