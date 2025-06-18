import { Id } from "convex/_generated/dataModel";
import { QueryCtx } from "convex/_generated/server";

export const validateCollectionAccess = async (
    ctx: QueryCtx,
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