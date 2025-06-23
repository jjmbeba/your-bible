import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'
import { Sheet, SheetContent } from '../ui/sheet'
import NoteEditor from './note-editor'

type Props = {
    openNotes: boolean
    setOpenNotes: (open: boolean) => void
    userChapterBibleExists: boolean
    chapterId: string | undefined
    userId: string
}

const MobileNotesSheet = ({ openNotes, setOpenNotes, userChapterBibleExists, chapterId, userId }: Props) => {
    return (
        <Sheet open={openNotes} onOpenChange={setOpenNotes}>
            <SheetContent>
                {<Suspense fallback={<div className='flex items-center justify-center h-full text-center'>
                    <Loader2 className="size-4 animate-spin" />
                </div>}>
                    {userChapterBibleExists && <NoteEditor chapterId={chapterId ?? ''} userId={userId} />}
                </Suspense>}
            </SheetContent>
        </Sheet>
    )
}

export default MobileNotesSheet