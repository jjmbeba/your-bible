import DeleteStoryButton from '@/components/stories/delete-story-btn'
import { useSession } from '@/lib/auth-client'
import { convexQuery } from '@convex-dev/react-query'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { api } from 'convex/_generated/api'
import { Id } from 'convex/_generated/dataModel'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/_authed/stories/$storyId')({
    component: RouteComponent,
})

function RouteComponent() {
    const { storyId } = Route.useParams()
    const { data: session, isPending: isSessionPending } = useSession()
    const { data: story, isLoading, error } = useQuery({
        ...convexQuery(api.stories.getStory, { id: storyId as Id<"stories">, userId: session?.session.userId ?? '' }),
        enabled: !!storyId && !!session?.session.userId
    })

    if (isLoading || isSessionPending) return (
        <div className="min-h-[80vh] flex items-center justify-center text-sm text-muted-foreground py-2 sm:py-0 gap-2">
            <Loader2 className="animate-spin h-5 w-5 sm:h-6 sm:w-6" />
            Loading story...
        </div>
    );

    if (!story) return <div>Story not found</div>;

    const userId = session?.session.userId!

    return <div className="w-full px-1 sm:px-4">
        <div className="p-2 sm:p-5 rounded-lg flex flex-row justify-between items-center gap-2 sm:gap-4">
            <>
                <h1 className="text-lg sm:text-2xl font-bold">{story.title}</h1>
                <div className='flex items-center gap-2'>
                    {/* <CollectionButton type='edit' id={collectionId as Id<'collections'>} defaultValues={{ name: collection.name || '' }} /> */}
                    <DeleteStoryButton id={story._id as Id<'stories'>} />
                </div>
            </>
        </div>
    </div>
}
