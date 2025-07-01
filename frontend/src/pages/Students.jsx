import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaMale, FaFemale, FaCloudDownloadAlt } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import axiosInstance from '../lib/axios'
import { getAge, formatDate } from '../lib/utils';

const Students = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [students, setStudents] = useState([])
    const [search, setSearch] = useState('')
    const [gradeFilter, setGradeFilter] = useState('')
    const [genderFilter, setGenderFilter] = useState('')

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
    <div className='bg-white min-w-fit min-h-fit m-2 md:m-10 p-4 md:p-10 rounded-xl md:rounded-2xl border border-base-200'>
      <div >
        <span className='justify-start text-primary-content font-semibold text-xl md:text-2xl'>
          Student Directory
        </span>
      </div>
      <div className='pb-5 md:pb-5'>
        <span className='text-secondary-content text-sm md:text-base'>
          View and manage all students in your school
        </span>
      </div>
      
      {/* Responsive Filter Section */}
      <div className='pb-5 flex flex-col sm:flex-row gap-3'>
        {/* Search Input - Full width on mobile, flex-1 on larger screens */}
        <div className="flex-1">
          <label className="input input-bordered flex items-center gap-2 w-full">
            <input type="text" className="grow" placeholder="Search students..." onChange={(e) => setSearch(e.target.value)}/>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
            </svg>
          </label>
        </div>

        {/* Filters - Stack vertically on mobile, row on larger screens */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Grade Filter - Hidden on smallest screens */}
          <select
            className="select select-bordered xs:flex sm:w-40"
            value={gradeFilter}
            onChange={e => setGradeFilter(e.target.value)}
          >
            <option value="">All Grades</option>
            <option value="Pre-K">Pre-K</option>
            <option value="Kindergarten">Kindergarten</option>
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 2">Grade 2</option>
            <option value="Grade 3">Grade 3</option>
            <option value="Grade 4">Grade 4</option>
            <option value="Grade 5">Grade 5</option>
            <option value="Grade 6">Grade 6</option>
          </select>

          {/* Gender Filter - Hidden on smallest screens */}
          <select className="select select-bordered hidden sm:flex sm:w-32">
            <option selected value=''>All Gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>

          {/* Export Button - Full width on mobile, auto on larger screens */}
          <button className="btn btn-outline btn-primary w-full sm:w-auto">
            <span className="hidden sm:inline">Export</span>
            <FaCloudDownloadAlt className='text-xl sm:ml-2'/>
          </button>
        </div>
      </div>

      <div>
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="min-w-full table-auto table-zebra">
                <thead>
                  <tr className="text-white bg-accent">
                    <th className="px-2 py-2 text-left font-semibold text-sm md:text-base">Student</th>
                    <th className="px-2 py-2 text-left font-semibold text-sm md:text-base hidden sm:table-cell">Student ID</th>
                    <th className="px-2 py-2 text-left font-semibold text-sm md:text-base">Grade</th>
                    <th className="px-2 py-2 text-left font-semibold text-sm md:text-base hidden xs:table-cell">Age</th>
                    <th className="px-2 py-2 text-left font-semibold text-sm md:text-base hidden sm:table-cell">Gender</th>
                    <th className="px-2 py-2 text-left font-semibold text-sm md:text-base hidden md:table-cell">Guardian</th>
                    <th className="px-2 py-2 text-left font-semibold text-sm md:text-base hidden lg:table-cell">Enrolled On</th>
                    <th className="px-2 py-2 text-left font-semibold text-sm md:text-base">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, idx) => (
                    <tr key={student.id || idx} className="border-t last:border-b border-base-200 hover:bg-base-200">
                      <td className="flex items-center gap-2 md:gap-4 px-2 py-2">
                        <div>
                          <div className="font-bold text-primary text-base md:text-lg">{student.lastName}</div>
                          <div className="text-xs md:text-sm text-black">{student.firstName + " " + student.middleInitial + "."}</div>
                        </div>
                      </td>
                      <td className="px-2 py-2 hidden sm:table-cell">
                        <span className="bg-white text-primary px-2 md:px-3 py-1 rounded font-mono text-xs md:text-sm">
                          {student.studentId}
                        </span>
                      </td>
                      <td className="px-2 py-2 font-semibold text-primary text-sm md:text-base">{student.grade}</td>
                      <td className="px-2 py-2 hidden xs:table-cell">
                        <span className="bg-secondary/10 text-secondary px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold border border-secondary/20">
                          {getAge(student.dateOfBirth)}
                        </span>
                      </td>
                      <td className="px-2 py-2 hidden sm:table-cell pl-5">
                        {student.gender === 'male'
                          ? (<FaMale color='72d8e4' fontSize={20} />)
                          : (<FaFemale color='f980ea' fontSize={20} />)
                        }
                      </td>
                      <td className="px-2 py-2 hidden md:table-cell">
                        <span className="bg-warning/20 text-primary px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold border border-warning/20">
                          {student.parentGuardianName}
                        </span>
                      </td>
                      <td className="px-2 py-2 font-semibold text-primary hidden lg:table-cell">
                        <div className="text-xs md:text-sm">
                          {formatDate(new Date(student.enrollmentDate))}
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <div className='dropdown dropdown-hover dropdown-bottom dropdown-end'>
                          <button className="btn btn-circle btn-sm btn-ghost text-primary">
                            <IoIosMore fontSize={18} />
                              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>View Profile</a></li>
                                <li><a>Edit Student</a></li>
                                <li><a>View Grades</a></li>
                                <li><a>View Attendance</a></li>
                                <li><a className='text-orange-600'>Remove Student</a></li>
                              </ul>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Students