import { useMutation } from "@tanstack/react-query"
import { useConvexMutation } from "@convex-dev/react-query"
import { api } from "convex/_generated/api"
import { toast } from "sonner"

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