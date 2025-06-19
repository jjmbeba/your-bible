import CollectionVerseCard from '@/components/collections/collection-verse-card'
import CollectionButton from '@/components/collections/collections-btn'
import DeleteCollectionButton from '@/components/collections/delete-collections-btn'
import { useSession } from '@/lib/auth-client'
import { convexQuery } from '@convex-dev/react-query'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { type Session } from 'better-auth'
import { api } from 'convex/_generated/api'
import { Id } from 'convex/_generated/dataModel'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/_authed/collections/$collectionId')({
  component: RouteComponent,
  loader: async ({ context: { session, queryClient }, params }) => {
    const userId = (session as Session).userId
    if (!userId) return;

    await queryClient.ensureQueryData(
      convexQuery(api.collections.getCollection, { id: params.collectionId as Id<"collections">, userId })
    )
  }
})

function RouteComponent() {
  const { data: session, isPending: isSessionPending } = useSession()
  const { collectionId } = Route.useParams()

  const { data, isLoading } = useQuery({
    ...convexQuery(api.collections.getCollection, { id: collectionId as Id<"collections">, userId: session?.session.userId ?? '' }),
    enabled: !!session?.session.userId
  })

  if (isLoading || isSessionPending) return (
    <div className="min-h-[80vh] flex items-center justify-center text-sm text-muted-foreground py-2 sm:py-0 gap-2">
      <Loader2 className="animate-spin h-5 w-5 sm:h-6 sm:w-6" />
      Loading verses...
    </div>
  );

  if (!data) return <div>Collection not found</div>;

  const { collection, verses } = data;

  const userId = session?.session.userId!

  return (
    <div className="w-full px-1 sm:px-4">
      <div className="p-2 sm:p-5 rounded-lg flex flex-row justify-between items-center gap-2 sm:gap-4">
        <>
          <h1 className="text-lg sm:text-2xl font-bold">{collection.name}</h1>
          <div className='flex items-center gap-2'>
            <CollectionButton type='edit' id={collectionId as Id<'collections'>} defaultValues={{ name: collection.name || '' }} />
            <DeleteCollectionButton id={collectionId as Id<'collections'>} />
          </div>
        </>
      </div>
      {verses.length > 0 ? (
        <div className="mt-2 sm:mt-6 p-2 sm:p-4 w-full flex items-center justify-center">
          <div className="w-full max-w-3xl">
            <div className="space-y-6">
              {verses.map((verse) => (
                <CollectionVerseCard key={verse._id} verseCollectionId={verse._id} collectionId={collection._id} userId={userId} verseText={verse.verseText} verseId={verse.verseId} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] flex items-center justify-center text-sm text-muted-foreground py-2 sm:py-0 gap-2">
          <p>No verses found. Add some verses to your collection.</p>
        </div>
      )}
    </div>
  )
}