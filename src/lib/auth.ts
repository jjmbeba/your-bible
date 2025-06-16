import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg'
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        requireEmailVerification: false,
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }
    },
    plugins: [reactStartCookies()]
})