import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { bibleSchema } from '@/schemas/bible'
import { useForm } from '@tanstack/react-form'
import { getRouteApi, useNavigate } from '@tanstack/react-router'
import { Loader2, SearchIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { useBooks } from '@/queries/bible'
import { Book } from '@/types/responses'

const BibleDropDown = () => {
    const { book, chapter, verse, bible } = getRouteApi('/bible').useSearch()
    const { data: books, isLoading: isLoadingBooks } = useBooks(bible)
    const navigate = useNavigate()

    const form = useForm({
        validators: {
            onSubmit: bibleSchema
        },
        defaultValues: {
            book: book ?? '',
            chapter: chapter ?? '',
            verse: verse ?? '',
        },
        onSubmit: ({ value }) => {
            navigate({
                to: '/bible',
                search: (prev) => ({
                    ...prev,
                    book: value.book,
                    chapter: value.chapter,
                    verse: value.verse,
                })
            })
        }
    })

    return (
        <form onSubmit={(e) => {
            e.preventDefault();

            form.handleSubmit();
        }} className='flex gap-4 items-center'>
            <form.Field
                name="book"
                children={(field) => (
                    <div className='flex flex-col gap-2'>
                        <Select
                            defaultValue={field.state.value}
                            onValueChange={(value) => field.handleChange(value)}
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
                        {field.state.meta.errors.map((error, i) => (
                            <div key={`${field.name}-error-${i}`} className="text-red-500 text-sm">
                                {error?.message}
                            </div>
                        ))}
                    </div>
                )}
            />
            <form.Field
                name="chapter"
                children={(field) => (
                    <div className='flex flex-col gap-2'>
                        <Select
                            defaultValue={field.state.value}
                            onValueChange={(value) => field.handleChange(value)}
                        >
                            <SelectTrigger className='w-[200px]'>
                                <SelectValue placeholder='Select a Bible Chapter' />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from({ length: 21 }).map((_, index) => (
                                    <SelectItem key={index + 1} value={(index + 1).toString()}>Chapter {index + 1}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {field.state.meta.errors.map((error, i) => (
                            <div key={`${field.name}-error-${i}`} className="text-red-500 text-sm">
                                {error?.message}
                            </div>
                        ))}
                    </div>
                )}
            />
            <form.Field
                name="verse"
                children={(field) => (
                    <div className='flex flex-col gap-2'>
                        <Select
                            defaultValue={field.state.value}
                            onValueChange={(value) => field.handleChange(value)}
                        >
                            <SelectTrigger className='w-[200px]'>
                                <SelectValue placeholder='Select a Bible Verse' />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from({ length: 21 }).map((_, index) => (
                                    <SelectItem key={index + 1} value={(index + 1).toString()}>Verse {index + 1}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {field.state.meta.errors.map((error, i) => (
                            <div key={`${field.name}-error-${i}`} className="text-red-500 text-sm">
                                {error?.message}
                            </div>
                        ))}
                    </div>
                )}
            />
            <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                    <Button type='submit' size={'sm'} disabled={!canSubmit || isSubmitting}>
                        <SearchIcon />
                        Search
                    </Button>
                )}
            />
        </form>
    )
}

export default BibleDropDown