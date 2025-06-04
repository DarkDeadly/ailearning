'use client'

import { Button } from '@/components/ui/button'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Book, Compass, LayoutDashboard, PencilRulerIcon, UserCircle2Icon, WalletCards } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import AddNewCourseDialogue from './AddNewCourseDialogue'

const SideBarOptions = [
    {
        title : "DashBoard",
        icon : LayoutDashboard,
        path : "/#"
    },
    {
        title : "My Learnings",
        icon : Book,
        path : "/workspace/my-courses"
    },
    {
        title : "Explore Courses",
        icon : Compass,
        path : "/workspace/explore"
    },
    {
        title : "AI tools",
        icon : PencilRulerIcon,
        path : "/workspace/ai-tools"
    },
     {
        title : "Billing",
        icon : WalletCards,
        path : "/workspace/billing"
    },
     {
        title : "Profile",
        icon : UserCircle2Icon,
        path : "/workspace/profile"
    },
]
const AppSidebar = () => {
    const pathName = usePathname() //will show you the current Path
  return (
     <Sidebar>
      <SidebarHeader className="p-5">
        <Image src={'/logo.svg'} alt='logo' width={120} height={200}/> 
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup >
           <AddNewCourseDialogue>
             <Button className="cursor-pointer">Create New Course</Button>
           </AddNewCourseDialogue>
        </SidebarGroup>
        <SidebarGroup >
            <SidebarGroupContent>
                <SidebarMenu>
                    {SideBarOptions.map((item , index) => (
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton asChild className={'p-6'}>
                                <Link href={item.path} className={`text-[17px] ${pathName.includes(item.path) && 'text-primary bg-purple-50'}`}>
                                <item.icon className='h-7 w-7'/>
                                <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar