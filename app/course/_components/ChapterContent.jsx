"use client"

import { Button } from '@/components/ui/button'
import { SelectedChapterContent } from '@/context/SelectedChapterContent'
import axios from 'axios'
import { CheckCircle, Cross, Loader2Icon, Video, X } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useContext, useState } from 'react'
import YouTube from 'react-youtube'

const ChapterContent = ({CourseInformation , RefreshData}) => {
    const {courseId} = useParams()
    const courseInfo = CourseInformation?.courses
    const enrolledCourses = CourseInformation?.enrollcourse
    const courseData = CourseInformation?.courses?.courseInfo.filter(item => item !== null)
    const {SelectedChapterIndex, setSelectedChapterIndex} = useContext(SelectedChapterContent)
    const [Loading, setLoading] = useState(false)
    const videoData = courseData?.[SelectedChapterIndex]?.youtubeVIdeo
    const VideoContent = courseData?.[SelectedChapterIndex]?.courseData?.topics
    let  completedChapter = enrolledCourses?.completedChapters 

const MarkChapterComplete = async() => {
let CompleteChapter = enrolledCourses?.completedChapters || [];
setLoading(true)
    if (!CompleteChapter.includes(SelectedChapterIndex)) {
        CompleteChapter.push(SelectedChapterIndex)
    }

    const result = await axios.put("/api/enroll-course", {
        completedChapter: CompleteChapter,  // send updated array here
        courseId: courseId
    })

    console.log(result.data)
    RefreshData()
    setLoading(false)
}

const MarkChapterInComplete = async() => {
let CompleteChapter = enrolledCourses?.completedChapters || [];
setLoading(true)
   const incompleteChap = CompleteChapter.filter(item => item!= SelectedChapterIndex)

    const result = await axios.put("/api/enroll-course", {
        completedChapter: incompleteChap,  // send updated array here
        courseId: courseId
    })

    console.log(result.data)
    RefreshData()
    setLoading(false)
}

  return (
    <div className='p-10'>
        <div className='flex justify-between items-center'> 
            <h2 className='font-bold text-2xl'>{SelectedChapterIndex +1}. {courseData?.[SelectedChapterIndex]?.courseData?.chapterName}</h2>
         {!completedChapter?.includes(SelectedChapterIndex) ? <Button className={'cursor-pointer'} onClick = {MarkChapterComplete}>{Loading ? <Loader2Icon className='animate-spin'/> : <CheckCircle/>} Mark As Completed</Button>
        : <Button variant={"outline"} className={'cursor-pointer'} onClick = {MarkChapterInComplete}>{Loading ? <Loader2Icon className='animate-spin'/> : <X/>} Mark as Incomplete</Button> 
        }
           
        </div>
        <h2 className='font-semibold text-lg flex gap-2 items-center my-2'>Related Video <Video/></h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {
                videoData?.map((video , index) => index < 2 &&(
                    <div key={index}>
                        <YouTube 
                        videoId={video?.videoId}
                        opts={{
                            height : '250',
                            width : '400'
                        }}
                        />
                    </div>
                ))
            }
        </div>
        <div className='mt-7'>
            {
                VideoContent?.map((content , index) => (
                    <div key={index} className='mt-10 p-5 bg-secondary rounded-2xl'>
                        <h2 className='font-bold text-2xl text-primary '>{index +1}. {content?.topic}</h2>
                        <div dangerouslySetInnerHTML={{__html : content?.content}}
                        style={{
                            lineHeight :"2.5"
                        }}
                        >

                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default ChapterContent