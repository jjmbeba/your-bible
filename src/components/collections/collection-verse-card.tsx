import { Link } from "@tanstack/react-router";
import { Id } from "convex/_generated/dataModel";
import DeleteVerseColButton from "./delete-verse-collection-btn";

type Props = {
    _id: Id<"collectionVerses">;
    _creationTime: number;
    verseId: string;
    bibleId: string;
    chapterId: string;
    verseText: string;
    collectionId: Id<"collections">;
    userId: string;
}


const CollectionVerseCard = ({ _id, verseId, bibleId, chapterId, verseText, collectionId, userId }: Props) => {
    return (
        <div
            className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors relative group"
        >
            <DeleteVerseColButton verseCollectionId={_id} collectionId={collectionId} userId={userId} />
            <div className="flex items-start gap-3">
                <div className="flex-1">
                    <p className="text-base sm:text-lg leading-relaxed text-foreground max-w-2xl">
                        {verseText}
                    </p>
                    <Link className="hover:underline" to={'/bible'} search={{ bible: bibleId, chapter: chapterId, verse: verseId }}>
                        <p className="mt-4 text-xs text-muted-foreground">
                            {verseId}
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CollectionVerseCard