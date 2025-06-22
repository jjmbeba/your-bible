import { z } from "zod"

export const noteSchema = z.object({
    id: z.string().min(1, { message: 'ID is required' }),
    chapterId: z.string().min(1, { message: 'Chapter ID is required' }),
    content: z.string().min(1, { message: 'Content is required' }),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
})

export const createNoteSchema = noteSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
})