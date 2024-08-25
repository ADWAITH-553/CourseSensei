'use client'
import { cn } from '@/lib/utils'
import { Chapter } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useTime } from 'framer-motion'
import React from 'react'
import { useState,useEffect } from 'react'
import { useToast } from './ui/use-toast'
type Props = {chapter:Chapter
    chapterIndex:number
    completedChapters:Set<String>
    setCompletedChapters:React.Dispatch<React.SetStateAction<Set<String>>>
}
export type ChapterCardHandler={
    triggerLoad:()=> void
}
const ChapterCard = React.forwardRef<ChapterCardHandler,Props>(({chapter,chapterIndex,completedChapters,setCompletedChapters},ref) => {

  const {toast}=useToast()
 const [success,setSuccess]=useState<boolean |null>(null)
  const {mutate:getChapterInfo}=useMutation({
    mutationFn: async ()=>{
        const res=await axios.post('/api/chapter/getInfo',{chapterId:chapter.id})
        return res.data
    }
  }) 
  const addChapterIdtoSet=React.useCallback(()=>{
    setCompletedChapters((prev) => {
        const newSet = new Set(prev);
        newSet.add(chapter.id);
        return newSet;
      });

  },[chapter.id,setCompletedChapters])
  useEffect(() => {
    if (chapter.videoId) {
      setSuccess(true);
      addChapterIdtoSet;
    }
  }, [chapter, addChapterIdtoSet]);

  React.useImperativeHandle(ref,()=>({
    async triggerLoad(){
        if(chapter.videoId){
            return
        }
        getChapterInfo(undefined,{
            onSuccess:()=>{
                setSuccess(true)
                addChapterIdtoSet()
            },
            onError:(error)=>{
                console.log(error)
                setSuccess(false)
                toast({
                    title:"Error",
                    description:"There was an error in loading of chaper",
                    variant:"destructive"
                })
                addChapterIdtoSet()
            }
        })
    }
  }))
  return (
    <div key={chapter.id} className={cn("px-4 py-2 mt-2 rounded flex justify-between",
        {
        "bg-violet-800":success===null,
        "bg-red-500":success===false,
        "bg-green-500":success===true
        }

    )}>
        <h5>Lesson {chapterIndex+1}:{chapter.name}</h5>
    </div>
  )
})

export default ChapterCard