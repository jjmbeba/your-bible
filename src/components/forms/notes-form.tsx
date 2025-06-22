import { createNoteSchema, noteSchema } from '@/schemas/notes'
import { useForm } from '@tanstack/react-form'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

type NotesFormProps = {
    defaultValues?: z.infer<typeof noteSchema>,
    chapterId: string
}

const NotesForm = ({ defaultValues, chapterId }: NotesFormProps) => {
    const form = useForm({
        defaultValues: defaultValues ?? {
            chapterId,
            content: '',
        },
        validators: {
            onSubmit: createNoteSchema,
        },
        onSubmit: ({ value }) => {
            console.log(value)
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
                        <Button type="submit" disabled={!canSubmit || isSubmitting}>{isSubmitting ? <Loader2 className="animate-spin" /> : 'Save'}</Button>
                    </div>
                )}
            />
        </form>
    )
}

export default NotesForm