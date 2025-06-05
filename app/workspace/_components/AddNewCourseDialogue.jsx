"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { v4 as uuidv4 } from 'uuid';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Sparkle } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
const AddNewCourseDialogue = ({ children }) => {
  const [IsLoading, setIsLoading] = useState(false)
  const [DataForm, setDataForm] = useState(
    {
       name : "" ,
       description : "",
       noOfChapters : 1,
       includeVideo:false,
       level:''
    }
  );
  const router= useRouter()
  const HandleChanges = (field, value) => {
    setDataForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(DataForm)
  };

  const onSubmit = async() => {
    console.log(DataForm)
    const CourseID = uuidv4()
    setIsLoading(true)
    const result = await axios.post('/api/generate-ai-course-layout' , {
      ...DataForm,
      CourseID :CourseID
    })
    console.log('the data is ' ,result.data)
    setIsLoading(false)
    router.push("/workspace/edit-course/"+result.data?.CourseID)
  }


  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Course Using AI</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-4 mt-3">
              <div>
                <label htmlFor="">Course Name </label>
                <Input
                  placeholder="Course Name"
                  onChange={(e) => HandleChanges("name", e?.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Course Description (optional) </label>
                <Textarea
                  placeholder="Course Description"
                  onChange={(e) => HandleChanges("description", e?.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">No. Of Chapters </label>
                <Input 
                placeholder="No. Of Chapters" 
                type="number" 
                onChange={(e) => HandleChanges("noOfChapters", e?.target.value)}
                
                />
              </div>
              <div className="flex gap-3 items-center">
                <label htmlFor="">Include Video </label>
                <Switch
                onCheckedChange={() => HandleChanges("includeVideo" , !DataForm?.includeVideo)}
                />
              </div>
              <div>
                <label htmlFor="">Difficulty level</label>
                <Select onValueChange={(value) => HandleChanges("level" , value) }>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Difficulty level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-3">
                <Button className={"w-full cursor-pointer"} onClick = {onSubmit} disabled = {IsLoading}>
                  {IsLoading ? <Loader2Icon className="animate-spin"/> : 
                  <Sparkle />}
                  Generate Course
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewCourseDialogue;
