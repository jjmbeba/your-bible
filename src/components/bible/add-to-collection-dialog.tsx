import { useSession } from '@/lib/auth-client'
import { convexQuery } from '@convex-dev/react-query'
import { useQuery } from '@tanstack/react-query'
import { api } from 'convex/_generated/api'
import { Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { ScrollArea } from '../ui/scroll-area'
import { cn } from '@/lib/utils'

type Props = {
  verseNumber: string
  verseText: string
  trigger: React.ReactNode
}

const AddToCollectionDialog = ({ verseNumber, verseText, trigger }: Props) => {
  const { data: session } = useSession()
  const { data: collections, isLoading } = useQuery({
    ...convexQuery(api.collections.get, { userId: session?.session.userId ?? '' }),
    enabled: !!session?.session.userId
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to Collection</DialogTitle>
          <DialogDescription>
            Choose a collection to add verse {verseNumber} to
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : !collections?.length ? (
            <div className="text-center text-sm text-muted-foreground py-4">
              No collections found. Create a collection first.
            </div>
          ) : (
            <ScrollArea className="h-[200px] pr-4">
              <div className="space-y-2">
                {collections.map((collection) => (
                  <Button
                    key={collection._id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start font-normal",
                      "hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {collection.name}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddToCollectionDialog 