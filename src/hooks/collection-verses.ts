import { convexQuery, useConvexMutation } from "@convex-dev/react-query"
import { useMutation, useQuery } from "@tanstack/react-query"
import { api } from "convex/_generated/api"
import { Id } from "convex/_generated/dataModel"
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

export const useVerseCollections = (collectionId: Id<'collections'>, userId?: string) => {
    return useQuery({
        ...convexQuery(api.verseCollections.getVerseCollections, {
            collectionId,
            userId: userId ?? ''
        }),
        enabled: !!userId
    })
}

export const useDeleteVerseFromCollection = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.verseCollections.deleteVerseFromCollection),
        onSuccess: () => {
            toast.success('Verse deleted from collection')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}