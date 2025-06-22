import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { validateNoteAccess } from "@/lib/convex";

export const getNotes = query({
    args: { chapterId: v.string(), userId: v.string() },
    handler: async (ctx, args) => { 
        return await ctx.db.query("notes").withIndex("by_chapter_id", q => q.eq("chapterId", args.chapterId)).filter(q => q.eq(q.field("userId"), args.userId)).first();
    },
});

export const createNote = mutation({
    args: {
        chapterId: v.string(),
        content: v.string(),
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("notes", { ...args });
    },
})

export const updateNote = mutation({
    args: {
        id: v.id("notes"),
        content: v.string(),
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        const note = await validateNoteAccess(ctx, args.id, args.userId);
        
        return await ctx.db.patch(note._id, { content: args.content });
    },
})