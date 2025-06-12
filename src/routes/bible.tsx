import { getBibles } from '@/actions/bible'
import BibleDropDown from '@/components/bible/bible-dropdown'
import BibleSelector from '@/components/bible/bible-selector'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/bible')({
  component: RouteComponent,
  validateSearch: z.object({
    book: z.string().optional(),
    chapter: z.string().optional(),
    verse: z.string().optional(),
    bible: z.string().optional(),
  }),
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ deps: { search } }) => {
    const { book } = search

    return {}
  }
})

function RouteComponent() {
  const { book, chapter, verse } = Route.useSearch()
  const data = Route.useLoaderData()

  console.log("data", data)

  return (
    <div>
      <div className="p-4 border rounded-lg flex justify-between items-center">
        <BibleDropDown />
        <BibleSelector />
      </div>
    </div>
  )
}

