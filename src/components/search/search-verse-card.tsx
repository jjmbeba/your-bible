import { highlightText } from '@/lib/parse'
import { SearchVerse } from '@/types/responses'
import React from 'react'

type VerseCardProps = {
    verse: SearchVerse,
    query: string
}

const SearchVerseCard = ({ verse, query }: VerseCardProps) => {
    return (
        <div
            className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
        >
            <div className="flex items-start gap-2 sm:gap-3">
                <div className="flex-1">
                    <h2 className="text-base sm:text-lg font-semibold text-primary mb-1 sm:mb-2">
                        {verse.reference}
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed text-foreground">
                        {highlightText(verse.text, query || '')}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SearchVerseCard