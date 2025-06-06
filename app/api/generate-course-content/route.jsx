import axios from "axios";
import {ai} from "../generate-ai-course-layout/route"
import { NextResponse } from 'next/server';
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";

const PROMPT = `
You are a content generator. Given a chapter with topics, generate HTML content for each topic and return the result in *pure JSON only*. Do not add extra explanations or markdown.

Example schema:
{
  "chapterName": "Getting Started",
  "topics": [
    {
      "topic": "What is React Native?",
      "content": "<p>React Native is ...</p>"
    },
    ...
  ]
}

Now generate content for this chapter:
`;

export const POST  = async(req) => {
    const {courseJson , courseTitle , courseId} = await req.json()
    const promises = courseJson?.chapters?.map(async(chapter) => {
         const config = {
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-2.5-flash-preview-04-17';
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
  const YoutubeContent = await GenerateVideo(chapter?.chapterName)
  return {
    youtubeVIdeo : YoutubeContent,
    courseData:JSonResponse
  };
} catch (error) {
  console.error("❌ JSON parse error:", error.message);
  console.log("🔥 Raw JSON that failed:", RawJSon);
  return null;
}
    })
    const CourseContent = await Promise.all(promises) 
    const dbresp = await db.update(coursesTable).set({
        courseInfo:JSON.stringify(CourseContent)
    }).where(eq(coursesTable.cid ,courseId ))
    return NextResponse.json({
        courseName : courseTitle,
        courseContent : CourseContent
    })
}

const YoutubeURL = 'https://www.googleapis.com/youtube/v3/search'
const GenerateVideo = async(topic) => {
    const Params = {
        part: 'snippet',
        q:topic,
        maxResult:4,
        type:'video',
        key:process.env.YOUTUBE_API_KEY
    }
    const response = await axios.get(YoutubeURL,{params :Params})
    const VideoListResponse = response.data.items
    const VideoList = []
    VideoListResponse.forEach(item => {
        const data = {
            videoId : item.id?.videoId,
            title : item?.snippet?.title
        }
        VideoList.push(data)
    })
    console.log("VideoList" , VideoList)
    return VideoList
}