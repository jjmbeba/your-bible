import CollectionButton from '@/components/collections/collections-btn'
import { convexQuery } from '@convex-dev/react-query'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { api } from 'convex/_generated/api'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export const Route = createFileRoute('/_authed/collections/')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      convexQuery(api.collections.get, {})
    )
  }
})

function RouteComponent() {
  const { data: collections, isLoading, error } = useQuery(convexQuery(api.collections.get, {}))

  if (error) {
    toast.error(error.message)
  }

  return (
    <div className="w-full px-2 sm:px-4">
      <div className="p-2 sm:p-5 rounded-lg flex flex-row sm:flex-col justify-between items-center gap-2 sm:gap-4">
        <h1 className="text-lg sm:text-2xl font-bold">Your Collections</h1>
        <CollectionButton type='create' />
      </div>
      <div className="mt-3 sm:mt-6 p-2 sm:p-4 w-full flex items-center justify-center">
        {isLoading ? (
          <div className="text-center text-sm text-muted-foreground">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <div className="w-full max-w-3xl">
            {!collections?.length ? (
              <div className="text-center text-sm text-muted-foreground">
                No collections found. Create your first collection to get started.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {collections.map((collection) => (
                  <div
                    key={collection._id}
                    className="p-4 border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    <h2 className="text-base sm:text-lg font-semibold mb-2">
                      {collection.name}
                    </h2>
                    <div className="mt-4 flex justify-end">
                      <Link
                        to="/collections/$collectionId"
                        params={{ collectionId: collection._id }}
                        className="cursor-pointer text-sm text-primary hover:text-primary/80 transition-colors"
                        aria-label={`View ${collection.name} collection`}
                      >
                        View Collection
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
  )
}
