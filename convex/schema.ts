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
});