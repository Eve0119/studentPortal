import React, {useState} from 'react'
import { MdPeopleOutline } from "react-icons/md";
import { PiExam } from "react-icons/pi";
import { PiChartLineDown } from "react-icons/pi";
import { CgPerformance } from "react-icons/cg";
import GradeTable from '../components/gradePage/GradeTable';
import GradeForm from '../components/gradePage/GradeForm';

const Grades = () => {
    const statisticsData = {
        totalStudent: 0,
        averageGrade: 0,
        failingStudents: 0,
        performanceTrend: 0
    }

    const [statistics, setStatistics] = useState(statisticsData);
    const [isGradeFormOpen, setIsGradeFormOpen] = useState(false);

    const handleSubmitGradeForm = (e) => {
        e.preventDefault();
        console.log("Grade form submitted");
        setIsGradeFormOpen(false);
    }

  return (
    <div>
        <div className='bg-white w-auto border border-neutral-content p-4 md:p-6 m-4 md:m-7 rounded-lg flex flex-col gap-4 md:gap-6'>
            <div>
                <h1 className='text-2xl md:text-3xl font-bold'>Grades & Progress</h1>
                <div className='pt-1'>
                    <span className='text-sm md:text-base text-neutral-content'>Track student academic progress and performance</span>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4'>
                <div className='border rounded-lg p-3 md:p-4 flex items-center gap-3 md:gap-4 bg-base-100 hover:scale-105 sm:hover:scale-110 transition-transform'>
                    <div className='p-2 md:p-3 rounded-lg bg-info text-white'>
                        <MdPeopleOutline className='text-xl md:text-2xl' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-xl md:text-2xl font-bold'>{statistics.totalStudent}</span>
                        <span className='text-xs md:text-sm text-neutral'>Total Students</span>
                    </div>
                </div>
                <div className='border rounded-lg p-3 md:p-4 flex items-center gap-3 md:gap-4 bg-base-100 hover:scale-105 sm:hover:scale-110 transition-transform'>
                    <div className='p-2 md:p-3 rounded-lg bg-success text-white'>
                        <PiExam className='text-xl md:text-2xl' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-xl md:text-2xl font-bold'>{statistics.averageGrade}</span>
                        <span className='text-xs md:text-sm text-neutral'>Average Grade</span>
                    </div>
                </div>
                <div className='border rounded-lg p-3 md:p-4 flex items-center gap-3 md:gap-4 bg-base-100 hover:scale-105 sm:hover:scale-110 transition-transform'>
                    <div className='p-2 md:p-3 rounded-lg bg-error text-white'>
                        <PiChartLineDown className='text-xl md:text-2xl' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-xl md:text-2xl font-bold'>{statistics.failingStudents}</span>
                        <span className='text-xs md:text-sm text-neutral'>Failing Students</span>
                    </div>
                </div>
                <div className='border rounded-lg p-3 md:p-4 flex items-center gap-3 md:gap-4 bg-base-100 hover:scale-105 sm:hover:scale-110 transition-transform'>
                    <div className='p-2 md:p-3 rounded-lg bg-warning text-white'>
                        <CgPerformance className='text-xl md:text-2xl' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-xl md:text-2xl font-bold'>{statistics.performanceTrend}</span>
                        <span className='text-xs md:text-sm text-neutral'>Performance Trend</span>
                    </div>
                </div>
            </div>
        </div>
        <GradeTable 
            setIsGradeFormOpen={setIsGradeFormOpen}
        />
        <GradeForm 
            isGradeFormOpen={isGradeFormOpen}
            setIsGradeFormOpen={setIsGradeFormOpen}
            handleSubmitGradeForm={handleSubmitGradeForm}   
        />
    </div>
  )
}

export default Grades