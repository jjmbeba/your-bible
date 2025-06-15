import React from 'react'
import { AlertDialog, AlertDialogTitle, AlertDialogHeader, AlertDialogContent, AlertDialogTrigger, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '../ui/alert-dialog'
import { Button, buttonVariants } from '../ui/button'
import { Loader2, TrashIcon } from 'lucide-react'
import { useDeleteCollection } from '@/hooks/collections'
import { cn } from '@/lib/utils'
import { Id } from 'convex/_generated/dataModel'
import { useNavigate } from '@tanstack/react-router'

type Props = {
    id: Id<'collections'>
}

const DeleteCollectionButton = ({ id }: Props) => {
    const { mutate: deleteCollection, isPending } = useDeleteCollection()

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                    <TrashIcon className="w-4 h-4" />
                    <span className='hidden sm:block'>Delete Collection</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the collection and all its contents.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className={cn(buttonVariants({
                        variant: 'outline',
                        size: 'sm'
                    }))} >Cancel</AlertDialogCancel>
                    <AlertDialogAction className={cn(buttonVariants({
                        variant: 'destructive',
                        size: 'sm'
                    }))} onClick={() => {
                        deleteCollection({
                            id
                        })
                    }} disabled={isPending}>
                        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteCollectionButton