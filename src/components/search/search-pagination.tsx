import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination"
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { buttonVariants } from '../ui/button'

type SearchPaginationProps = {
    currentPage: number
    pages: number
}

const SearchPagination = ({ currentPage, pages }: SearchPaginationProps) => {
    return (
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
    )
}

export default SearchPagination