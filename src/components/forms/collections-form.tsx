import { useCreateCollection, useUpdateCollection } from '@/hooks/collections'
import { createCollectionSchema } from '@/schemas/collections'
import { useForm } from '@tanstack/react-form'
import { Id } from 'convex/_generated/dataModel'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'
import { Button } from '../ui/button'
import { DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useSession } from '@/lib/auth-client'

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
    const { data: session, isPending: isSessionPending } = useSession()
    const { mutate: createCollection, isPending: isCreating } = useCreateCollection()
    const { mutate: updateCollection, isPending: isUpdating } = useUpdateCollection()

    const form = useForm({
        defaultValues: type === 'edit' && 'defaultValues' in rest ? rest.defaultValues : {
            name: ''
        },
        validators: {
            onSubmit: createCollectionSchema
        },
        onSubmit: async ({ value }) => {
            if (type === 'create' && session?.session.userId && !isSessionPending) {
                createCollection({
                    name: value.name,
                    userId: session?.session.userId
                })
                form.reset()
            } else {
                // const id = 'id' in rest ? rest.id : '' as Id<'collections'>
                // updateCollection({
                //     id,
                //     name: value.name
                // })
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
                            <Button type="submit" disabled={!canSubmit || isSubmitting || isCreating || isUpdating || isSessionPending}>{isSubmitting || isCreating || isUpdating ? <Loader2 className="animate-spin" /> : type === 'create' ? 'Create' : 'Save'}</Button>
                        </div>
                    )}
                />
            </form>
        </div>
    )
}

export default CollectionForm