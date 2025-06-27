import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaMale, FaFemale } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import axiosInstance from '../lib/axios'
import getAge from '../lib/getAge';

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
    <div className='bg-white min-h-screen'>
      <div className="overflow-x-auto rounded-2xl border border-base-200 bg-base-100 m-10">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-primary bg-base-200">
                <th className="px-6 py-2 text-left font-semibold">Student</th>
                <th className="px-6 py-2 text-left font-semibold">Student ID</th>
                <th className="px-6 py-2 text-left font-semibold">Grade</th>
                <th className="px-6 py-2 text-left font-semibold">Status</th>
                <th className="px-6 py-2 text-left font-semibold">Age</th>
                <th className="px-6 py-2 text-left font-semibold">Gender</th>
                <th className="px-6 py-2 text-left font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr key={student.id || idx} className="border-t last:border-b border-base-200 hover:bg-base-200">
                  <td className="flex items-center gap-4 px-6 py-2">
                    <div>
                      <div className="font-bold text-primary text-lg">{student.lastName}</div>
                      <div className="text-sm text-black">{student.firstName + " " + student.middleInitial + "."}</div>
                    </div>
                  </td>
                  <td className="px-6 py-2">
                    <span className="bg-white text-primary px-3 py-1 rounded font-mono text-sm">
                      {student.studentId}
                    </span>
                  </td>
                  <td className="px-6 py-2 font-semibold text-primary">{student.grade}</td>
                  <td className="px-6 py-2">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20">
                      {student.status || "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-2">
                    <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-semibold border border-secondary/20">
                      {getAge(student.dateOfBirth)}
                    </span>
                  </td>
                  <td className="px-6 py-2">
                    {student.gender === 'male'
                      ? (<FaMale color='72d8e4' fontSize={22} />)
                      : (<FaFemale color='f980ea' fontSize={22} />)
                    }
                  </td>
                  <td className="px-6 py-2">
                    <button className="btn btn-circle btn-sm btn-ghost text-primary">
                      <IoIosMore fontSize={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Students