import { createCollectionSchema, editCollectionSchema } from '@/schemas/collections'
import { Id } from 'convex/_generated/dataModel'
import React from 'react'
import { z } from 'zod'
import { DialogHeader, DialogTitle } from '../ui/dialog'
import { useForm } from '@tanstack/react-form'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useConvexMutation } from '@convex-dev/react-query'
import { api } from 'convex/_generated/api'
import { useCreateCollection } from '@/hooks/collections'

type CreateCollectionForm = {
    type: 'create'
}

type EditCollectionForm = {
    type: 'edit'
    id: Id<'collections'>
    defaultValues: z.infer<typeof editCollectionSchema>
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
                            <Button type="submit" disabled={!canSubmit || isSubmitting || isCreating}>{isSubmitting || isCreating ? <Loader2 className="animate-spin" /> : 'Save'}</Button>
                        </div>
                    )}
                />
            </form>
        </div>
    )
}

export default CollectionForm