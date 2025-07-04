import { useAddVerseToCollection } from '@/hooks/collection-verses'
import { useSession } from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import { convexQuery } from '@convex-dev/react-query'
import { useQuery } from '@tanstack/react-query'
import { api } from 'convex/_generated/api'
import { Id } from 'convex/_generated/dataModel'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
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

type Props = {
    verseText: string
    verseId: string
    chapterId: string
    bibleId: string
    trigger: React.ReactNode
}

const AddToCollectionDialog = ({ verseText, verseId, trigger, chapterId, bibleId }: Props) => {
    const { data: session } = useSession()
    const [loadingCollectionId, setLoadingCollectionId] = useState<string | null>(null)
    const { mutate: addVerseToCollection, isPending: isAddingVerseToCollection } = useAddVerseToCollection()

    const { data: collections, isLoading } = useQuery({
        ...convexQuery(api.collections.get, { userId: session?.session.userId ?? '' }),
        enabled: !!session?.session.userId
    })

    const handleAddToCollection = (collectionId: Id<'collections'>) => {
        if (!session?.session.userId) return;
        
        setLoadingCollectionId(collectionId)
        addVerseToCollection({
            verseId,
            collectionId,
            userId: session.session.userId,
            verseText,
            chapterId,
            bibleId
        }, {
            onSettled: () => {
                setLoadingCollectionId(null)
            }
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add to Collection</DialogTitle>
                    <DialogDescription>
                        Choose a collection to add verse {verseId} to
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
                                        onClick={() => handleAddToCollection(collection._id)}
                                        disabled={loadingCollectionId === collection._id}
                                    >
                                        {loadingCollectionId === collection._id && (
                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        )}
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