"use client"
import { SelectedChapterContent } from '@/context/SelectedChapterContent'
import { UserDetailContext } from '@/context/UserDetailContext'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Provider = ({children}) => {
    const {user} = useUser()
    const [UserDetail, setUserDetail] = useState()
    const [SelectedChapterIndex, setSelectedChapterIndex] = useState(0)
    useEffect(() => {
        user && CreateNewuser()
    }, [user])
    
    const CreateNewuser = async() => {
        const result = await axios.post('/api/user' , {
            name : user?.fullName,
            email : user?.primaryEmailAddress?.emailAddress
        })
        console.log(result.data)
        setUserDetail(result.data)
    }
  return (
    <UserDetailContext.Provider value={{UserDetail, setUserDetail}} >
        <SelectedChapterContent.Provider value={{SelectedChapterIndex, setSelectedChapterIndex}}>
            <div>{children}</div>
        </SelectedChapterContent.Provider>
    </UserDetailContext.Provider >
  )
}

export default Provider