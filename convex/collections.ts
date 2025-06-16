import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

const getAuthenticatedUser = async (ctx: any) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthorized");
  }
  return identity;
};

const validateCollectionAccess = async (ctx: any, collectionId: Id<"collections">) => {
  const identity = await getAuthenticatedUser(ctx);
  const collection = await ctx.db.get(collectionId);
  
  if (!collection) {
    throw new Error("Collection not found");
  }

  if (collection.userId !== identity.subject) {
    throw new Error("Unauthorized - You don't have access to this collection");
  }

  return { collection, identity };
};

export const get = query({
  args: {},
  handler: async (ctx) => {
    // const identity = await getAuthenticatedUser(ctx);
    
    return await ctx.db
      .query("collections")
      // .filter((q) => q.eq(q.field("userId"), identity.subject))
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
    const identity = await getAuthenticatedUser(ctx);

    return await ctx.db.insert("collections", {
      userId: identity.subject,
      name: args.name,
    });
  }
});

export const updateCollection = mutation({
  args: {
    id: v.id("collections"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    await validateCollectionAccess(ctx, args.id);

    return await ctx.db.patch(args.id, {
      name: args.name,
    });
  }
});

export const deleteCollection = mutation({
  args: {
    id: v.id("collections"),
  },
  handler: async (ctx, args) => {
    await validateCollectionAccess(ctx, args.id);

    return await ctx.db.delete(args.id);
  }
})