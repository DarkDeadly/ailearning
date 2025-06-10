"use client"
import { Button } from '@/components/ui/button'
import { toast } from "sonner"
import axios from 'axios'
import { Book, Clock, Loader2Icon, PlayCircle, Settings, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CourseInfo = ({course , viewCourse}) => {
    const CourseContent = course?.courseJson?.course
    const router = useRouter()
    const [isLoading, setisLoading] = useState(false)
    const GenerateCourseContent = async () => {
        setisLoading(true)
       try {
         const result = await axios.post("/api/generate-course-content" , {
            courseJson :CourseContent , 
             courseTitle : course?.name, 
             courseId: course?.cid
        })
        console.log(result.data)
        setisLoading(false)
        router.push("/workspace")
        toast.success("successfully Generated the course")
       } catch (error) {
        console.log(error)
        toast.error("server side error !! try again")
       }
    }

  return (
    <div className='lg:flex gap-5 justify-between p-5 rounded-2xl shadow'>
        <div className='flex flex-col gap-3'>
            <h2 className='font-bold text-3xl'>{CourseContent?.name}</h2>
            <p className='line-clamp-2 text-gray-500'>{CourseContent?.description}</p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                <div className='flex items-center gap-5 shadow rounded-lg p-3'>
                    <Clock className='text-blue-500'/>
                    <section>
                        <h2>Duration</h2>
                        <p>2 Hours</p>
                    </section>                 
                </div>
                  <div className='flex items-center gap-5 shadow rounded-lg p-3'>
                    <Book className='text-green-500'/>
                    <section>
                        <h2>Chapters</h2>
                        <p>{CourseContent?.chapters?.length} Chapters</p>
                    </section>               
                </div>
                  <div className='flex items-center gap-5 shadow rounded-lg p-3'>
                    <TrendingUp className='text-red-600'/>
                    <section>
                        <h2>Level of Difficulty</h2>
                        <p>{CourseContent?.level}</p>
                    </section>              
                </div>

            </div>
               {!viewCourse ? <Button className={'cursor-pointer max-w-sm'} onClick={GenerateCourseContent}>{isLoading ? <Loader2Icon className='animate-spin' /> : <Settings/>}Generate Content</Button>: 
               <Button className={'cursor-pointer max-w-sm'}> <PlayCircle/>Continue Learning</Button>
               }

        </div>
        <Image src={course?.bannerImage} alt='bannerImg' width={400} height={400} className='h-[240px] w-full rounded-2xl object-cover  mt-5 aspect-auto'/>

    </div>
  )
}

export default CourseInfo

 
                    