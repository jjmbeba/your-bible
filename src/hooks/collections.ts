import { useMutation } from "@tanstack/react-query"
import { useConvexMutation } from "@convex-dev/react-query"
import { api } from "convex/_generated/api"
import { toast } from "sonner"
import { useNavigate } from "@tanstack/react-router"

export const useCreateCollection = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.collections.createCollection),
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Collection created successfully')
        }
    })
}

export const useUpdateCollection = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.collections.updateCollection),
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Collection updated successfully')
        }
    })
}

export const useDeleteCollection = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: useConvexMutation(api.collections.deleteCollection),
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Collection deleted successfully')
            navigate({
                to: '/collections'
            })
        }
    })
}