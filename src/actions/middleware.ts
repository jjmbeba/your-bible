import { createMiddleware } from "@tanstack/react-start"
import { fetchClerkAuth } from "./auth"

export const authMiddleware = createMiddleware({ type: 'function' }).server(async ({ next, data }) => {
    const { userId } = await fetchClerkAuth()

    if(!userId) {
        throw new Error('Unauthorized')
    }

    return next({
        context: {
            userId
        }
    })
})