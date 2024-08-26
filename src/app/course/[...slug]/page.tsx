import CourseSideBar from '@/components/CourseSideBar'
import MainVideoSummary from '@/components/MainVideoSummary'
import { prisma } from '@/lib/db'
import { disableInstantTransitions } from 'framer-motion'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params:{
        slug: string[]
    }
}

const Coursepage = async ({params:{slug}}: Props) => {
    const [courseId,unitIndex,chapterIndex]=slug
    const course=await prisma.course.findUnique({
        where:{id:courseId},
        include:{
            units:{
                include:{chapters:true}
            }
        }
    })
    if(!course){
        return redirect('/gallery')
    }
    let unitInd=parseInt(unitIndex)
    let chapterInd=parseInt(chapterIndex)
    const unit =course.units[unitInd]
    if(!unit){
        return redirect('/gallery')
    }
    const chapter = unit.chapters[chapterInd];
    if (!chapter) {
      return redirect("/gallery");
    }
    return (
        <div>
            <CourseSideBar course={course} currentChapterId={chapter.id}/>
        <div>
            <div className='ml-[400px] px-8'>
            <MainVideoSummary chapter={chapter} chapterInd={chapterInd} unit={unit} unitInd={unitInd}/>
            </div>
        </div>
        
        </div>
    
  )
}

export default Coursepage