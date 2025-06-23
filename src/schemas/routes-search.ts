import { z } from "zod";

export const bibleSearchSchema = z.object({
    bible: z.string().optional(),
    chapter: z.string().optional(),
    verse: z.string().optional(),
    notes: z.boolean().optional(),
})