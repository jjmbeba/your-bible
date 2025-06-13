import BibleDropDown from '@/components/bible/bible-dropdown'
import BibleSelector from '@/components/bible/bible-selector'
import { parseBible } from '@/lib/parse'
import { useChapter } from '@/queries/bible'
import { createFileRoute } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
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
  const { book, chapter, bible } = Route.useSearch()
  const { data: chapterData, isLoading: isLoadingChapter } = useChapter(bible, chapter)

  return (
    <div>
      <div className="p-4 border rounded-lg flex justify-between items-center">
        <BibleDropDown />
        <BibleSelector />
      </div>
      <div className="mt-6 p-4 w-full flex items-center justify-center">
        {isLoadingChapter ? <Loader2 className="size-4 animate-spin" /> : <div className="max-w-3xl w-full">
          <h1 className="text-2xl font-bold mb-6">{chapterData?.reference}</h1>
          <div className="mt-4 prose prose-lg max-w-none">
            {parseBible(chapterData?.content ?? '')}
          </div>
        </div>}
      </div>
    </div>
  )
}

