"use client"

import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseInfo from '../_components/CourseInfo'
import ChapterListContent from '../_components/ChapterListContent'

const EditCourse = () => {
    const {courseId} = useParams()
    const [isLoading, setisLoading] = useState(false)
    const [Course, setCourse] = useState()
    console.log(courseId)
    useEffect(() => {
     GetCourse()
    }, [])
    
    const GetCourse = async() => {
        setisLoading(true)
        const result = await axios.get('/api/courses?courseId=' + courseId)
        console.log(result.data)
        setCourse(result.data)
        setisLoading(false)
        

    }
  return (
    <div>
        <CourseInfo course = {Course}/>
        <ChapterListContent course = {Course} />
    </div>
  )
}

export default EditCourse