import { z } from "zod";

export const StoryPerspectiveEnum = z.enum([
    "narrator",
    "specificCharacter",
    "observer",
    "nonHumanElement",
]);

export const StoryLengthEnum = z.enum([
    "short",
    "medium",
    "long",
]);

export const storiesSchema = z.object({
    bibleId: z.string().min(1),
    chapterId: z.string().min(1),
    perspective: z.string().min(1, {
        message: "Perspective is required",
    }).or(StoryPerspectiveEnum),
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
    storyLength: StoryLengthEnum,
})