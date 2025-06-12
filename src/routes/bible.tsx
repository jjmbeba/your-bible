import BibleDropDown from '@/components/bible/bible-dropdown'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/bible')({
  component: RouteComponent,
  validateSearch: z.object({
    book: z.string().optional(),
    chapter: z.string().optional(),
    verse: z.string().optional(),
  })
})

function RouteComponent() {
  const { book, chapter, verse } = Route.useSearch()
 
  return (
    <div>
      <div className="p-4 border rounded-lg flex justify-between items-center">
        <BibleDropDown />
        <Button variant={'outline'} size={'sm'}>
          NKJV
        </Button>
      </div>
    </div>
  )
}

