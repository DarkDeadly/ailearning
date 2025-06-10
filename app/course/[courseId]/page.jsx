"use client";

import AppHeader from "@/app/workspace/_components/AppHeader";
import React, { useEffect, useState } from "react";
import ChapterListSideBar from "../_components/ChapterListSideBar";
import ChapterContent from "../_components/ChapterContent";
import { useParams } from "next/navigation";
import axios from "axios";

const Course = () => {
  const [CourseInformation, setCourseInformation] = useState();
  const { courseId } = useParams();
  useEffect(() => {
    GetEnrolledCourseById();
  }, []);

  const GetEnrolledCourseById = async () => {
    try {
      const result = await axios.get("/api/enroll-course?courseId=" + courseId);
      console.log(result.data);
      setCourseInformation(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <AppHeader HideSidebar={true} />
      <div className="flex gap-10">
        <div className="w-80 min-w-[20rem] bg-secondary">
          <ChapterListSideBar CourseInformation={CourseInformation} />
        </div>
        <ChapterContent CourseInformation={CourseInformation} />
      </div>
    </div>
  );
};

export default Course;
