import { GoogleGenAI } from "@google/genai"

function createAIClient() {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
        console.error('Environment variable VITE_GEMINI_API_KEY is not set')
        throw new Error('Missing Gemini API key')
    }
    return new GoogleGenAI({ apiKey })
}

let aiInstance: GoogleGenAI | null = null

export function getAI() {
    if (!aiInstance) {
        aiInstance = createAIClient()
    }
    return aiInstance
}