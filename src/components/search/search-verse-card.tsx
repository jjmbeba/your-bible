import { highlightText } from '@/lib/parse'
import { SearchVerse } from '@/types/responses'
import { Link } from '@tanstack/react-router'
import { BookmarkPlus } from 'lucide-react'
import AddToCollectionDialog from '../bible/add-to-collection-dialog'
import { Button } from '../ui/button'

type VerseCardProps = {
    verse: SearchVerse,
    query: string
}

const SearchVerseCard = ({ verse, query }: VerseCardProps) => {
    console.log(verse)
    return (
        <div
            className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
        >
            <div className="flex items-start gap-2 sm:gap-3">
                <div className="flex-1">
                    <div className='flex items-center justify-between gap-2 group'>
                        <Link className={'hover:underline'} to={'/bible'} search={{ bible: verse.bibleId, chapter: verse.chapterId, verse: verse.id }}>
                            <h2 className="text-base sm:text-lg font-semibold text-primary mb-1 sm:mb-2">
                                {verse.reference}
                            </h2>
                        </Link>
                        <AddToCollectionDialog
                            verseText={verse.text.trim()}
                            verseId={verse.id}
                            chapterId={verse.chapterId}
                            bibleId={verse.bibleId}
                            trigger={
                                <Button
                                    variant={'ghost'}
                                    className='opacity-0 group-hover:opacity-100 transition-opacity'
                                    size={'icon'}
                                    aria-label={`Add verse ${verse.id} to collection`}
                                >
                                    <BookmarkPlus className="h-4 w-4" />
                                </Button>
                            }
                        />
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-foreground">
                        {highlightText(verse.text, query || '')}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SearchVerseCard