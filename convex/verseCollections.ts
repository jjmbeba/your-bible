import { validateCollectionAccess } from "@/lib/convex";
import { v } from "convex/values";
import { mutation } from "./_generated/server";

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
})