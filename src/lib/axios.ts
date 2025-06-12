import axios from 'axios'

const API_KEY = process.env.API_KEY
const API_BASE_URL = process.env.API_BASE_URL

if (!API_KEY) {
    throw new Error("API_KEY is not set")
}

if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not set")
}


export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'api-key': API_KEY,
        'Content-Type': 'application/json'
    }
})