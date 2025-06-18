import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("collections")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
  },
});

export const getCollection = query({
  args: { id: v.id("collections") },
  handler: async (ctx, args) => {
    // const { collection } = await validateCollectionAccess(ctx, args.id);
    const collection = await ctx.db.get(args.id);
    return collection;
  },
});

export const createCollection = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // const identity = await getAuthenticatedUser(ctx);

    // return await ctx.db.insert("collections", {
    //   userId: identity.subject,
    //   name: args.name,
    // });
  }
});

export const updateCollection = mutation({
  args: {
    id: v.id("collections"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // await validateCollectionAccess(ctx, args.id);

    // return await ctx.db.patch(args.id, {
    //   name: args.name,
    // });
  }
});

export const deleteCollection = mutation({
  args: {
    id: v.id("collections"),
  },
  handler: async (ctx, args) => {
    // await validateCollectionAccess(ctx, args.id);

    // return await ctx.db.delete(args.id);
  }
})