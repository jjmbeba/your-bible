import { buttonVariants } from '@/components/ui/button'
import { useSession } from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import { convexQuery } from '@convex-dev/react-query'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { api } from 'convex/_generated/api'
import { Loader2, PlusIcon } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/_authed/stories/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: session } = useSession()
  const { data: stories, isLoading, error } = useQuery({
    ...convexQuery(api.stories.getStories, { userId: session?.session.userId ?? '' }),
    enabled: !!session?.session.userId
  })

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  return <div className="w-full px-2 sm:px-4">
    <div className="p-2 sm:p-5 rounded-lg flex flex-row sm:flex-col justify-between items-center gap-2 sm:gap-4">
      <h1 className="text-lg sm:text-2xl font-bold">Your Stories</h1>
      <Link to='/stories/create-story' className={cn(buttonVariants({
        variant: 'outline',
        size: 'sm'
      }))}>
        <PlusIcon className="w-4 h-4" />
        <span className='hidden sm:block'>Create Story</span>
      </Link>
    </div>
    <div className="mt-3 sm:mt-6 p-2 sm:p-4 w-full flex items-center justify-center">
      {isLoading ? (
        <div className="text-center text-sm text-muted-foreground">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="w-full max-w-3xl">
          {!stories?.length ? (
            <div className="text-center text-sm text-muted-foreground">
              No stories found. Create your first story to get started.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stories.map((story) => (
                <div
                  key={story._id}
                  className="p-4 border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <h2 className="text-base sm:text-lg font-semibold mb-2">
                    {story.title}
                  </h2>
                  <div className="mt-4 flex justify-end">
                    <Link
                      to="/stories/$storyId"
                      params={{ storyId: story._id }}
                      className="cursor-pointer text-sm text-primary hover:text-primary/80 transition-colors"
                      aria-label={`View ${story.title} story`}
                    >
                      View Story
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  </div>
}
