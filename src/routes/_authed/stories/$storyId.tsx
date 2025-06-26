import DeleteStoryButton from '@/components/stories/delete-story-btn'
import { useIsMobile } from '@/hooks/utils'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ConvexError } from 'convex/values'

export const Route = createFileRoute('/_authed/stories/$storyId')({
    component: RouteComponent,
})

function RouteComponent() {
    const { storyId } = Route.useParams()
    const { data: session, isPending: isSessionPending } = useSession()
    const isMobile = useIsMobile()
    const { data: story, isLoading, error } = useQuery({
        ...convexQuery(api.stories.getStory, { id: storyId as Id<"stories">, userId: session?.session.userId ?? '' }),
        enabled: !!storyId && !!session?.session.userId
    })

    useEffect(() => {
        if (error) {
            if (error instanceof ConvexError) {
                toast.error(error.data.message)
            } else {
                toast.error(error.message)
            }
        }
    }, [error])

    const { data: chapterData, isLoading: isLoadingChapter } = useChapter(story?.bibleId, story?.chapterId)

    if (!story) {
        return <div className='flex items-center justify-center h-full text-center'>
            <div className='flex flex-col items-center justify-center gap-2'>
                <h1 className='text-lg font-semibold'>Story not found</h1>
                <p className='text-sm text-muted-foreground'>The story you are looking for does not exist.</p>
            </div>
        </div>
    }

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

    return <div className="w-full px-1 sm:px-4">
        <div className="py-2 sm:py-5 rounded-lg flex flex-row justify-between items-center gap-2 sm:gap-4">
            <>
                <h1 className="text-lg sm:text-2xl font-bold">{story.title} ({story.chapterReference})</h1>
                <div className='flex items-center gap-2'>
                    <DeleteStoryButton id={story._id as Id<'stories'>} />
                </div>
            </>
        </div>
        {isMobile ? (
            <Tabs defaultValue="story" className="w-full">
                <TabsList>
                    <TabsTrigger value="story">Story</TabsTrigger>
                    <TabsTrigger value="original">Original</TabsTrigger>
                </TabsList>
                <TabsContent value="story">
                    {story.story ? parseBible(story.story, '', story.bibleId, story.chapterId) : <div className='flex items-center justify-center h-full text-center'>
                        Select a Bible and Chapter to view the content
                    </div>}
                </TabsContent>
                <TabsContent value="original">
                    {story.bibleId && story.chapterId ? parseBible(chapterData?.content ?? '', '', story.bibleId, story.chapterId) : <div className='flex items-center justify-center h-full text-center'>
                        Select a Bible and Chapter to view the content
                    </div>}
                </TabsContent>
            </Tabs>
        ) : (
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
                    {story.story ? parseBible(story.story, '', story.bibleId, story.chapterId) : <div className='flex items-center justify-center h-full text-center'>
                        Select a Bible and Chapter to view the content
                    </div>}
                </div>
            </div>)}
    </div>
}
