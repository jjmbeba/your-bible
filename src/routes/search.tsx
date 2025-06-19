import BibleSelector from '@/components/bible/bible-selector'
import SearchBar from '@/components/bible/searchbar'
import SearchPagination from '@/components/search/search-pagination'
import SearchVerseCard from '@/components/search/search-verse-card'
import VerseCard from '@/components/search/search-verse-card'
import { useSearchVerse } from '@/queries/bible'
import { createFileRoute } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useMemo } from 'react'
import { z } from 'zod'

export const Route = createFileRoute('/search')({
    component: RouteComponent,
    validateSearch: z.object({
        query: z.string().optional(),
        bible: z.string().optional(),
        page: z.number().optional(),
    })
})

function RouteComponent() {
    const { query, bible, page } = Route.useSearch()
    const offset = useMemo(() => {
        return ((page ?? 1) - 1) * 10
    }, [page]);

    const { data: searchResults, isLoading: isLoadingSearchResults } = useSearchVerse(bible, query, offset)

    const pages = useMemo(() => {
        if (!searchResults) return 0

        return Math.ceil(searchResults.total / searchResults.limit)
    }, [searchResults, searchResults?.total, searchResults?.limit]);

    const currentPage = useMemo(() => {
        if (page) return page

        return 1
    }, [page]);


    return (
        <div className="w-full px-2 sm:px-4">
            <div className="p-2 sm:p-5 border rounded-lg flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
                <SearchBar disabled={!bible} />
                <BibleSelector value={bible} />
            </div>
            <div className="mt-3 sm:mt-6 p-2 sm:p-4 w-full flex items-center justify-center">
                {!bible ? (
                    <div className="text-center text-sm text-muted-foreground">
                        Please select a bible to search.
                    </div>
                ) : query ? isLoadingSearchResults ? (
                    <div className="text-center text-sm text-muted-foreground">
                        <Loader2 className='animate-spin' />
                    </div>
                ) : (
                    <div className="w-full max-w-3xl">
                        <h1 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-6">Search Results {searchResults?.total ? `- ${searchResults?.total}` : ''}</h1>
                        {!searchResults ? (
                            <div className="text-center text-sm text-muted-foreground">
                                No results found.
                            </div>
                        ) : (
                            <div>
                                {searchResults?.verses.map((verse) => (
                                  <SearchVerseCard key={verse.id} verse={verse} query={query} />
                                ))}
                                <SearchPagination currentPage={currentPage} pages={pages} />
                            </div>
                        )}
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
