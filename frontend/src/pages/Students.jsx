import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaMale, FaFemale } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import axiosInstance from '../lib/axios'
import { getAge, formatDate } from '../lib/utils';

const Students = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [students, setStudents] = useState([])

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

  return (
    <div className='bg-white min-w-fit min-h-fit m-2 md:m-10 p-4 md:p-10'>
      <div >
        <span className='justify-start text-primary-content font-semibold text-xl md:text-2xl'>
          Student Directory
        </span>
      </div>
      <div className='pb-6 md:pb-10'>
        <span className='text-secondary-content text-sm md:text-base'>
          View and manage all students in your school
        </span>
      </div>
      <div className="rounded-xl md:rounded-2xl border border-base-200 bg-base-100">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        ) : (
          <div className="w-full">
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
                  {students.map((student, idx) => (
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
                      <td className="px-2 py-2 hidden sm:table-cell">
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