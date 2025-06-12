import { getBibles, getBooks } from "@/actions/bible";
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

export const useBibles = () => useQuery(biblesQueryOptions)
export const useBooks = (bibleId?: string) => useQuery(booksQueryOptions(bibleId))