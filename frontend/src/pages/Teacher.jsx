import React, {useState} from 'react'
import TeacherTable from '../components/teacherPage/TeacherTable'

const Teacher = () => {
  const [isTeacherFormOpen, setIsTeacherFormOpen] = useState(false)

  return (
    <div className="overflow-x-auto">
      <div className='flex flex-col w-auto border border-neutral-content rounded-lg bg-white text-center m-4 md:m-7 p-4 md:p-6 items-start gap-4 md:gap-6'>
        <div className='items-start flex flex-col w-full'>
          <h1 className='text-2xl md:text-3xl font-bold text-primary-content'>Teacher Management</h1>
          <div>
            <span className='text-sm md:text-base text-neutral-content'>Manage teaching staff, schedules and assignment</span>
          </div>
        </div>
        <div className='flex flex-col md:flex-row w-full items-center gap-4 justify-center'>
          <div className="stats bg-success text-white gap-4 md:gap-10 border border-neutral-content rounded-lg flex flex-col md:flex-row w-full">
            <div className="stat">
              <div className="stat-figure text-primary-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 md:h-8 md:w-8 stroke-current">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="stat-title text-xs md:text-sm text-primary-content">Downloads</div>
              <div className="stat-value text-lg md:text-xl">31K</div>
              <div className="stat-desc text-xs md:text-sm text-primary-content">Jan 1st - Feb 1st</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-primary-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 md:h-8 md:w-8 stroke-current">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
              </div>
              <div className="stat-title text-xs md:text-sm text-primary-content">New Users</div>
              <div className="stat-value text-lg md:text-xl">4,200</div>
              <div className="stat-desc text-xs md:text-sm text-primary-content">↗︎ 400 (22%)</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-primary-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 md:h-8 md:w-8 stroke-current">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                </svg>
              </div>
              <div className="stat-title text-xs md:text-sm text-primary-content">New Registers</div>
              <div className="stat-value text-lg md:text-xl">1,200</div>
              <div className="stat-desc text-xs md:text-sm text-primary-content">↘︎ 90 (14%)</div>
            </div>
          </div>
        </div>
      </div>
      <TeacherTable
        setIsTeacherFormOpen={setIsTeacherFormOpen}
        isTeacherFormOpen={isTeacherFormOpen}
      />
    </div>
  )
}

export default Teacher