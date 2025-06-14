import BibleDropDown from '@/components/bible/bible-dropdown'
import BibleSelector from '@/components/bible/bible-selector'
import { buttonVariants } from '@/components/ui/button'
import { parseBible } from '@/lib/parse'
import { cn } from '@/lib/utils'
import { useChapter } from '@/queries/bible'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeftIcon, ChevronRightIcon, Loader2 } from 'lucide-react'
import { z } from 'zod'

export const Route = createFileRoute('/bible')({
  component: RouteComponent,
  validateSearch: z.object({
    book: z.string().optional(),
    chapter: z.string().optional(),
    bible: z.string().optional(),
  })
})

function RouteComponent() {
  const { chapter, bible } = Route.useSearch()
  const { data: chapterData, isLoading: isLoadingChapter } = useChapter(bible, chapter)

  return (
    <div className="w-full px-2 sm:px-4">
      <div className="p-3 sm:p-5 border rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4">
        <BibleDropDown />
        <BibleSelector value={bible} />
      </div>
      <div className="mt-4 sm:mt-6 p-2 sm:p-4 w-full flex items-center justify-center">
        {isLoadingChapter ? <Loader2 className="size-4 animate-spin" /> : <div className="w-full max-w-3xl">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{chapterData?.reference}</h1>
          {chapterData && <div className="flex justify-end items-center gap-2 sm:gap-4">
            <Link className={cn(buttonVariants({
              variant: 'outline',
              size: 'icon'
            }), {
              'opacity-50 cursor-not-allowed': !chapterData?.previous,
            })} disabled={!chapterData?.previous} to="/bible" search={(prev) => ({
              ...prev,
              chapter: chapterData?.previous?.id ?? ''
            })}>
              <ChevronLeftIcon className="size-4" />
            </Link>
            <Link className={cn(buttonVariants({
              variant: 'outline',
              size: 'icon'
            }), {
              'opacity-50 cursor-not-allowed': !chapterData?.next,
            })} disabled={!chapterData?.next} to="/bible" search={(prev) => ({
              ...prev,
              chapter: chapterData?.next?.id ?? ''
            })}>
              <ChevronRightIcon className="size-4" />
            </Link>
          </div>}
          <div className="mt-4 prose prose-lg max-w-none prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-lg prose-headings:scroll-mt-20">
            {bible && chapter ? parseBible(chapterData?.content ?? '') : <div className='flex items-center justify-center h-full text-center'>
              Select a Bible and Chapter to view the content
            </div>}
          </div>
        </div>}
      </div>
    </div>
  )
}

