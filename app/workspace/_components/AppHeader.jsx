import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

const AppHeader = ({HideSidebar = false}) => {
  return (
    <div className='p-4 flex justify-between items-center shadow-sm'>
    {!HideSidebar&&<SidebarTrigger className={'cursor-pointer'}/>}            
          <UserButton/>

    </div>
  )
}

export default AppHeader