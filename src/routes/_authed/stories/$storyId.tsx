import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/stories/$storyId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/stories/$storyId"!</div>
}
