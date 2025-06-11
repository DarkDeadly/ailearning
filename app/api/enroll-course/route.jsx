import { db } from "@/config/db";
import { coursesTable, enrollCourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { courseId } = await req.json();
  const user = await currentUser();

  //Checking if the user is enrolled

  const enrolledCourses = await db
    .select()
    .from(enrollCourseTable)
    .where(
      and(
        eq(enrollCourseTable.cid, courseId),
        eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress)
      )
    );

  if (enrolledCourses?.length == 0) {
    const result = await db
      .insert(enrollCourseTable)
      .values({
        cid: courseId,
        userEmail: user?.primaryEmailAddress.emailAddress,
      })
      .returning(enrollCourseTable);
    return NextResponse.json(result);
  }
  return NextResponse.json({ message: "User Already enrolled" });
};

export const GET = async (req) => {
  const user = await currentUser();
  const { searchParams } = new URL(req.url);
  const courseId = searchParams?.get("courseId");

  if (courseId) {
    const result = await db
      .select()
      .from(coursesTable)
      .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
      .where(
        and(
          eq(
            enrollCourseTable.userEmail,
            user?.primaryEmailAddress.emailAddress
          ),
          eq(enrollCourseTable.cid, courseId)
        )
      );
    return NextResponse.json(result[0]);
  } else {
    const result = await db
      .select()
      .from(coursesTable)
      .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
      .where(
        eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress)
      )
      .orderBy(desc(enrollCourseTable.id));

    return NextResponse.json(result);
  }
};

export const PUT = async(req) => {
    const {courseId , completedChapter} = await req.json()
    const user = await currentUser()

    const result = await db.update(enrollCourseTable).set({
        completedChapters : JSON.stringify(completedChapter)
    }).where(and(eq(enrollCourseTable.cid , courseId) , eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress))
).returning(enrollCourseTable)
return NextResponse.json(result)
}
 