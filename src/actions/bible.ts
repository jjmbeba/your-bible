import { axiosInstance } from "@/lib/axios";
import { BibleSummary, Book, Chapter, SearchResponse } from "@/types/responses";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getBibles = createServerFn().handler(async () => {
    const response = await axiosInstance.get<{ data: BibleSummary[] }>('v1/bibles').then(res => {
        return res.data
    }).catch((error) => {
        console.error("error", error)
        return { data: [] }
    })

    return response.data
})

export const getBooks = createServerFn().validator(z.object({
    bibleId: z.string()
})).handler(async ({ data: { bibleId } }) => {
    const response = await axiosInstance.get<{ data: Book[] }>(`v1/bibles/${bibleId}/books?include-chapters=true`).then(res => {
        return res.data
    }).catch((error) => {
        console.error("error", error)
        return { data: [] }
    })

    return response.data
})

export const getChapter = createServerFn().validator(z.object({
    bibleId: z.string(),
    chapterId: z.string()
})).handler(async ({ data: { bibleId, chapterId } }) => {
    const response = await axiosInstance.get<{ data: Chapter }>(`v1/bibles/${bibleId}/chapters/${chapterId}`).then(res => {
        return res.data
    }).catch((error) => {
        console.error("error", error)
        return { data: null }
    })

    return response.data
})

export const searchVerse = createServerFn().validator(z.object({
    bibleId: z.string(),
    query: z.string(),
    offset: z.number()
})).handler(async ({ data: { bibleId, query, offset } }) => {
    const response = await axiosInstance.get<{ data: SearchResponse }>(`v1/bibles/${bibleId}/search`, {
        params: {
            query,
            offset
        }
    }).then(res => {
        return res.data
    }).catch((error) => {
        console.error("error", error)
    
        const empty: SearchResponse = {
            query,
            limit: 0,
            offset: 0,
            total: 0,
            verseCount: 0,
            verses: [],
        }

        return { data: empty }
    })

    return response.data
})