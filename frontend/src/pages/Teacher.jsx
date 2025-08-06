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
        <div className="flex flex-col w-full items-center justify-center">
          <div className="w-full bg-gradient-to-br from-success to-accent rounded-xl shadow-lg p-4 md:p-6 flex flex-col md:flex-row gap-6 md:gap-10">
            {/* Stat Card */}
            <div className="flex-1 bg-white rounded-lg shadow-md flex flex-col items-center py-6 px-4 mb-4 md:mb-0 hover:scale-105 transition-transform">
              <div className="bg-success/20 rounded-full p-3 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  className="h-8 w-8 md:h-10 md:w-10 text-success">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="font-semibold text-base md:text-lg text-success mb-1">Downloads</div>
              <div className="text-2xl md:text-3xl font-bold text-neutral">{'31K'}</div>
              <div className="text-xs md:text-sm text-neutral-content">Jan 1st - Feb 1st</div>
            </div>
            {/* Stat Card */}
            <div className="flex-1 bg-white rounded-lg shadow-md flex flex-col items-center py-6 px-4 mb-4 md:mb-0 hover:scale-105 transition-transform">
              <div className="bg-accent/20 rounded-full p-3 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  className="h-8 w-8 md:h-10 md:w-10 text-accent">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
              </div>
              <div className="font-semibold text-base md:text-lg text-accent mb-1">New Users</div>
              <div className="text-2xl md:text-3xl font-bold text-neutral">{'4,200'}</div>
              <div className="text-xs md:text-sm text-neutral-content">↗︎ 400 (22%)</div>
            </div>
            {/* Stat Card */}
            <div className="flex-1 bg-white rounded-lg shadow-md flex flex-col items-center py-6 px-4 hover:scale-105 transition-transform">
              <div className="bg-primary/20 rounded-full p-3 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  className="h-8 w-8 md:h-10 md:w-10 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                </svg>
              </div>
              <div className="font-semibold text-base md:text-lg text-primary mb-1">New Registers</div>
              <div className="text-2xl md:text-3xl font-bold text-neutral">{'1,200'}</div>
              <div className="text-xs md:text-sm text-neutral-content">↘︎ 90 (14%)</div>
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