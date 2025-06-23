import { BlockquoteElement } from '@/components/ui/blockquote-node';
import { FixedToolbar } from '@/components/ui/fixed-toolbar';
import { H1Element, H2Element, H3Element } from '@/components/ui/heading-node';
import { MarkToolbarButton } from '@/components/ui/mark-toolbar-button';
import { ToolbarButton } from '@/components/ui/toolbar';
import { useCreateNote, useUpdateNote } from '@/hooks/notes';
import { useSession } from '@/lib/auth-client';
import { createNoteSchema } from '@/schemas/notes';
import { convexQuery } from '@convex-dev/react-query';
import {
    BlockquotePlugin,
    BoldPlugin,
    H1Plugin,
    H2Plugin,
    H3Plugin,
    ItalicPlugin,
    UnderlinePlugin,
} from '@platejs/basic-nodes/react';
import { useForm } from '@tanstack/react-form';
import { useQuery } from '@tanstack/react-query';
import { api } from 'convex/_generated/api';
import { Loader2 } from 'lucide-react';
import type { Value } from 'platejs';
import { Plate, usePlateEditor } from 'platejs/react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Editor, EditorContainer } from '../ui/editor';
import { useEffect } from 'react';

type NoteEditorProps = {
    chapterId: string
}

const initialValue: Value = [
    {
        children: [{ text: 'Title' }],
        type: 'h3',
    },
    {
        children: [{ text: 'This is a quote.' }],
        type: 'blockquote',
    },
    {
        children: [
            { text: 'With some ' },
            { bold: true, text: 'bold' },
            { text: ' text for emphasis!' },
        ],
        type: 'p',
    },
];

const NoteEditor = ({ chapterId }: NoteEditorProps) => {
    const { data: session } = useSession()
    const { data: notes, isLoading, error } = useQuery({
        ...convexQuery(api.notes.getNotes, { chapterId, userId: session?.session.userId ?? '' }),
        enabled: !!session?.session.userId
    })

    useEffect(() => {
        if (error) {
            toast.error(error.message)
        }
    }, [error])

    const editor = usePlateEditor({
        plugins: [
            BoldPlugin,
            ItalicPlugin,
            UnderlinePlugin,
            H1Plugin.withComponent(H1Element),
            H2Plugin.withComponent(H2Element),
            H3Plugin.withComponent(H3Element),
            BlockquotePlugin.withComponent(BlockquoteElement),
        ],
        value: notes?.content ? JSON.parse(notes.content) : initialValue,
    });

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
            if (!session?.session.userId) {
                toast.info('Please login to save your notes')
                return
            };

            if (notes) {
                updateNote({
                    id: notes._id,
                    content: value.content,
                    userId: session.session.userId,
                })
            } else {
                createNote({
                    chapterId,
                    content: value.content,
                    userId: session.session.userId,
                })
            }
        },
    })

    if (isLoading) {
        return <div className="flex items-center justify-center h-full min-h-[200px] p-4">
            <Loader2 className="animate-spin size-6" />
        </div>
    }

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