import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/stories/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="w-full px-2 sm:px-4">
    <div className="p-3 sm:p-5 border rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4">
      <h1 className="text-xl sm:text-2xl font-bold">Stories</h1>
    </div>
  </div>
}
