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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Sparkle } from "lucide-react";
const AddNewCourseDialogue = ({ children }) => {
  const [DataForm, setDataForm] = useState(
    {
       name : "" ,
       description : "",
       NoOfChapters : 1,
       IncludeVideo:false,
       level:''
    }
  );

  const HandleChanges = (field, value) => {
    setDataForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(DataForm)
  };

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(DataForm)
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
                onChange={(e) => HandleChanges("NoOfChapters", e?.target.value)}
                
                />
              </div>
              <div className="flex gap-3 items-center">
                <label htmlFor="">Include Video </label>
                <Switch
                onCheckedChange={() => HandleChanges("IncludeVideo" , !DataForm?.includeVideo)}
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
                <Button className={"w-full cursor-pointer"} onClick = {onSubmit}>
                  <Sparkle /> Generate Course
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
