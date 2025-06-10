import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { PlayCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const EnrollCourseCard = ({courses , enrollcourses}) => {
        const CourseContent = courses?.courseJson?.course
        const calculateProgressBar = () => {
            return (enrollcourses?.completedChapters?.length??0 / courses?.courseInfo?.length)*100
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
            <div>
                <h2 className='flex justify-between text-primary text-sm'>Progress : <span>{calculateProgressBar()}%</span></h2>
                <Progress value={calculateProgressBar()} />
                <Link href={'/workspace/view-course/' + courses?.cid}>
                <Button className={'w-full mt-2 cursor-pointer'}><PlayCircle/> Start Learning</Button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default EnrollCourseCard