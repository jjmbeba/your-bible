import { useMutation } from "@tanstack/react-query"
import { useConvexMutation } from "@convex-dev/react-query"
import { api } from "convex/_generated/api"
import { toast } from "sonner"

export const useAddVerseToCollection = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.verseCollections.addVerseToCollection),
        onSuccess: () => {
            toast.success('Verse added to collection')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}