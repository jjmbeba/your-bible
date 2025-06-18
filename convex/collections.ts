import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

const validateCollectionAccess = async (
  ctx: any,
  collectionId: Id<"collections">,
  userId: string
) => {
  const collection = await ctx.db.get(collectionId);
  if (!collection) {
    throw new Error("Collection not found");
  }
  if (collection.userId !== userId) {
    throw new Error("You are not authorized to access this collection");
  }
  return collection;
};

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
    return await validateCollectionAccess(ctx, args.id, args.userId);
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