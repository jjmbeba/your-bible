import { validateStoryAccess } from "@/lib/convex";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createStory = mutation({
  args: {
    bibleId: v.string(),
    story: v.string(),
    chapterId: v.string(),
    chapterReference: v.string(),
    userId: v.string(),
    perspective: v.string(),
    setting: v.string(),
    tone: v.string(),
    storyLength: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
      return  await ctx.db.insert("stories", {
        bibleId: args.bibleId,
        chapterId: args.chapterId,
        chapterReference: args.chapterReference,
        userId: args.userId,
        title: args.title,
        perspective: args.perspective,
        setting: args.setting,
        tone: args.tone,
        storyLength: args.storyLength,
        story: args.story,
      }); 
  }
});

export const getStories = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.query("stories").filter((q) => q.eq(q.field("userId"), args.userId)).collect();
  }
});

export const getStory = query({
  args: {
    id: v.id("stories"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await validateStoryAccess(ctx, args.id, args.userId);
  }
});

export const deleteStory = mutation({
  args: {
    id: v.id("stories"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    await validateStoryAccess(ctx, args.id, args.userId);

    return await ctx.db.delete(args.id);
  }
});