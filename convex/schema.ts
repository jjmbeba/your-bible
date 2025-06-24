import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  collections: defineTable({
    name: v.string(),
    userId: v.string(),
  }),
  collectionVerses: defineTable({
    bibleId: v.string(),
    verseId: v.string(),
    chapterId: v.string(),
    verseText: v.string(),
    collectionId: v.id("collections"),
  }).index("by_collection_id", ["collectionId"]),
  notes: defineTable({
    chapterId: v.string(),
    content: v.string(),
    userId: v.string(),
  }).index("by_chapter_id", ["chapterId"]),
  stories: defineTable({
    title: v.string(),
    bibleId: v.string(),
    chapterId: v.string(),
    chapterReference: v.string(),
    userId: v.string(),
    perspective: v.string(),
    setting: v.string(),
    tone: v.string(),
    storyLength: v.string(),
    story: v.string(),
  }).index("by_user_id", ["userId"]),
});