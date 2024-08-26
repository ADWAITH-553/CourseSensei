import { Chapter, Unit } from '@prisma/client'
import React from 'react'

type Props = {chapter:Chapter
    unit:Unit
    unitInd:number
    chapterInd:number
}

const MainVideoSummary = ({unit,unitInd,chapter,chapterInd}: Props) => {
  return (
    <div className='flex-[2] mt-16'>
        <h2>
        Unit {unitInd + 1} &bull; Chapter {chapterInd + 1}
        </h2>
        <h4 className='text-4xl font-extrabold'>{chapter.name}</h4>
        <iframe
            title="chapter vedio"
            className="w-full mt-4 aspect-video max-h-[24rem]"
            src={`https://www.youtube.com/embed/${chapter.videoId}`}
            allowFullScreen
        />
        <div className="mt-4">
        <h3 className="text-3xl font-semibold">Summary</h3>
        <p className="mt-2 text-secondary-foreground/80">{chapter.summary}</p>
      </div>
    </div>

  )
}

export default MainVideoSummary