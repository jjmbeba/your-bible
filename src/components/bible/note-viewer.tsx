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
        return <div className="flex items-center justify-center h-full">
            <Loader2 className="animate-spin" />
        </div>
    }

    return (
        <div>
            <Tabs defaultValue="view">
                <TabsList>
                    <TabsTrigger value="view">View</TabsTrigger>
                    <TabsTrigger value="edit">Edit</TabsTrigger>
                </TabsList>
                <TabsContent value="view">
                    {notes?.content ?? <span className="text-muted-foreground">No notes found. Click on the edit tab to add a note.</span>}
                </TabsContent>
                <TabsContent value="edit">
                    <NotesForm chapterId={chapterId} defaultValues={notes ?? undefined} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default NoteViewer