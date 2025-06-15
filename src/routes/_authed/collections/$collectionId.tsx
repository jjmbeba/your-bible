import { convexQuery } from '@convex-dev/react-query'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { api } from 'convex/_generated/api'
import { Id } from 'convex/_generated/dataModel'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/_authed/collections/$collectionId')({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      convexQuery(api.collections.getCollection, { id: params.collectionId as Id<"collections"> })
    )
  }
})

function RouteComponent() {
  const { collectionId } = Route.useParams()
  const { data: collection, isLoading } = useQuery(
    convexQuery(api.collections.getCollection, { id: collectionId as Id<"collections"> })
  )

  return (
    <div className="w-full px-2 sm:px-4">
      <div className="p-2 sm:p-5 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
        {isLoading ? (
          <div className="text-center text-sm text-muted-foreground">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <h1 className="text-lg sm:text-2xl font-bold">{collection?.name || 'Collection'}</h1>
        )}
      </div>
      <div className="mt-3 sm:mt-6 p-2 sm:p-4 w-full flex items-center justify-center">
        {isLoading ? (
          <div className="text-center text-sm text-muted-foreground">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <div className="w-full max-w-3xl">
            {collection ? (
              <div className="p-4">
                {/* Add more collection details here as needed */}
              </div>
            ) : (
              <div className="text-center text-sm text-muted-foreground">
                Collection not found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
