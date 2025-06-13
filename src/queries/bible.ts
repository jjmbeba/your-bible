import { getBibles, getBooks, getChapter, searchVerse } from "@/actions/bible";
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

const searchVerseQueryOptions = (bibleId?: string, query?: string, offset?: number) => queryOptions({
    queryKey: ['search-verse', bibleId, query, offset],
    queryFn: () => searchVerse({ data: { bibleId: bibleId ?? '', query: query ?? '', offset: offset ?? 0 } }),
    enabled: !!bibleId && !!query
})

export const useBibles = () => useQuery(biblesQueryOptions)
export const useBooks = (bibleId?: string) => useQuery(booksQueryOptions(bibleId))
export const useChapter = (bibleId?: string, chapterId?: string) => useQuery(chapterQueryOptions(bibleId, chapterId))
export const useSearchVerse = (bibleId?: string, query?: string, offset?: number) => useQuery(searchVerseQueryOptions(bibleId, query, offset))