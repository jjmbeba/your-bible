import { getAuth } from "@clerk/tanstack-react-start/server"
import { createServerFn } from "@tanstack/react-start"
import { getWebRequest } from "@tanstack/react-start/server"

export const fetchClerkAuth = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const request = getWebRequest()
    if (!request) {
      return {
        userId: null,
        error: 'No request context found'
      }
    }

    const { userId } = await getAuth(request)
    
    return {
      userId,
      error: null
    }
  } catch (error) {
    console.error('Auth error:', error)
    
    return {
      userId: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
})