import BibleDropDown from '@/components/bible/bible-dropdown'
import BibleSelector from '@/components/bible/bible-selector'
import StoriesForm from '@/components/forms/stories-form'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/_authed/stories/')({
  component: RouteComponent,
  validateSearch: z.object({
    bible: z.string().optional(),
    chapter: z.string().optional(),
  })
})

function RouteComponent() {
  const { bible, chapter } = Route.useSearch()

  return <div className="w-full px-2 sm:px-4">
    <div className="p-3 sm:p-5 border rounded-lg space-y-3">
      <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
        <BibleDropDown bible={bible} chapter={chapter} />
        <BibleSelector value={bible} />
      </div>
      {bible && chapter ? <StoriesForm bible={bible} chapter={chapter} /> : <div className='text-center text-sm text-muted-foreground'>Select a Bible and Chapter to start</div>}
    </div>
  </div>
}
