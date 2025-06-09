"use client"

import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Book, Loader2Icon, PlayCircle, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'

const CourseCard = ({courses}) => {
    const CourseContent = courses?.courseJson?.course
    const [Loading, setLoading] = useState(false)
    const onEnrollCourse = async() => {
      try {
        setLoading(true)
        const result = await axios.post("/api/enroll-course" , {
          courseId : courses?.cid
        })
        console.log(result.data.message)
        if (result.data.message) {
         alert("User already enrolled")
         setLoading(false)
         return
        }
        toast.success('enrolled !!')
        setLoading(false)

      } catch (error) {
        console.log(error)
        toast.error("server side error")
        setLoading(false)

      }
    }

  return (
    <div className='shadow-2xl rounded-xl'>
        <Image 
        src={courses?.bannerImage} 
        alt={courses?.name} 
        width={400} 
        height={300}
        className='w-full aspect-video rounded-t-xl object-cover'
        />
        <div className='flex flex-col gap-3 p-3'>
            <h2 className='font-bold text-lg'>{CourseContent?.name}</h2>
            <p className='line-clamp-3 text-gray-500'>{CourseContent?.description}</p>
            <div className='flex justify-between items-center '>
                <h2 className='flex items-center gap-2'><Book className='text-primary h-5 w-5'/> {CourseContent?.noOfChapters} chapters</h2>
                {
                 courses?.courseInfo?.length ? <Button className={'cursor-pointer '} size={'sm'} disabled = {Loading} onClick = {onEnrollCourse}>{Loading ? <Loader2Icon className='animate-spin' /> : <PlayCircle/> } Enroll Course</Button> 
                 :<Link href={"/workspace/edit-course/"+courses.cid}><Button className={'cursor-pointer '} size={'sm'} variant="outline"><Settings/>Generate Course</Button></Link>   
                }
            </div>
        </div>
    </div>
  )
}

export default CourseCard