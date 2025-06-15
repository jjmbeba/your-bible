// src/router.tsx
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClient } from '@tanstack/react-query'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'
import { ConvexReactClient, ConvexProvider } from 'convex/react'
import { ConvexQueryClient } from "@convex-dev/react-query"

export function createRouter() {
  const CONVEX_URL = (import.meta as any).env.VITE_CONVEX_URL!

  if (!CONVEX_URL) {
    throw new Error("missing VITE_CONVEX_URL environment variable")
  }

  const convex = new ConvexReactClient(CONVEX_URL, {
    unsavedChangesWarning: false,
  })

  const convexQueryClient = new ConvexQueryClient(convex)

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryKeyHashFn: convexQueryClient.hashFn(),
        queryFn: convexQueryClient.queryFn(),
      }
    }
  })

  convexQueryClient.connect(queryClient)

  return routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      context: { queryClient, convexClient: convex, convexQueryClient },
      scrollRestoration: true,
      defaultPreload: 'intent',
      Wrap: ({ children }) => (
        <ConvexProvider client={convexQueryClient.convexClient}>
          {children}
        </ConvexProvider>
      )
    }),
    queryClient
  )
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}