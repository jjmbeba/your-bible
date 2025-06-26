import { createStorySchema } from "@/schemas/stories";
import { generateStory } from "@/server/stories";
import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { ConvexError } from "convex/values";
import { toast } from "sonner";
import z from "zod";

export const useCreateStory = () => {
    const navigate = useNavigate()
    const createStoryMutation = useConvexMutation(api.stories.createStory)

    return useMutation({
        mutationFn: async (values: z.infer<typeof createStorySchema>) => {
            const { originalText, bibleId, chapterId, title, ...rest } = values

            const { story: generatedStory, remaining } = await generateStory({
                data: {
                    ...rest,
                    originalText,
                }
            })

            if (!generatedStory) {
                throw new Error("Failed to generate story")
            }

            const createdStory = await createStoryMutation({
                title: values.title,
                bibleId: values.bibleId,
                chapterId: values.chapterId,
                chapterReference: values.chapterReference,
                perspective: values.perspective,
                setting: values.setting,
                tone: values.tone,
                storyLength: values.storyLength,
                userId: values.userId,
                story: generatedStory
            })

            return {
                createdStory,
                remaining
            }
        },
        onSuccess: (data) => {
            toast.success("Story created successfully. You have " + data.remaining + " stories left.");
            navigate({
                to: '/stories/$storyId',
                params: {
                    storyId: data.createdStory
                }
            })
        },
        onError: (error) => {
            if (error instanceof ConvexError) {
                toast.error(error.data.message)
            } else {
                toast.error(error.message);
            }
        },
    });
};

export const useDeleteStory = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: useConvexMutation(api.stories.deleteStory),
        onSuccess: () => {
            toast.success("Story deleted successfully");
            navigate({
                to: '/stories'
            })
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};
