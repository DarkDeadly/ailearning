import { Button } from '@/components/ui/button'
import { Book, PlayCircle, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CourseCard = ({courses}) => {
    const CourseContent = courses?.courseJson?.course
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
                 courses?.courseInfo?.length ? <Button className={'cursor-pointer '} size={'sm'}><PlayCircle/> Start Learning</Button> 
                 :<Link href={"/workspace/edit-course/"+courses.cid}><Button className={'cursor-pointer '} size={'sm'} variant="outline"><Settings/>Generate Course</Button></Link>   
                }
            </div>
        </div>
    </div>
  )
}

export default CourseCard