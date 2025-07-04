import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { validateCollectionAccess } from "@/lib/convex";

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
  args: { id: v.id("collections"), userId: v.string() },
  handler: async (ctx, args) => {
    const collection = await validateCollectionAccess(ctx, args.id, args.userId);

    const verses = await ctx.db.query("collectionVerses").withIndex("by_collection_id", q => q.eq("collectionId", collection._id)).collect();

    return {
      collection,
      verses,
    };
  },
});

export const createCollection = mutation({
  args: {
    name: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("collections", {
      userId: args.userId,
      name: args.name,
    });
  }
});

export const updateCollection = mutation({
  args: {
    id: v.id("collections"),
    name: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    await validateCollectionAccess(ctx, args.id, args.userId);
    return await ctx.db.patch(args.id, {
      name: args.name,
    });
  }
});

export const deleteCollection = mutation({
  args: {
    id: v.id("collections"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    await validateCollectionAccess(ctx, args.id, args.userId);
    return await ctx.db.delete(args.id);
  }
});