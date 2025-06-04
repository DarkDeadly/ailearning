import { db } from "@/config/db"
import { usersTable } from "@/config/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"


export const POST = async(req) => {
    const {email , name} = await req.json()

    // if User already exist
    const users  = await db.select().from(usersTable)
    .where(eq(usersTable.email , email))

    if (users?.length ==0) {
        const result = await db.insert(usersTable).values({
            name:name,
            email: email
        }).returning(usersTable)
        return NextResponse.json(result)
    }
    return NextResponse.json(users[0])
}