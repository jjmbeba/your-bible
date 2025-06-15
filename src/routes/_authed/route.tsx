import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.userId) {
      throw redirect({ to: '/' })
    }
  },
})

function RouteComponent() {
  return <Outlet />
}
