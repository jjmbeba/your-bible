import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { toast } from "sonner";

export const useCreateStory = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: useConvexMutation(api.stories.createStory),
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
