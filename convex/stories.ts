import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createStory = mutation({
  args: {
    bibleId: v.string(),
    chapterId: v.string(),
    userId: v.string(),
    perspective: v.string(),
    setting: v.string(),
    tone: v.string(),
    storyLength: v.string(),
    story: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("stories", {
      bibleId: args.bibleId,
      chapterId: args.chapterId,
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