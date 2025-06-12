import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SearchIcon } from 'lucide-react'
import { Button } from '../ui/button'

const BibleDropDown = () => {
    const books = ['John', 'Matthew', 'Mark', 'Luke', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians']

    return (
        <div className='flex gap-4 items-center'>
            <Select>
                <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Select a Bible Book' />
                </SelectTrigger>
                <SelectContent>
                    {books.map(book => (
                        <SelectItem key={book} value={book}>{book}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className='w-[200px]'>
                    <SelectValue placeholder='Select a Bible Chapter' />
                </SelectTrigger>
                <SelectContent>
                    {Array.from({ length: 21 }).map((_, index) => (
                        <SelectItem key={index} value={index.toString()}>{index + 1}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className='w-[200px]'>
                    <SelectValue placeholder='Select a Bible Verse' />
                </SelectTrigger>
                <SelectContent>
                    {Array.from({ length: 21 }).map((_, index) => (
                        <SelectItem key={index} value={index.toString()}>{index + 1}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button size={'sm'}>
                <SearchIcon />
                Search
            </Button>
        </div>
    )
}

export default BibleDropDown