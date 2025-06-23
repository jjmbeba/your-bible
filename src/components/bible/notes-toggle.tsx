import { NotebookTextIcon } from 'lucide-react'
import { Button } from '../ui/button'

type Props = {
    openNotes: boolean
    setOpenNotes: (open: boolean) => void
}

const NotesToggle = ({ openNotes, setOpenNotes }: Props) => {
    return (
        <Button variant="outline" size="sm" onClick={() => setOpenNotes(!openNotes)}>
            <NotebookTextIcon className="size-4" />
            {openNotes ? 'Close Notes' : 'Open Notes'}
        </Button>
    )
}

export default NotesToggle