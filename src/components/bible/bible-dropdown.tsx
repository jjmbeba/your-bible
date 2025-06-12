import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useBooks } from '@/queries/bible'
import { Book, ChapterSummary } from '@/types/responses'
import { getRouteApi, useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useMemo } from 'react'

const BibleDropDown = () => {
    const { book, chapter, bible } = getRouteApi('/bible').useSearch()
    const { data: books, isLoading: isLoadingBooks } = useBooks(bible)
    const navigate = useNavigate()

    const selectedBookChapters = useMemo(() => {
        return books?.find((existingBook: Book) => existingBook.id === book)?.chapters ?? []
    }, [books, book])

    return (
        <div className='flex gap-4 items-center'>
            <div className='flex flex-col gap-2'>
                <Select
                    defaultValue={book}
                    onValueChange={(value) => {
                        navigate({
                            to: '/bible',
                            search: (prev) => ({
                                ...prev,
                                book: value,
                                chapter: undefined
                            })
                        })
                    }}
                    disabled={isLoadingBooks}
                >
                    <SelectTrigger className='w-[180px]'>
                        {isLoadingBooks ? (
                            <SelectValue>
                                <Loader2 className='size-4 animate-spin' />
                                Loading...
                            </SelectValue>
                        ) : (
                            <SelectValue placeholder='Select a Bible Book' />
                        )}
                    </SelectTrigger>
                    <SelectContent>
                        {books?.map((book: Book) => (
                            <SelectItem key={book.id} value={book.id}>{book.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className='flex flex-col gap-2'>
                <Select
                    defaultValue={chapter ?? ''}
                    onValueChange={(value) => {
                        navigate({
                            to: '/bible',
                            search: (prev) => ({
                                ...prev,
                                chapter: value,
                            })
                        })
                    }}
                >
                    <SelectTrigger className='w-[200px]'>
                        <SelectValue placeholder='Select a Bible Chapter' />
                    </SelectTrigger>
                    <SelectContent>
                        {selectedBookChapters.map((chapter: ChapterSummary) => (
                            <SelectItem key={chapter.id} value={chapter.id}>Chapter {chapter.number}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default BibleDropDown