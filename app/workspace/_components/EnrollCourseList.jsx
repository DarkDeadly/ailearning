"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EnrollCourseCard from './EnrollCourseCard'

const EnrollCourseList = () => {
    const [EnrolledCourses, setEnrolledCourses] = useState([])
    useEffect(() => {
     GetEnrolledCourse()
    }, [])
    
    const GetEnrolledCourse = async() => {
        try {
          const result = await axios.get('/api/enroll-course')  
          console.log(result.data)
          setEnrolledCourses(result.data)
        } catch (error) {
           console.log(error) 
        }
    }
  return EnrolledCourses?.length > 0 && (
    <div className='mt-3'>
        <h2 className='font-bold text-3xl'>Continue Learning yor courses</h2>

       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-10'>
         {EnrolledCourses?.map((course , index) => (
            <EnrollCourseCard courses = {course?.courses} key={index} enrollcourses = {course?.enrollcourse}/>
        ))}
       </div>
    </div>
  )
}

export default EnrollCourseList