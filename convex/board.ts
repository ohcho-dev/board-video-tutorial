import { v } from "convex/values";
import { mutation } from "./_generated/server";

const images = [
  "/placegholders/1.svg",
  "/placegholders/2.svg",
  "/placegholders/3.svg",
  "/placegholders/4.svg",
  "/placegholders/5.svg",
  "/placegholders/6.svg",
  "/placegholders/7.svg",
  "/placegholders/8.svg",
  "/placegholders/9.svg",
  "/placegholders/10.svg",
];

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }
    // TODO: Later check to delete favorite relation as well

    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: { id: v.id("boards"), title: v.string() },
  handler: async (ctx, args) => {
    const title = args.title.trim();
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unautorized");
    }

    if (!title) {
      throw new Error("This is required");
    }

    if (title.length > 60) {
      throw new Error("title cannot be longer than 60 characters");
    }

    const board = await ctx.db.patch(args.id, {
      title: args.title,
    });

    return board;
  },
});
