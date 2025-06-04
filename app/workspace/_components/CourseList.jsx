"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react'
import AddNewCourseDialogue from './AddNewCourseDialogue'

const CourseList = () => {
    const [CourseLists, setCourseLists] = useState([])
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
            : <div> 
                List of Courses
            </div>
        }
    </div>
  )
}

export default CourseList