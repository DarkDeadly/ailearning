import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import { GoogleGenAI } from '@google/genai';
import axios from 'axios';
import { NextResponse } from 'next/server';
const Prompt = `Genrate Learning Course depends on following details. In which Make sure to add Course Name, Description, Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3d format Chapter Name,, Topic under each chapters, Duration for each chapters etc, in JSON format only Schema:
{
"course":{
"name": "string", "description": "string", "category": "string", "level": "string",
"include Video": "boolean",
"noOfChapters": "number",
"bannerImagePrompt": "string", "chapters": [
{
"chapterName": "string",
"duration": "string".
"topics": [
"string"
User Input: `;
    export const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

export const POST = async (req) => {
  try {
    const {CourseID,...DataForm} = await req.json();
    const user = await currentUser();


    const model = 'gemini-2.0-flash';
    const config = {
      responseMimeType: 'text/plain',
    };
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: Prompt+JSON.stringify(DataForm) ,
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
  const JSonResponse = JSON.parse(RawJSon)
  const ImagePromptGen = JSonResponse.course?.bannerImagePrompt  

    //Image Generation 
  const ImageGen = await ImageGeneration(ImagePromptGen)
    // Optional: Save to DB
    
    await db.insert(coursesTable).values({
      ...DataForm,
      courseJson: JSonResponse,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      cid:CourseID,
      bannerImage : ImageGen
    });
    

    return NextResponse.json({CourseID : CourseID});
  } catch (error) {
    console.error('Error generating course:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};


const ImageGeneration = async(imageGen) => {
const BASE_URL='https://aigurulab.tech';
const result = await axios.post(BASE_URL+'/api/generate-image',
        {
            width: 1024,
            height: 1024,
            input: imageGen,
            model: 'sdxl',//'flux'
            aspectRatio:"16:9"//Applicable to Flux model only
        },
        {
            headers: {
                'x-api-key': process?.env?.IMAGEGENAPIKEY, // Your API Key
                'Content-Type': 'application/json', // Content Type
            },
        })
console.log(result.data.image) //Output Result: Base 64 Image
return result.data.image
}