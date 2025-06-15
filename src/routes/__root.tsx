// src/routes/__root.tsx
import {
    createRootRouteWithContext,
    HeadContent,
    Outlet,
    Scripts
} from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/tanstack-react-start';

import Header from '@/components/header';
import appCss from "@/styles/app.css?url";
import { QueryClient } from '@tanstack/react-query';
import { fetchClerkAuth } from '@/actions/auth';

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
}>()({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'Your Bible',
            },
        ],
        links: [
            {
                rel: "stylesheet",
                href: appCss,
            },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
            }
        ],
    }),
    component: RootComponent,
    beforeLoad: async () => {
        const { userId } = await fetchClerkAuth()
        return {
            userId,
        }
    }
})

function RootComponent() {
    return (
        <ClerkProvider>
            <RootDocument>
                <Outlet />
            </RootDocument>
        </ClerkProvider>
    )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html>
            <head>
                <HeadContent />
            </head>
            <body>
                <Header />
                <main className='pt-8 px-10'>
                    {children}
                </main>
                <Scripts />
            </body>
        </html>
    )
}