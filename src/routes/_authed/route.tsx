import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed')({
  component: RouteComponent,
  beforeLoad: async ({ context: { session }, location }) => {
    if (!session) {
      throw redirect({ to: '/sign-in', search: { from: location.href } })
    }

    return {
      session
    }
  }
})

function RouteComponent() {
  return <Outlet />
}
