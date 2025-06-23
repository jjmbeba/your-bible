import { Loader2 } from 'lucide-react'
import React, { Suspense } from 'react'
import NoteEditor from './note-editor'
import { cn } from '@/lib/utils'

type Props = {
    openNotes: boolean
    userChapterBibleExists: boolean
    chapterId: string
    userId: string
}

const NotesView = ({ openNotes, userChapterBibleExists, chapterId, userId }: Props) => {
  return (
    <div className={cn("transition-all duration-500 ease-in-out overflow-hidden", {
        'hidden w-0 sm:block sm:w-1/2 opacity-100 max-h-screen': openNotes,
        'w-0 opacity-0 max-h-0': !openNotes,
      })}>
        <Suspense fallback={<div className='flex items-center justify-center h-full text-center'>
          <Loader2 className="size-4 animate-spin" />
        </div>}>
          {userChapterBibleExists && <NoteEditor chapterId={chapterId} userId={userId} />}
        </Suspense>
      </div>
  )
}

export default NotesView