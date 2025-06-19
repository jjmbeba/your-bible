import { Id } from "convex/_generated/dataModel"
import DeleteVerseColButton from "./delete-verse-collection-btn"

const CollectionVerseCard = ({ verseCollectionId, collectionId, userId, verseText, verseId }: { verseCollectionId: Id<'collectionVerses'>, collectionId: Id<'collections'>, userId: string, verseText: string, verseId: string }) => {
    return (
        <div
            className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors relative group"
        >
            <DeleteVerseColButton verseCollectionId={verseCollectionId} collectionId={collectionId} userId={userId} />
            <div className="flex items-start gap-3">
                <div className="flex-1">
                    <p className="text-base sm:text-lg leading-relaxed text-foreground max-w-2xl">
                        {verseText}
                    </p>
                    <p className="mt-4 text-xs text-muted-foreground">
                        {verseId}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CollectionVerseCard