import BibleDropDown from '@/components/bible/bible-dropdown'
import BibleSelector from '@/components/bible/bible-selector'
import ChapterNavigation from '@/components/bible/chapter-navigation'
import MobileNotesSheet from '@/components/bible/mobile-notes-sheet'
import NotesToggle from '@/components/bible/notes-toggle'
import NotesView from '@/components/bible/notes-view'
import { useIsMobile } from '@/hooks/utils'
import { useSession } from '@/lib/auth-client'
import { parseBible, verseParamToDataSid } from '@/lib/parse'
import { cn } from '@/lib/utils'
import { useChapter } from '@/queries/bible'
import { bibleSearchSchema } from '@/schemas/routes-search'
import { createFileRoute } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/bible')({
  component: RouteComponent,
  validateSearch: bibleSearchSchema
})

function RouteComponent() {
  const { chapter, bible, verse } = Route.useSearch()
  const { data: chapterData, isLoading: isLoadingChapter } = useChapter(bible, chapter)
  const highlightSid = verseParamToDataSid(verse)

  const [openNotes, setOpenNotes] = useState(false)
  const isMobile = useIsMobile()
  const { data: session } = useSession()
  const userId = session?.session.userId

  useEffect(() => {
    if (highlightSid) {
      const el = document.getElementById('highlighted-verse')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        el.focus({ preventScroll: true })
      }
    }
  }, [highlightSid, chapterData?.content])

  const userChapterBibleExists = Boolean(bible && userId && chapter)

  return (
    <div className="w-full px-2 sm:px-4">
      <div className="p-3 sm:p-5 border rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4">
        <BibleDropDown />
        <BibleSelector value={bible} />
      </div>
      <div className="mt-4 sm:mt-6 p-2 sm:p-4 w-full flex items-center justify-center">
        {isLoadingChapter ? <Loader2 className="size-4 animate-spin" /> : <div className={cn("w-full", {
          'max-w-3xl': !openNotes,
        })}>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold">{chapterData?.reference}</h1>
            {userChapterBibleExists && <NotesToggle openNotes={openNotes} setOpenNotes={setOpenNotes} />}
          </div>
          {chapterData && <div className="flex justify-end items-center gap-2 sm:gap-4">
            {isMobile && (
             <MobileNotesSheet openNotes={openNotes} setOpenNotes={setOpenNotes} userChapterBibleExists={userChapterBibleExists} chapterId={chapterData?.id ?? ''}  userId={userId ?? ''}/>
            )}
            <ChapterNavigation previous={chapterData?.previous} next={chapterData?.next} />
          </div>}
          <div className={cn("mt-4 prose prose-lg max-w-none prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-lg prose-headings:scroll-mt-20 w-full transition-all duration-500 ease-in-out", {
            'flex items-start justify-between gap-10': openNotes,
          })}>
            <div className={cn("transition-all duration-500 ease-in-out", {
              'w-full': !openNotes,
              'sm:w-1/2': openNotes,
            })}>
              {bible && chapter ? parseBible(chapterData?.content ?? '', highlightSid, bible, chapter) : <div className='flex items-center justify-center h-full text-center'>
                Select a Bible and Chapter to view the content
              </div>}
            </div>
            <NotesView openNotes={openNotes} userChapterBibleExists={userChapterBibleExists} chapterId={chapterData?.id ?? ''} userId={userId ?? ''} />
          </div>
        </div>}
      </div>
    </div>
  )
}

