import { ARTICLE_CATEGORIES } from "@workspace/shared/constants";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  articles: defineTable({
    title: v.string(),
    content: v.string(),
    category: v.union(
      ...ARTICLE_CATEGORIES.map((category) => v.literal(category)),
    ),
    updatedAt: v.number(),
  }),
});
