// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: Home,
    loader: async ({ context }) => {
        console.log(context.userId)
    },
})

function Home() {
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}