"use client"


import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard'
import AddNewCourseDialogue from '../_components/AddNewCourseDialogue'
import Image from 'next/image'

const ExploreCourses = () => {
    const [CourseLists, setCourseLists] = useState([])
    const [search, setSearch] = useState("")
    const {user} = useUser()
const filteredArray = CourseLists.filter(val =>
  search.trim() === "" || 
  val?.courseJson?.course?.name?.toLowerCase().includes(search.toLowerCase())
);    useEffect(() => {
        user && CoursesLists() ;
    }, [user])
    

    const CoursesLists = async () => {
        const GetDatas = await axios.get("/api/courses")
        console.log(GetDatas.data)
        setCourseLists(GetDatas.data)
    } 
  return (
    <div>
        <h2 className='text-bold text-2xl mb-5'>Explore more Courses</h2>

        <div className='flex gap-5 max-w-md'>
            <Input placeholder = "Search ..." 
            onChange = {(e) => setSearch(e.target.value)}
            />
            <Button> <Search/> Search</Button>
        </div>

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
                    filteredArray?.map((courses , index) => (
                        <CourseCard courses = {courses} key = {index}/>
                    ))
                }
            </div>
        }
    </div>
  )
}

export default ExploreCourses