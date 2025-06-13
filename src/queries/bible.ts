import { getBibles, getBooks, getChapter } from "@/actions/bible";
import { queryOptions, useQuery } from "@tanstack/react-query";

const biblesQueryOptions = queryOptions({
    queryKey: ['bibles'],
    queryFn: getBibles
})

const booksQueryOptions = (bibleId?: string) => queryOptions({
    queryKey: ['books', bibleId],
    queryFn: () => getBooks({ data: { bibleId: bibleId ?? '' } }),
    enabled: !!bibleId
})

const chapterQueryOptions = (bibleId?: string, chapterId?: string) => queryOptions({
    queryKey: ['chapter', bibleId, chapterId],
    queryFn: () => getChapter({ data: { bibleId: bibleId ?? '', chapterId: chapterId ?? '' } }),
    enabled: !!bibleId && !!chapterId
})

export const useBibles = () => useQuery(biblesQueryOptions)
export const useBooks = (bibleId?: string) => useQuery(booksQueryOptions(bibleId))
export const useChapter = (bibleId?: string, chapterId?: string) => useQuery(chapterQueryOptions(bibleId, chapterId))