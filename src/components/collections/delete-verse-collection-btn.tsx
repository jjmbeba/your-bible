import { useDeleteVerseFromCollection } from '@/hooks/collection-verses'
import { cn } from '@/lib/utils'
import { Id } from 'convex/_generated/dataModel'
import { Loader2, TrashIcon } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button, buttonVariants } from '../ui/button'

type DeleteVerseColButtonProps = {
    verseCollectionId: Id<'collectionVerses'>
    collectionId: Id<'collections'>
    userId: string
}

const DeleteVerseColButton = ({ verseCollectionId, collectionId, userId }: DeleteVerseColButtonProps) => {
    const { mutate: deleteVerseFromCollection, isPending } = useDeleteVerseFromCollection()

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    className="absolute top-2 right-2 hidden group-hover:inline-flex"
                    variant={'outline'}
                    size={'icon'}
                >
                    <TrashIcon />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the verse
                        and remove it from the collection.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className={cn(buttonVariants({
                            variant: 'destructive',
                        }))}
                        onClick={() => deleteVerseFromCollection({
                            verseCollectionId,
                            collectionId,
                            userId,
                        })}
                    >{isPending ? <Loader2 className="animate-spin" /> : 'Delete'}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteVerseColButton