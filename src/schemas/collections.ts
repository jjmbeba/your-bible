import { z } from "zod"

export const createCollectionSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
})

export const editCollectionSchema = createCollectionSchema.extend({
    id: z.string().min(1),
})