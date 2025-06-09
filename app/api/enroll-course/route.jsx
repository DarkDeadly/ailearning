import { db } from "@/config/db"
import { coursesTable, enrollCourseTable } from "@/config/schema"
import { currentUser } from "@clerk/nextjs/server"
import { and, desc, eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    const {courseId} = await req.json()
    const user = await currentUser()

    //Checking if the user is enrolled 

    const enrolledCourses = await db.select().from(enrollCourseTable)
    .where(and(eq(enrollCourseTable.cid , courseId) , eq(enrollCourseTable.userEmail , user?.primaryEmailAddress.emailAddress)))

    if (enrolledCourses?.length == 0) {
        const result = await db.insert(enrollCourseTable).values({
            cid : courseId ,
            userEmail : user?.primaryEmailAddress.emailAddress
        }).returning(enrollCourseTable)
        return NextResponse.json(result)
    }
    return NextResponse.json({'message' : 'User Already enrolled'})
}

export const GET = async (req) => {
    const user = await currentUser()
    const result = await db.select().from(coursesTable)
    .innerJoin(enrollCourseTable , eq(coursesTable.cid , enrollCourseTable.cid)) 
    .where(eq(enrollCourseTable.userEmail , user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(enrollCourseTable.id))

    return NextResponse.json(result)
}