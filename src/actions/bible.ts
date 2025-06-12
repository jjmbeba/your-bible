import { axiosInstance } from "@/lib/axios";
import { BibleSummary } from "@/types/responses";
import { createServerFn } from "@tanstack/react-start";

export const getBibles = createServerFn().handler(async () => {
    const API_KEY = process.env.API_KEY

    if (!API_KEY) {
        throw new Error("API_KEY is not set")
    }

    const response = await axiosInstance.get<{ data: BibleSummary[] }>('v1/bibles').then(res => {
        return res.data
    }).catch((error) => {
        console.error("error", error)
        return { data: [] }
    })

    return response.data
})