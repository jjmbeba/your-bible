import BibleDropDown from '@/components/bible/bible-dropdown'
import BibleSelector from '@/components/bible/bible-selector'
import StoriesForm from '@/components/forms/stories-form'
import { buttonVariants } from '@/components/ui/button'
import { parseBible } from '@/lib/parse'
import { cn } from '@/lib/utils'
import { useChapter } from '@/queries/bible'
import { Link } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'

export const Route = createFileRoute('/_authed/stories/create-story')({
  component: RouteComponent,
  validateSearch: z.object({
    bible: z.string().optional(),
    chapter: z.string().optional(),
  })
})

function RouteComponent() {
  const { bible, chapter } = Route.useSearch()
  const { data: chapterData, isLoading: isLoadingChapter } = useChapter(bible, chapter)

  if (isLoadingChapter) {
    return (
      <div className="w-full px-2 sm:px-4">
        <div className="flex items-center justify-center h-full text-center">
          <Loader2 className='w-4 h-4 animate-spin' />
        </div>
      </div>
    )
  }

  return <div className="w-full px-2 sm:px-4 pb-10">
    <div className='flex items-center justify-between'>
      <h2 className='text-2xl font-bold'>
        Generate a story
      </h2>
      <Link to="/stories" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
        View stories
      </Link>
    </div>
    <p className='text-sm text-muted-foreground'>
      Generate a story based on the following details.
    </p>
    <div className="p-3 sm:p-5 border rounded-lg space-y-3 mt-4">
      <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
        <BibleDropDown bible={bible} chapter={chapter} />
        <BibleSelector value={bible} />
      </div>
      {bible && chapter ? <StoriesForm bible={bible} chapter={chapter} chapterReference={chapterData?.reference ?? ''} originalText={chapterData?.content ?? ''} /> : <div className='text-center text-sm text-muted-foreground'>Select a Bible and Chapter to start</div>}
    </div>
    <div className={cn("mt-4 prose prose-lg max-w-none prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-lg prose-headings:scroll-mt-20 w-full transition-all duration-500 ease-in-out flex items-start justify-between gap-10")}>
      <div className={cn("transition-all duration-500 ease-in-out")}>
        <h3 className='text-lg font-semibold mb-4'>
          Original Text
        </h3>
        {bible && chapter ? parseBible(chapterData?.content ?? '', '', bible, chapter) : <div className='flex items-center justify-center h-full text-center'>
          Select a Bible and Chapter to view the content
        </div>}
      </div>
    </div>
  </div>
}
