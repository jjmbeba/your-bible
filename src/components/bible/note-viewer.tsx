import { useSession } from '@/lib/auth-client'
import { convexQuery } from '@convex-dev/react-query'
import { useQuery } from '@tanstack/react-query'
import { api } from 'convex/_generated/api'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import NotesForm from '../forms/notes-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

type NoteViewerProps = {
    chapterId: string
}

const NoteViewer = ({ chapterId }: NoteViewerProps) => {
    const { data: session } = useSession()

    const { data: notes, isLoading, error } = useQuery({
        ...convexQuery(api.notes.getNotes, { chapterId, userId: session?.session.userId ?? '' }),
        enabled: !!session?.session.userId
    })

    if (error) {
        toast.error(error.message)
    }

    if (isLoading) {
        return <div className="flex items-center justify-center h-full min-h-[200px] p-4">
            <Loader2 className="animate-spin size-6" />
        </div>
    }

    return (
        <div className="w-full h-full">
            <Tabs defaultValue="view" className="w-full h-full flex flex-col">
                <TabsList className="mb-4 sm:mb-6">
                    <TabsTrigger value="view" className="text-sm sm:text-base">View</TabsTrigger>
                    <TabsTrigger value="edit" className="text-sm sm:text-base">Edit</TabsTrigger>
                </TabsList>
                <TabsContent value="view" className="flex-1 mt-0">
                    <div className="min-h-[200px] p-3 sm:p-4 border rounded-lg bg-background">
                        {notes?.content ? (
                            <div className="prose prose-sm sm:prose-base max-w-none">
                                <div className="whitespace-pre-wrap break-words">
                                    {notes.content}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full min-h-[150px] text-center">
                                <span className="text-muted-foreground text-sm sm:text-base">
                                    No notes found. Click on the edit tab to add a note.
                                </span>
                            </div>
                        )}
                    </div>
                </TabsContent>
                <TabsContent value="edit" className="flex-1 mt-0">
                    <div className="min-h-[200px]">
                        <NotesForm chapterId={chapterId} defaultValues={notes ?? undefined} />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default NoteViewer