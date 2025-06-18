import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  collections: defineTable({
    name: v.string(),
    userId: v.string(),
  }),
  collectionVerses: defineTable({
    verseId: v.string(),
    verseText: v.string(),
    collectionId: v.id("collections"),
  }),
});