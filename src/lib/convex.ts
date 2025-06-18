import { Id } from "convex/_generated/dataModel";

export const validateCollectionAccess = async (
    ctx: any,
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