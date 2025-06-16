import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { api } from 'convex/_generated/api'
import { isAuthenticated } from 'convex/auth'

export const Route = createFileRoute('/_authed')({
  component: RouteComponent,
  beforeLoad: async ({ context, location }) => {
    const session = await context.convexClient.query(api.auth.getSession)

    if(!session) {
      throw redirect({ to: "/sign-in", search: { from: location.href } })
    }

    return { session }
  }
})

function RouteComponent() {
  return <Outlet />
}
