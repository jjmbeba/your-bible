import { TrashIcon } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button, buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'

const DeleteVerseColButton = () => {
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
                    <AlertDialogAction className={cn(buttonVariants({
                        variant: 'destructive',
                    }))}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteVerseColButton