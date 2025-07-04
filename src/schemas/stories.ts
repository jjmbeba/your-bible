import { z } from "zod";

export const storiesSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }).max(100, {
        message: "Title must be less than 100 characters",
    }),
    bibleId: z.string().min(1),
    chapterId: z.string().min(1),
    chapterReference: z.string().min(1),
    perspective: z.string().min(1, {
        message: "Perspective is required",
    }),
    setting: z.string().min(1, {
        message: "Setting is required",
    }).max(1000, {
        message: "Setting must be less than 1000 characters",
    }),
    tone: z.string().min(3, {
        message: "Tone must be at least 3 characters",
    }).max(1000, {
        message: "Tone must be less than 1000 characters",
    }),
    storyLength: z.string().min(1),
    originalText: z.string().min(1),
})

export const createStorySchema = storiesSchema.extend({
    userId: z.string().min(1),
    chapterReference: z.string().min(1),
})

export const generateStorySchema = createStorySchema.extend({
    originalText: z.string().min(1),
}).omit({
    bibleId: true,
    chapterId: true,
    title: true,
})