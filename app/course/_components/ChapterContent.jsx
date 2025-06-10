import { SelectedChapterContent } from '@/context/SelectedChapterContent'
import { Video } from 'lucide-react'
import React, { useContext } from 'react'
import YouTube from 'react-youtube'

const ChapterContent = ({CourseInformation}) => {
    const courseInfo = CourseInformation?.courses
    const enrolledCourses = CourseInformation?.enrollcourse
    const courseData = CourseInformation?.courses?.courseInfo.filter(item => item !== null)
    const {SelectedChapterIndex, setSelectedChapterIndex} = useContext(SelectedChapterContent)
    const videoData = courseData?.[SelectedChapterIndex]?.youtubeVIdeo
    const VideoContent = courseData?.[SelectedChapterIndex]?.courseData?.topics

  return (
    <div className='p-10'>
        <h2 className='font-bold text-2xl'>{SelectedChapterIndex +1}. {courseData?.[SelectedChapterIndex]?.courseData?.chapterName}</h2>
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