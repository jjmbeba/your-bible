import { PlusIcon } from 'lucide-react'
import CollectionForm from '../forms/collections-form'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

const CollectionButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <PlusIcon className="w-4 h-4" />
                    <span>Create Collection</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <CollectionForm type="create" />
            </DialogContent>
        </Dialog>
    )
}

export default CollectionButton