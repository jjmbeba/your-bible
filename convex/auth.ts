import { convexAuth, getAuthSessionId, getAuthUserId } from "@convex-dev/auth/server";
import Github from "@auth/core/providers/github";
import { Password } from "@convex-dev/auth/providers/password";
import { query } from "./_generated/server";
import { v } from "convex/values";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Github, Password],
});

export const getUser = query({
  args: {
    email: v.string()
  },
  handler: async (ctx, args) => {
    const { email } = args

    return await ctx.db.query("users").filter((q) => q.eq(q.field("email"), email)).first();
  },
});

export const getSession = query({
  args: {},
  handler: async (ctx) => {
    const sessionId = await getAuthSessionId(ctx)

    if(!sessionId) {
      return null
    }

    return await ctx.db.get(sessionId)
  }
})

export const getCurrentUser = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)

    if(!userId) {
      return null
    }

    return await ctx.db.get(userId)
  }
})