import { z } from "zod";

export const bibleSchema = z.object({
    book: z.string().min(1, { message: 'Book is required' }),
    chapter: z.string().min(1, { message: 'Chapter is required' }),
})