import { Button } from "@/components/ui/button"
import { useDeleteStory } from "@/hooks/stories"
import { useSession } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { Id } from "convex/_generated/dataModel"
import { Loader2, TrashIcon } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { buttonVariants } from "../ui/button"

const DeleteStoryButton = ({ id }: { id: Id<"stories"> }) => {
  const { mutate: deleteStory, isPending } = useDeleteStory()
  const { data: session, isPending: isSessionPending } = useSession()

  return (
    <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                    <TrashIcon className="w-4 h-4" />
                    <span className='hidden sm:block'>Delete Story</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the story and all its contents.
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
                        if (!session?.session.userId) return;
                        deleteStory({
                            id,
                            userId: session?.session.userId
                        })
                    }} disabled={isPending || isSessionPending}>
                        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
  )
}

export default DeleteStoryButton