

import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SelectedChapterContent } from "@/context/SelectedChapterContent";
const ChapterListSideBar = ({CourseInformation}) => {
    const courseInfo = CourseInformation?.courses
    const enrolledCourses = CourseInformation?.enrollcourse
    const courseData = CourseInformation?.courses?.courseInfo.filter(item => item !== null)
    const {SelectedChapterIndex, setSelectedChapterIndex} = useContext(SelectedChapterContent)
     
  return (
    <div className="p-5">
        <h2 className="my-3 font-bold text-xl"> Chapters ({courseData?.length}) </h2>
      <Accordion type="single" collapsible>
        {courseData?.map((chapter , index ) => (
        <AccordionItem 
        value={chapter?.courseData?.chapterName} key={index}
        onClick= {()=> setSelectedChapterIndex(index)}
        >
          <AccordionTrigger className={'text-lg font-medium cursor-pointer'}>{index + 1 }. {chapter?.courseData?.chapterName}</AccordionTrigger>
          <AccordionContent asChild>
            <div className="">
                {chapter?.courseData?.topics?.map((topic , index) => (
                    <h2 key={index} className="p-3 bg-white my-1 rounded-lg"> {topic?.topic}</h2>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        ))}
      
      </Accordion>
    </div>
  );
};

export default ChapterListSideBar;
