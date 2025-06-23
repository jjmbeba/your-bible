import { FixedToolbar } from '@/components/ui/fixed-toolbar';
import { MarkToolbarButton } from '@/components/ui/mark-toolbar-button';
import { ToolbarButton, ToolbarGroup } from '@/components/ui/toolbar';
import { useEditor } from '@/hooks/editor';
import { useCreateNote, useUpdateNote } from '@/hooks/notes';
import { INITIAL_VALUE } from '@/lib/constants';
import { createNoteSchema } from '@/schemas/notes';
import { convexQuery } from '@convex-dev/react-query';
import { useForm } from '@tanstack/react-form';
import { useSuspenseQuery } from '@tanstack/react-query';
import { api } from 'convex/_generated/api';
import { Loader2 } from 'lucide-react';
import { Plate } from 'platejs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Editor, EditorContainer } from '../ui/editor';
import { LinkToolbarButton } from '../ui/link-toolbar-button';
import { BulletedListToolbarButton, NumberedListToolbarButton, TodoListToolbarButton } from '../ui/list-toolbar-button';
import { MediaToolbarButton } from '../ui/media-toolbar-button';
import { KEYS } from 'platejs';

type NoteEditorProps = {
    chapterId: string,
    userId: string
}

const NoteEditor = ({ chapterId, userId }: NoteEditorProps) => {
    const { data: notes, error } = useSuspenseQuery({
        ...convexQuery(api.notes.getNotes, { chapterId, userId }),
    })

    useEffect(() => {
        if (error) {
            toast.error(error.message)
        }
    }, [error])

    const editor = useEditor({
        defaultContent: notes?.content ? JSON.parse(notes.content) : INITIAL_VALUE,
    })

    const { mutate: createNote, isPending: isCreating } = useCreateNote()
    const { mutate: updateNote, isPending: isUpdating } = useUpdateNote()

    const form = useForm({
        defaultValues: notes ?? {
            chapterId,
            content: '',
        },
        validators: {
            onSubmit: createNoteSchema,
        },
        onSubmit: ({ value }) => {
            if (notes) {
                updateNote({
                    id: notes._id,
                    content: value.content,
                    userId,
                })
            } else {
                createNote({
                    chapterId,
                    content: value.content,
                    userId,
                })
            }
        },
    })

    return (
        <form action="" onSubmit={(e) => {
            e.preventDefault()

            form.handleSubmit()
        }} className='border mt-2 sm:p-4 rounded-lg'>
            <form.Field name="content"
                children={(field) => (
                    <Plate editor={editor} onChange={(e) => {
                        field.handleChange(JSON.stringify(e.value))
                    }}>
                        <FixedToolbar className="justify-start rounded-t-lg">
                            <ToolbarButton onClick={() => editor.tf.h1.toggle()}>H1</ToolbarButton>
                            <ToolbarButton onClick={() => editor.tf.h2.toggle()}>H2</ToolbarButton>
                            <ToolbarButton onClick={() => editor.tf.h3.toggle()}>H3</ToolbarButton>
                            <ToolbarButton onClick={() => editor.tf.blockquote.toggle()}>Quote</ToolbarButton>
                            <MarkToolbarButton nodeType="bold" tooltip="Bold (⌘+B)">B</MarkToolbarButton>
                            <MarkToolbarButton nodeType="italic" tooltip="Italic (⌘+I)">I</MarkToolbarButton>
                            <MarkToolbarButton nodeType="underline" tooltip="Underline (⌘+U)">U</MarkToolbarButton>
                            <LinkToolbarButton />
                            <BulletedListToolbarButton />
                            <NumberedListToolbarButton />
                            <TodoListToolbarButton />
                            <ToolbarGroup>
                                <MediaToolbarButton nodeType={KEYS.img} />
                                <MediaToolbarButton nodeType={KEYS.video} />
                                <MediaToolbarButton nodeType={KEYS.audio} />
                                <MediaToolbarButton nodeType={KEYS.file} />
                            </ToolbarGroup>
                        </FixedToolbar>
                        <EditorContainer>
                            <Editor placeholder="Type your amazing content here..." />
                        </EditorContainer>
                    </Plate>
                )}
            />
            <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                    <div className="flex items-center gap-2">
                        <Button size='sm' type="button" variant="outline" disabled={!canSubmit || isSubmitting} onClick={() => {
                            form.reset()
                        }}>
                            Reset
                        </Button>
                        <Button size='sm' type="submit" disabled={!canSubmit || isSubmitting || isUpdating || isCreating}>
                            {isSubmitting || isUpdating || isCreating ? <Loader2 className="size-4 animate-spin" /> : 'Save'}
                        </Button>
                    </div>
                )}
            />
        </form>
    )
}

export default NoteEditor