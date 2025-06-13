import BibleSelector from '@/components/bible/bible-selector'
import SearchBar from '@/components/bible/searchbar'
import { highlightText } from '@/lib/parse'
import { useSearchVerse } from '@/queries/bible'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useMemo } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

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
                                    <div
                                        key={verse.id}
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
                                ))}
                                <Pagination className='flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0'>
                                    <p className="text-xs sm:text-sm text-muted-foreground">
                                        Page {currentPage} of {pages}
                                    </p>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <Link className={cn({
                                                'opacity-50 cursor-not-allowed': currentPage <= 1
                                            })} to='/search' search={
                                                (prev) => ({
                                                    ...prev,
                                                    page: currentPage - 1
                                                })
                                            } disabled={currentPage <= 1}>
                                                <PaginationPrevious />
                                            </Link>
                                        </PaginationItem>

                                        {Array.from({ length: pages }, (_, i) => i + 1).map((page) => {
                                            if (
                                                page === 1 ||
                                                page === pages ||
                                                (page >= currentPage - 1 && page <= currentPage + 1)
                                            ) {
                                                return (
                                                    <PaginationItem key={page}>
                                                        <Link to='/search' search={
                                                            (prev) => ({
                                                                ...prev,
                                                                page: page
                                                            })
                                                        } className={cn(buttonVariants({
                                                            variant: page === currentPage ? 'outline' : 'ghost',
                                                            size: 'icon'
                                                        }))}>
                                                            {page}
                                                        </Link>
                                                    </PaginationItem>
                                                );
                                            }
                                            if (page === 2 || page === pages - 1) {
                                                return (
                                                    <PaginationItem key={page}>
                                                        <PaginationEllipsis />
                                                    </PaginationItem>
                                                );
                                            }
                                            return null;
                                        })}
                                        <PaginationItem>
                                            <Link to='/search' search={
                                                (prev) => ({
                                                    ...prev,
                                                    page: currentPage + 1
                                                })
                                            } disabled={currentPage >= pages} className={cn({
                                                'opacity-50 cursor-not-allowed': currentPage >= pages
                                            })}>
                                                <PaginationNext />
                                            </Link>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
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
