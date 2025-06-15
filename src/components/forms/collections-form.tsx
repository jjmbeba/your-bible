import { useCreateCollection } from '@/hooks/collections'
import { createCollectionSchema } from '@/schemas/collections'
import { useForm } from '@tanstack/react-form'
import { Id } from 'convex/_generated/dataModel'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'
import { Button } from '../ui/button'
import { DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

type CreateCollectionForm = {
    type: 'create'
}

type EditCollectionForm = {
    type: 'edit'
    id: Id<'collections'>
    defaultValues: z.infer<typeof createCollectionSchema>
}

type Props = CreateCollectionForm | EditCollectionForm

const CollectionForm = ({ type, ...rest }: Props) => {
    const { mutate: createCollection, isPending: isCreating } = useCreateCollection()

    const form = useForm({
        defaultValues: type === 'edit' && 'defaultValues' in rest ? rest.defaultValues : {
            name: ''
        },
        validators: {
            onSubmit: createCollectionSchema
        },
        onSubmit: async ({ value }) => {
            if (type === 'create') {
                createCollection(value)
                form.reset()
            } else {
                // await editCollection(rest.id, value)
            }
        }
    })

    return (
        <div>
            <DialogHeader>
                <DialogTitle>{type === 'create' ? 'Create Collection' : 'Edit Collection'}</DialogTitle>
            </DialogHeader>
            <form className="mt-6" onSubmit={(e) => {
                e.preventDefault()

                form.handleSubmit()
            }}>
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <form.Field
                        name="name"
                        children={(field) => (
                            <>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Collection Name"
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
                            <Button type="button" variant="outline" disabled={isSubmitting} onClick={() => form.reset()}>Cancel</Button>
                            <Button type="submit" disabled={!canSubmit || isSubmitting || isCreating}>{isSubmitting || isCreating ? <Loader2 className="animate-spin" /> : type === 'create' ? 'Create' : 'Save'}</Button>
                        </div>
                    )}
                />
            </form>
        </div>
    )
}

export default CollectionForm