import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server'
import { createRouter } from './router'
import { createClerkHandler } from '@clerk/tanstack-react-start/server'

const handler = createStartHandler({
    createRouter,
})

// @ts-expect-error
const clerkHandler = createClerkHandler(handler)

export default clerkHandler(defaultStreamHandler)