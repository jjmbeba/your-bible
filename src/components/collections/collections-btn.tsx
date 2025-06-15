import { createCollectionSchema } from '@/schemas/collections'
import { Id } from 'convex/_generated/dataModel'
import { PencilIcon, PlusIcon } from 'lucide-react'
import { z } from 'zod'
import CollectionForm from '../forms/collections-form'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

type CreateCollectionButton = {
    type: 'create'
}

type EditCollectionButton = {
    type: 'edit'
    id: Id<'collections'>,
    defaultValues: z.infer<typeof createCollectionSchema>
}

type Props = CreateCollectionButton | EditCollectionButton

const CollectionButton = ({ type, ...rest }: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    {type === 'create' ? <PlusIcon className="w-4 h-4" /> : <PencilIcon className="w-4 h-4" />}
                    <span>{type === 'create' ? 'Create Collection' : 'Edit Collection'}</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                {type === 'edit' ? 'id' in rest && 'defaultValues' in rest && <CollectionForm type="edit" id={rest.id} defaultValues={rest.defaultValues} /> : <CollectionForm type="create" />}
            </DialogContent>
        </Dialog>
    )
}

export default CollectionButton