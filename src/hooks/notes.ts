import { useConvexMutation } from "@convex-dev/react-query"
import { useMutation } from "@tanstack/react-query"
import { api } from "convex/_generated/api"
import { toast } from "sonner"

export const useCreateNote = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.notes.createNote),
        onSuccess: () => {
            toast.success('Note created successfully')
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })
}