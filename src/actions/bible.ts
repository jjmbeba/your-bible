import { axiosInstance } from "@/lib/axios";
import { Bible } from "@/types/responses";
import { createServerFn } from "@tanstack/react-start";
import axios from "axios";

export const getBibles = createServerFn().handler(async () => {
    const API_KEY = process.env.API_KEY

    if (!API_KEY) {
        throw new Error("API_KEY is not set")
    }

    const response : Bible[] = await axios.get('https://api.scripture.api.bible/v1/bibles', {
        headers: {
            'api-key': API_KEY,
            'Content-Type': 'application/json'
        }
    }).then(res => res.data).catch((error) => {
        console.error("error", error)
    })

    return response
})