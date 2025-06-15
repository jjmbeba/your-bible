import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    
    if (!identity) {
      throw new Error("Unauthorized")
    }

    return await ctx.db
      .query("collections")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();
  },
});

export const getCollection = query({
  args: { id: v.id("collections") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Unauthorized")
    }

    const collection = await ctx.db.get(args.id);
    
    if (!collection) {
      throw new Error("Collection not found")
    }

    if (collection.userId !== identity.subject) {
      throw new Error("Unauthorized - You don't have access to this collection")
    }

    return collection;
  },
});