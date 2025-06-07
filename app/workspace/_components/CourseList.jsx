"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import AddNewCourseDialogue from './AddNewCourseDialogue'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import CourseCard from './CourseCard'

const CourseList = () => {
    const [CourseLists, setCourseLists] = useState([])
    const {user} = useUser()

    useEffect(() => {
        user && CoursesLists() ;
    }, [user])
    

    const CoursesLists = async () => {
        const GetDatas = await axios.get("/api/courses")
        console.log(GetDatas.data)
        setCourseLists(GetDatas.data)
    } 

  return (
    <div className='mt-10'>
        <h2 className='font-bold text-3xl'>Course List</h2>
        {
            CourseLists?.length==0 ? 
            <div className='flex p-7 items-center justify-center flex-col border rounded-2xl bg-secondary mt-2'>
                <Image src={'/online-education.svg'} alt='CourseImage' width={80} height={80}/>
                <h2 className='my-2 text-xl font-bold'>looks like you haven't created any course yet</h2>
                <AddNewCourseDialogue>
                    <Button className={"text-md cursor-pointer"}>+ Create your First Course </Button>
                </AddNewCourseDialogue>
            </div>
            : <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-10'> 
                {
                    CourseLists?.map((courses , index) => (
                        <CourseCard courses = {courses} key = {index}/>
                    ))
                }
            </div>
        }
    </div>
  )
}

export default CourseList