import DeleteStoryButton from '@/components/stories/delete-story-btn'
import { useSession } from '@/lib/auth-client'
import { parseBible } from '@/lib/parse'
import { useChapter } from '@/queries/bible'
import { convexQuery } from '@convex-dev/react-query'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { api } from 'convex/_generated/api'
import { Id } from 'convex/_generated/dataModel'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

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

    useEffect(() => {
        if (error) {
            toast.error(error.message)
        }
    }, [error])

    const { data: chapterData, isLoading: isLoadingChapter } = useChapter(story?.bibleId, story?.chapterId)

    if (isLoading || isSessionPending) return (
        <div className="min-h-[80vh] flex items-center justify-center text-sm text-muted-foreground py-2 sm:py-0 gap-2">
            <Loader2 className="animate-spin h-5 w-5 sm:h-6 sm:w-6" />
            Loading story...
        </div>
    );

    if (isLoadingChapter) {
        return (
            <div className="w-full px-2 sm:px-4">
                <div className="flex items-center justify-center h-full text-center">
                    <Loader2 className='w-4 h-4 animate-spin' />
                </div>
            </div>
        )
    }

    if (!story) return <div>Story not found</div>;

    const userId = session?.session.userId!

    return <div className="w-full px-1 sm:px-4">
        <div className="py-2 sm:py-5 rounded-lg flex flex-row justify-between items-center gap-2 sm:gap-4">
            <>
                <h1 className="text-lg sm:text-2xl font-bold">{story.title} from {story.chapterReference}</h1>
                <div className='flex items-center gap-2'>
                    <DeleteStoryButton id={story._id as Id<'stories'>} />
                </div>
            </>
        </div>
        <div className="mt-10 prose prose-lg max-w-none prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-lg prose-headings:scroll-mt-20 w-full transition-all duration-500 ease-in-out flex items-start justify-between gap-10">
            <div className="transition-all duration-500 ease-in-out sm:w-1/2">
                <h3 className='text-lg font-semibold mb-4'>
                    Original Text
                </h3>
                {story.bibleId && story.chapterId ? parseBible(chapterData?.content ?? '', '', story.bibleId, story.chapterId) : <div className='flex items-center justify-center h-full text-center'>
                    Select a Bible and Chapter to view the content
                </div>}
            </div>
            <div className="transition-all duration-500 ease-in-out sm:w-1/2">
                <h3 className='text-lg font-semibold mb-4'>
                    Generated Story
                </h3>
                {/* {bible && chapter ? parseBible(chapterData?.content ?? '', '', bible, chapter) : <div className='flex items-center justify-center h-full text-center'>
                    Select a Bible and Chapter to view the content
                </div>} */}
            </div>
        </div>
    </div>
}
