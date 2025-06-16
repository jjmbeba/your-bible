// src/routes/__root.tsx
import {
    createRootRouteWithContext,
    HeadContent,
    Outlet,
    Scripts,
    useRouteContext
} from '@tanstack/react-router';
import type { ReactNode } from 'react';

import Header from '@/components/header';
import appCss from "@/styles/app.css?url";
import { type ConvexQueryClient } from '@convex-dev/react-query';
import { QueryClient } from '@tanstack/react-query';
import { type ConvexReactClient } from 'convex/react';
import { Toaster } from 'sonner';
import { ConvexAuthProvider } from '@convex-dev/auth/react';

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient,
    convexClient: ConvexReactClient,
    convexQueryClient: ConvexQueryClient
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
    component: RootComponent
})

function RootComponent() {
    const context = useRouteContext({
        from: Route.id
    })

    return (
        <ConvexAuthProvider client={context.convexClient}>
            <RootDocument>
                <Outlet />
            </RootDocument>
        </ConvexAuthProvider>
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
                <Toaster richColors />
                <Scripts />
            </body>
        </html>
    )
}