import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import { toast } from "sonner";

export const useCreateStory = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.stories.createStory),
        onSuccess: () => {
            toast.success("Story created successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};