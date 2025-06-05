import {ai} from "../generate-ai-course-layout/route"
import { NextResponse } from 'next/server';

const PROMPT = `
Depends on Chapter name and Topic Generate content for each topic in HTML
and give response in JSON format.
Schema:{
chapterName:<>
{
topic:<>
content:<>
: User Input:`

export const POST  = async(req) => {
    const {courseJson , courseTitle , courseId} = await req.json()
    const promises = courseJson?.chapters?.map(async(chapter) => {
         const config = {
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: PROMPT+JSON.stringify(chapter),
        },
      ],
    },
  ];
 
  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });
   console.log(response?.candidates[0]?.content?.parts[0]?.text)
  const JsonRes = response?.candidates[0]?.content?.parts[0]?.text 
  const RawJSon = JsonRes.replace('```json' , '').replace('```' , '')
 try {
  const JSonResponse = JSON.parse(RawJSon);
  return JSonResponse;
} catch (error) {
  console.error("❌ JSON parse error:", error.message);
  console.log("🔥 Raw JSON that failed:", RawJSon);
 
}
    })
    const CourseContent = await Promise.all(promises) 
    return NextResponse.json({
        courseName : courseTitle,
        courseContent : CourseContent
    })
}