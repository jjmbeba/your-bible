import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
        'Content-Type': 'application/json'
    }
})