// src/routes/__root.tsx
import {
    createRootRouteWithContext,
    HeadContent,
    Outlet,
    Scripts,
    useRouteContext
} from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { ClerkProvider, useAuth } from '@clerk/tanstack-react-start';

import Header from '@/components/header';
import appCss from "@/styles/app.css?url";
import { QueryClient } from '@tanstack/react-query';
import { fetchClerkAuth } from '@/actions/auth';
import { type ConvexReactClient } from 'convex/react';
import { type ConvexQueryClient } from '@convex-dev/react-query';
import { ConvexProviderWithClerk } from "convex/react-clerk"

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
    component: RootComponent,
    beforeLoad: async ({ context }) => {
        const { userId, token } = await fetchClerkAuth()

        if (token) {
            context.convexQueryClient.serverHttpClient?.setAuth(token)
        }

        return {
            userId,
            token
        }
    }
})

function RootComponent() {
    const context = useRouteContext({
        from: Route.id
    })

    return (
        <ClerkProvider>
            <ConvexProviderWithClerk
                client={context.convexClient}
                useAuth={useAuth}
            >
                <RootDocument>
                    <Outlet />
                </RootDocument>
            </ConvexProviderWithClerk>
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