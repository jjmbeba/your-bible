import BibleDropDown from '@/components/bible/bible-dropdown'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bible')({
  component: RouteComponent,
})

function RouteComponent() {
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

