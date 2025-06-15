import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()

    if(!identity){
        throw new Error("Unauthorized")
    }

    return await ctx.db
    .query("collections")
    .filter((q) => q.eq(q.field("userId"), identity.subject))
    .collect();
  },
});