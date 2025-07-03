import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axiosInstance from '../lib/axios'
import { IoIosAdd } from "react-icons/io";
import StudentTable from '../components/studentPage/StudentTable';
import StudentForm from '../components/studentPage/StudentForm';

const Students = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [students, setStudents] = useState([])
    const [search, setSearch] = useState('')
    const [gradeFilter, setGradeFilter] = useState('')
    const [genderFilter, setGenderFilter] = useState('')
    const [isStudentFormOpen, setIsStudentFormOpen] = useState(false)

    useEffect(() => {
      const fetchStudents = async () => {
        try {
          const res = await axiosInstance.get('/student')
          console.log(res.data)
          setStudents(res.data)
        } catch (error) {
          console.log("Error fetching students", error)
          toast.error("Failed to fetch students. Please try again later")
        } finally {
          setIsLoading(false)
        }
      }
      fetchStudents()
    },[])

    const filteredStudents = students.filter((task) => {
      const matchesSearch = task.firstName
        .toLowerCase()
        .includes(search.toLowerCase())
        ||
        task.lastName
        .toLowerCase()
        .includes(search.toLowerCase())
        ||
        task.middleInitial
        .toLowerCase()
        .includes(search.toLowerCase())
        ||
        task.studentId
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchesGradeFilter =
        gradeFilter.trim() === '' ||
        task.grade.trim().toLowerCase() === gradeFilter.trim().toLowerCase();

      const matchesGenderFilter =
        genderFilter.trim() === '' ||
        task.gender.trim().toLowerCase() === genderFilter.trim().toLowerCase();
      
      return matchesSearch && matchesGradeFilter && matchesGenderFilter
    })

  return (
    <div>
      <div className='flex justify-between m-10 mt-1 mb-5'>
        <div>
          <div>
            <span className='text-primary-content font-bold text-3xl '>Students</span>
          </div>
          <div>
            <span className='text-secondary-content text-base md:text-base'>
              Manage student records and information
            </span>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setIsStudentFormOpen(true)}>
          <IoIosAdd className='text-base-100 text-2xl'/>
          <span className='text-base-100'>
            Add New Student
          </span>
        </button>
      </div>
      <StudentForm 
        isStudentFormOpen={isStudentFormOpen}
        setIsStudentFormOpen={setIsStudentFormOpen}
      />
      <StudentTable
        genderFilter={genderFilter}
        gradeFilter={gradeFilter} 
        isLoading={isLoading} 
        filteredStudents={filteredStudents}
        setGenderFilter={setGenderFilter}
        setGradeFilter={setGradeFilter}
        setSearch={setSearch}
      />
    </div>
  )
}

export default Students