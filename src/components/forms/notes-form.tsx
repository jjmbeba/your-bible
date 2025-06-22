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
        }} className="h-full flex flex-col">
            <div className="grid gap-3 sm:gap-4 flex-1">
                <div className="space-y-2">
                    <Label htmlFor="content" className="text-sm sm:text-base font-medium">Content</Label>
                    <form.Field
                        name="content"
                        children={(field) => (
                            <div className="space-y-2">
                                <Textarea
                                    id="content"
                                    placeholder="Enter your notes here..."
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="min-h-[120px] sm:min-h-[150px] resize-none text-sm sm:text-base"
                                />
                                {field.state.meta.errors.map((error, i) => (
                                    <div key={i} className="text-red-500 text-xs sm:text-sm">
                                        {error?.message}
                                    </div>
                                ))}
                            </div>
                        )}
                    />
                </div>
            </div>
            <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                    <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 border-t">
                        <Button 
                            type="button" 
                            variant="outline" 
                            disabled={isSubmitting} 
                            onClick={() => form.reset()}
                            size='sm' 
                            className="order-2 sm:order-1"
                        >
                            Clear
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={!canSubmit || isSubmitting || isCreating || isUpdating}
                            size='sm'
                            className="order-1 sm:order-2"
                        >
                            {isSubmitting || isCreating || isUpdating ? (
                                <>
                                    <Loader2 className="animate-spin size-4 mr-2" />
                                    Saving...
                                </>
                            ) : (
                                'Save Note'
                            )}
                        </Button>
                    </div>
                )}
            />
        </form>
    )
}

export default NotesForm