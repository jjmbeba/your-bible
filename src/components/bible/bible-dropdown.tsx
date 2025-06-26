import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useBooks } from '@/queries/bible'
import { Book, ChapterSummary } from '@/types/responses'
import { useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useMemo } from 'react'

type Props = {
    bible: string | undefined,
    chapter: string | undefined,
}

const BibleDropDown = ({ bible, chapter }: Props) => {
    const navigate = useNavigate()
    const currentBook = chapter?.split('.')[0]
    const { data: books, isLoading: isLoadingBooks } = useBooks(bible)

    const selectedBook = useMemo(() =>
        books?.find((book: Book) => book.id === currentBook),
        [books, currentBook]
    )

    const selectedBookChapters = useMemo(() => {
        return books?.find((existingBook: Book) => existingBook.id === selectedBook?.id)?.chapters ?? []
    }, [books, selectedBook])

    return (
        <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 items-center w-full sm:w-auto'>
            <div className='w-full sm:w-auto'>
                <Select
                    value={selectedBook?.id}
                    onValueChange={(value) => {
                        const selectedBook = books?.find((book: Book) => book.id === value)
                        const firstChapter = selectedBook?.chapters?.[0]?.id
                        if (firstChapter) {
                            navigate({
                                to: '.',
                                search: (prev) => ({
                                    ...prev,
                                    chapter: firstChapter,
                                })
                            })
                        }
                    }}
                    disabled={isLoadingBooks || !bible}
                >
                    <SelectTrigger className='w-full sm:w-[180px]'>
                        {isLoadingBooks ? (
                            <div className='flex items-center gap-2'>
                                <Loader2 className='size-4 animate-spin' />
                                Loading...
                            </div>
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
            <div className='w-full sm:w-auto'>
                <Select
                    value={chapter ?? ''}
                    onValueChange={(value) => {
                        navigate({
                            to: '.',
                            search: (prev) => ({
                                ...prev,
                                chapter: value,
                            })
                        })
                    }}
                    disabled={isLoadingBooks || !bible || !selectedBook}
                >
                    <SelectTrigger className='w-full sm:w-[200px]'>
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