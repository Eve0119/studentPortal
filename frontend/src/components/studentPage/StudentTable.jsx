import React, { useEffect, useState } from 'react';
import { FaMale, FaFemale, FaCloudDownloadAlt } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { getAge, formatDate, exportToExcel } from '../../lib/utils';

const StudentTable = ({ 
  genderFilter, 
  gradeFilter, 
  search,
  isLoading, 
  filteredStudents, 
  setGradeFilter, 
  setSearch, 
  setGenderFilter,
  setIsStudentProfileOpen,
  setStudentId,
  setIsEditStudentOpen
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false)
  const itemsPerPage = 5;
  
  // Calculate current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1)
  }, [gradeFilter, genderFilter, search])
  
  const handleExport = async () => {
  try {
    setIsExporting(true);
    const fileName = `students_${new Date().toISOString().split('T')[0]}.xlsx`;
    await exportToExcel(filteredStudents, fileName);
  } catch (error) {
    console.error('Export failed:', error);
    alert('Export failed. Please try again.');
  } finally {
    setIsExporting(false);
  }
};

  return (
    <div className='bg-white min-w-fit min-h-fit m-2 md:m-10 md:mt-5 p-4 md:p-10 md:pt-5 rounded-lg md:rounded-lg border border-base-200 pb-0'>
      <div>
        <span className='justify-start text-primary-content text-2xl font-bold md:text-2xl'>
          Student Directory
        </span>
      </div>
      <div className='pb-5 md:pb-5'>
        <span className='text-neutral-content text-sm md:text-base'>
          View and manage all students in your school
        </span>
      </div>
      
      {/* Responsive Filter Section */}
      <div className='pb-5 flex flex-col sm:flex-row gap-3 flex-wrap'>
        {/* Search Input */}
        <div className="flex-1">
          <label className="input input-bordered flex items-center gap-2 w-full">
            <input 
              type="text" 
              className="grow" 
              placeholder="Search students..." 
              onChange={(e) => setSearch(e.target.value)}
            />
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

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Grade Filter */}
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

          {/* Gender Filter */}
          <select 
            className="select select-bordered hidden sm:flex sm:w-32"
            value={genderFilter}
            onChange={e => setGenderFilter(e.target.value)}
          >
            <option value="">All Gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>

          {/* Export Button */}
          <button 
            className="btn btn-outline btn-primary w-full sm:w-auto"
            onClick={handleExport}
            disabled={currentItems.length === 0 || isExporting}
          >
            {isExporting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <span className="hidden sm:inline">Export</span>
                <FaCloudDownloadAlt className='text-xl sm:ml-2'/>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div>
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        ) : (
          <>
            <div className="w-full min-h-0">
              <table className="w-full table-auto table-zebra"> 
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
                  {currentItems.map((student) => (
                    <tr key={student._id} className="border-t last:border-b border-base-200 hover:bg-base-200">
                      <td className="flex items-center gap-2 md:gap-4 px-2 py-2">
                        <div className='flex gap-4'>
                          <div className='avatar'>
                            <div className="w-8 rounded-full">
                              <img src={student.profileImage?.url || "https://academix-student-portal.s3.ap-southeast-2.amazonaws.com/default-profile/student-default-profile-male.webp"} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-primary text-base md:text-lg">{student.lastName}</div>
                            <div className="text-xs md:text-sm text-black">{student.firstName + " " + student.middleInitial + "."}</div>
                          </div>
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
                          <button className="btn btn-circle btn-sm btn-ghost text-primary" >
                            <IoIosMore fontSize={18} />
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                              <li onClick={() => {setIsStudentProfileOpen(true); setStudentId(student._id)}}><a>View Profile</a></li>
                              <li onClick={() => {setIsEditStudentOpen(true); setStudentId(student._id)}}><a>Edit Student</a></li>
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-4 px-2 py-2">
                <div className="text-sm text-gray-600 whitespace-nowrap">
                  Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredStudents.length)} of {filteredStudents.length}
                </div>
                
                <div className="join flex-wrap justify-center">
                  <button 
                    onClick={() => setCurrentPage(1)} 
                    disabled={currentPage === 1}
                    className="join-item btn btn-sm"
                    aria-label="First page"
                  >
                    <span className="hidden sm:inline">««</span>
                    <span className="sm:hidden">First</span>
                  </button>
                  
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="join-item btn btn-sm"
                    aria-label="Previous page"
                  >
                    <span className="hidden sm:inline">«</span>
                    <span className="sm:hidden">Prev</span>
                  </button>
                  
                  <div className="join-item px-3 flex items-center text-sm">
                    Page {currentPage} of {totalPages}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="join-item btn btn-sm"
                    aria-label="Next page"
                  >
                    <span className="hidden sm:inline">»</span>
                    <span className="sm:hidden">Next</span>
                  </button>
                  
                  <button 
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="join-item btn btn-sm"
                    aria-label="Last page"
                  >
                    <span className="hidden sm:inline">»»</span>
                    <span className="sm:hidden">Last</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentTable;