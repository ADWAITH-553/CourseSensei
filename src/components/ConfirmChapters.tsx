'use client'
import { Course, Unit,Chapter } from '@prisma/client'
import React, { useMemo, useState } from 'react'
import ChapterCard, { ChapterCardHandler } from './ChapterCard'
import { Separator } from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import { ChevronLeftCircle,ChevronRightCircle } from 'lucide-react'
import { Button } from './ui/button'

type Props = {course:Course &{
    units:(Unit&{
        chapters:Chapter[]
    })[]
}}

const ConfirmChapters = ({course}: Props) => {
  const chapterRefs:Record <string,React.RefObject<ChapterCardHandler>>={};
  course.units.forEach(unit=>{
    unit.chapters.forEach(chapter=>{
        //eslint-disable-nextline react-hooks/rules-of-hooks
        chapterRefs[chapter.id]=React.useRef(null)
    })
  })
  console.log(chapterRefs)
  const [loading,setLoading] = useState(false)
  const [completedChapters,setCompletedChapters]=useState<Set<String>>(new Set())
  const totalChaptersCount=useMemo(()=>{
    return course.units.reduce((acc,unit)=>{
        return acc+unit.chapters.length
    },0)
  },[course.units])  
  return (
    <div className="w-full mt-4">{course.units.map((unit,unitIndex)=>{
        return(
            <div key={unit.id} className="mt-5">
            <h2 className="text-sm uppercase text-secondary-foreground/60">
              Unit {unitIndex + 1}
            </h2>
            <h3 className="text-2xl font-bold">{unit.name}</h3>
            <div className='mt-3'>
                {
                    unit.chapters.map((chapter,chapterIndex)=>{
                        return(
                        <ChapterCard 
                        
                        completedChapters={completedChapters}
                        setCompletedChapters={setCompletedChapters}
                        ref={chapterRefs[chapter.id]} key={chapter.id} chapter={chapter} chapterIndex={chapterIndex}/>
                        
                        )
                    })
                }
            </div>  
            
            </div>
             

        )
    })}
    <div className='flex items-center justify-center'>
    <Separator className='flex-[1]'/>
    <div className="flex items-center mx-4">
        <Link href='/gencourse' className=' mt-4 mr-4'>
     
        <Button className='bg-red-600 hover:bg-red-500'>
        <ChevronLeftCircle className="w-4 h-4 mr-2" strokeWidth={4}/>
        Back
        </Button>
        
        </Link>
        {
        totalChaptersCount!=completedChapters.size?(<Link className='mt-4 flex bg-violet-600 hover:bg-green-700 w-full px-2 py-2 rounded-sm'href={`/course/${course.id}/0/0`}><ChevronRightCircle></ChevronRightCircle>Next Step</Link>):(<Button disabled={loading}type='button' className='mt-4 bg-violet-700 hover:bg-green-500 '
            onClick={()=>{
                    setLoading(true)
                    Object.values(chapterRefs).forEach((ref)=>{
                        ref.current?.triggerLoad()
                    })
            }}
            >
                Generate 
                <ChevronRightCircle className="w-4 h-4 ml-2" strokeWidth={4}/>
            </Button>)
       }
        
        <Separator className='flex-[1]'/>
    </div>
    </div>
    
    </div>
  )
}

export default ConfirmChapters