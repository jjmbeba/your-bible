import { getAI } from "@/lib/gemini";
import { storiesSchema } from "@/schemas/stories";
import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { toast } from "sonner";
import z from "zod";

const createStorySchema = storiesSchema.extend({
    userId: z.string().min(1),
    originalText: z.string().min(1),
    chapterReference: z.string().min(1),
})

export const useCreateStory = () => {
    const navigate = useNavigate()
    const generateStoryMutation = useGenerateStory()
    const createStoryMutation = useConvexMutation(api.stories.createStory)

    return useMutation({
        mutationFn: async (values: z.infer<typeof createStorySchema>) => {
            const story = await generateStoryMutation.mutateAsync({
                originalText: values.originalText,
                chapterReference: values.chapterReference,
                perspective: values.perspective,
                setting: values.setting,
                tone: values.tone,
                storyLength: values.storyLength,
                title: values.title,
                bibleId: values.bibleId,
                chapterId: values.chapterId,
            })

            if (!story) {
                throw new Error("Failed to generate story")
            }

            return createStoryMutation({
                title: values.title,
                bibleId: values.bibleId,
                chapterId: values.chapterId,
                chapterReference: values.chapterReference,
                perspective: values.perspective,
                setting: values.setting,
                tone: values.tone,
                storyLength: values.storyLength,
                story,
                userId: values.userId
            })
        },
        onSuccess: () => {
            toast.success("Story created successfully");
            navigate({
                to: '/stories'
            })
        },
        onError: (error) => {
            toast.error(error.message);
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

const generateStorySchema = storiesSchema.extend({
    originalText: z.string().min(1),
    chapterReference: z.string().min(1),
})

export const useGenerateStory = () => {
    return useMutation({
        mutationFn: async ({ originalText, chapterReference, perspective, setting, tone, storyLength }: z.infer<typeof generateStorySchema>) => {
            const API_MODEL = import.meta.env.VITE_GEMINI_MODEL as string | undefined

            if (!API_MODEL) {
                throw new Error("API_MODEL is not set")
            }

            const response = await getAI().models.generateContent({
                model: API_MODEL,
                contents: [{
                    role: "user",
                    parts: [{
                        text: `You are a highly creative and knowledgeable AI specializing in re-imagining biblical narratives.
Your primary goal is to generate engaging, respectful, and thoughtfully re-contextualized stories based on provided Scripture.
--- USER REQUEST ---
Please generate a new story based on the biblical passage provided below, incorporating the specific creative instructions.
--- ORIGINAL BIBLICAL PASSAGE ---
Title: ${chapterReference}
Text:
${originalText}

--- CREATIVE INSTRUCTIONS ---
Re-imagine this story with the following parameters:
- **Perspective:** ${perspective}
- **Setting:** ${setting}
- **Primary Tone/Theme:** ${tone}
- **Desired Length:** Approximately ${storyLength === 'short' ? '200' : storyLength === 'medium' ? '500' : '1000'} words.

--- FORMATTING ---
- Structure the story with clear paragraphs.
- Do not include chapter or verse numbers within the generated story.
- Use simple, accessible language unless explicitly requested otherwise in additional guidance.

--- THEOLOGICAL AND ETHICAL GUIDELINES (CRITICAL) ---
**Adhere strictly to the following principles:**
1.  **Do not contradict core biblical doctrine or theological truths.** The essence of the biblical message must be preserved.
2.  **Maintain reverence and respect for God and biblical figures.** Avoid irreverent, disrespectful, or mocking tones.
3.  **Do not invent new, significant events or characters that fundamentally alter the core narrative or its theological meaning.** Minor creative embellishments for setting/perspective are fine, but the fundamental plot, characters' core actions, and divine interventions must remain consistent with the original passage's intent.
4.  **Avoid anachronisms or details that undermine the historical/cultural context** (unless explicitly requested by a "modern setting" prompt, in which case, only the setting is modernized, not the core message or divine actions).
5.  **Do not generate content that is explicitly violent, sexual, or otherwise inappropriate for a broad, faith-based audience.**
6.  **Do not offer direct theological interpretations or preach a sermon.** Your role is to retell a story creatively.
7.  **Do not claim to be the Bible or a direct representation of truth.** You are an AI generating a creative interpretation.

--- FINAL INSTRUCTION ---
Begin the story now. Respond only with the generated story text.
`
                    }]
                }]
            })

            return response.text
        },
        onSuccess: (data) => {
            console.log(data)

            return data
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })
}
