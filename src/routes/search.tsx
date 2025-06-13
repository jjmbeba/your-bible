import BibleSelector from '@/components/bible/bible-selector'
import SearchBar from '@/components/bible/searchbar'
import { highlightText } from '@/lib/parse'
import { useSearchVerse } from '@/queries/bible'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/search')({
    component: RouteComponent,
    validateSearch: z.object({
        query: z.string().optional(),
        bible: z.string().optional(),
    })
})

function RouteComponent() {
    const { query, bible } = Route.useSearch()
    const { data: searchResults, isLoading: isLoadingSearchResults } = useSearchVerse(bible, query)

    console.log(searchResults)

    return (
        <div className="w-full px-2 sm:px-4">
            <div className="p-3 sm:p-5 border rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4">
                <SearchBar disabled={!bible} />
                <BibleSelector value={bible} />
            </div>
            <div className="mt-4 sm:mt-6 p-2 sm:p-4 w-full flex items-center justify-center">
                {!bible ? (
                    <div className="text-center text-sm text-muted-foreground">
                        Please select a bible to search.
                    </div>
                ) : query ? (
                    <div className="w-full max-w-3xl">
                        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Search Results - {searchResults?.total}</h1>
                        {searchResults?.verses.map((verse) => (
                            <div 
                                key={verse.id}
                                className="mb-6 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold text-primary mb-2">
                                            {verse.reference}
                                        </h2>
                                        <p className="text-base leading-relaxed text-foreground">
                                            {highlightText(verse.text, query || '')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-sm text-muted-foreground">
                        Please enter a search query.
                    </div>
                )}
            </div>
        </div>
    )
}
