import React from 'react'
import WelcomeBanner from '../_components/WelcomeBanner'
import EnrollCourseList from '../_components/EnrollCourseList'

const MyCourses = () => {
  return (
    <div>
        <WelcomeBanner/>
        <h2 className='font-bold text-2xl my-5'>My Learnings</h2>
        <EnrollCourseList/>
    </div>
  )
}

export default MyCourses