import React, { useEffect, useState } from 'react'
import axiosInstance from '../lib/axios'
import toast from 'react-hot-toast'
import { FaMale, FaFemale } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";

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
    <div>
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white m-10">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        ) : (
          <table className="table-zebra min-w-full table-auto">
            <thead>
              <tr className="text-gray-700 bg-gray-100">
                <th className="px-6 py-2 text-left font-semibold">Student</th>
                <th className="px-6 py-2 text-left font-semibold">Student ID</th>
                <th className="px-6 py-2 text-left font-semibold">Grade</th>
                <th className="px-6 py-2 text-left font-semibold">Status</th>
                <th className="px-6 py-2 text-left font-semibold">Gender</th>
                <th className="px-6 py-2 text-left font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr key={student.id || idx} className="border-t last:border-b hover:bg-gray-50">
                  <td className="flex items-center gap-4 px-6 py-2">
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{student.lastName}</div>
                      <div className="text-sm text-gray-500">{student.firstName + " " + student.middleInitial + "."}</div>
                    </div>
                  </td>
                  <td className="px-6 py-2">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded font-mono text-sm">
                      {student.studentId}
                    </span>
                  </td>
                  <td className="px-6 py-2 font-semibold text-gray-700">{student.grade}</td>
                  <td className="px-6 py-2">
                    <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                      {student.status || "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-2">
                    {student.gender === 'male' ? (<FaMale color='72d8e4' fontSize={25}/>):(<FaFemale color='f980ea' fontSize={25}/>)}
                  </td>
                  <td className="px-6 py-2">
                    <button className="btn btn-circle btn-neutral btn-sm no-animation btn-ghost">
                      <IoIosMore fontSize={20}/>
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