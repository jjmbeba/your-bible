import { axiosInstance } from "@/lib/axios";
import { BibleSummary, Book } from "@/types/responses";
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