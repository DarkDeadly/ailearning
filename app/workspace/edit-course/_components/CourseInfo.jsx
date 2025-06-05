import { Button } from '@/components/ui/button'
import { Book, Clock, Settings, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const CourseInfo = ({course}) => {
    const CourseContent = course?.courseJson?.course
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
                <Button className={'cursor-pointer max-w-sm'}><Settings/>Generate Content</Button>

        </div>
        <Image src={course?.bannerImage} alt='bannerImg' width={400} height={400} className='h-[240px] w-full rounded-2xl object-cover  mt-5 aspect-auto'/>

    </div>
  )
}

export default CourseInfo

 
                    