import { useCreateNote, useUpdateNote } from '@/hooks/notes'
import { createNoteSchema } from '@/schemas/notes'
import { useForm } from '@tanstack/react-form'
import { Id } from 'convex/_generated/dataModel'
import { Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { useSession } from '@/lib/auth-client'

type NotesFormProps = {
    defaultValues?: {
        _id: Id<"notes">;
        _creationTime: number;
        chapterId: string;
        content: string;
        userId: string;
    },
    chapterId: string
}

const NotesForm = ({ defaultValues, chapterId }: NotesFormProps) => {
    const { data: session } = useSession()
    const { mutate: createNote, isPending: isCreating } = useCreateNote()
    const { mutate: updateNote, isPending: isUpdating } = useUpdateNote()

    const form = useForm({
        defaultValues: defaultValues ?? {
            chapterId,
            content: '',
        },
        validators: {
            onSubmit: createNoteSchema,
        },
        onSubmit: ({ value }) => {
            if (!session?.session.userId) return;
            if (defaultValues) {
                updateNote({
                    id: defaultValues._id,
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

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
        }}>
            <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <form.Field
                    name="content"
                    children={(field) => (
                        <>
                            <Textarea
                                id="content"
                                placeholder="Note Content"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                            {field.state.meta.errors.map((error, i) => (
                                <div key={i} className="text-red-500 text-sm">
                                    {error?.message}
                                </div>
                            ))}
                        </>
                    )}
                />
            </div>
            <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                    <div className="mt-6 flex justify-end gap-2">
                        <Button type="button" variant="outline" disabled={isSubmitting} onClick={() => form.reset()}>Clear</Button>
                        <Button type="submit" disabled={!canSubmit || isSubmitting || isCreating || isUpdating}>{isSubmitting || isCreating || isUpdating ? <Loader2 className="animate-spin" /> : 'Save'}</Button>
                    </div>
                )}
            />
        </form>
    )
}

export default NotesForm