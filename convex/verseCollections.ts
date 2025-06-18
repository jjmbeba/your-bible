import { validateCollectionAccess } from "@/lib/convex";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addVerseToCollection = mutation({
    args: {
        verseId: v.string(),
        collectionId: v.id("collections"),
        userId: v.string(),
        verseText: v.string(),
    },
    handler: async (ctx, args) => {
        await validateCollectionAccess(ctx, args.collectionId, args.userId);

        return await ctx.db.insert("collectionVerses", {
            verseId: args.verseId,
            verseText: args.verseText,
            collectionId: args.collectionId,
        });
    }
});

export const getVerseCollections = query({
    args: {
        collectionId: v.id("collections"),
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        await validateCollectionAccess(ctx, args.collectionId, args.userId);

        return await ctx.db.query("collectionVerses").filter((q) => q.eq(q.field("collectionId"), args.collectionId)).collect();
    }
});

export const deleteVerseFromCollection = mutation({
    args: {
        verseCollectionId: v.id("collectionVerses"),
        collectionId: v.id("collections"),
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        await validateCollectionAccess(ctx, args.collectionId, args.userId);

        return await ctx.db.delete(args.verseCollectionId);
    }
});