import { cn } from '@/lib/utils';
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
import { buttonVariants } from '../ui/button';
import { Link } from '@tanstack/react-router';

type Props = {
    previous?: {
        id?: string | undefined;
        bookId?: string | undefined;
        number?: string | undefined;
    } | undefined
    next?: {
        id?: string | undefined;
        bookId?: string | undefined;
        number?: string | undefined;
    } | undefined
}

const ChapterNavigation = ({ previous, next }: Props) => {
    return (
        <>
            <Link className={cn(buttonVariants({
                variant: 'outline',
                size: 'icon'
            }), {
                'opacity-50 cursor-not-allowed': !previous,
            })} disabled={!previous} to="/bible" search={(prev) => ({
                ...prev,
                chapter: previous?.id ?? ''
            })}>
                <ChevronLeftIcon className="size-4" />
            </Link>
            <Link className={cn(buttonVariants({
                variant: 'outline',
                size: 'icon'
            }), {
                'opacity-50 cursor-not-allowed': !next,
            })} disabled={!next} to="/bible" search={(prev) => ({
                ...prev,
                chapter: next?.id ?? ''
            })}>
                <ChevronRightIcon className="size-4" />
            </Link>
        </>
    )
}

export default ChapterNavigation