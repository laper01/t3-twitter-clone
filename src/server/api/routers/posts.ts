import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "appt3/server/api/trpc";
import { auth, clerkClient } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";


const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    imageUrl: user.imageUrl,
  }
}

export const postsRouter = createTRPCRouter({

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      take: 10,
    });

    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId),
        limit: 10,
      })).map(filterUserForClient);

    return posts.map((post) => {

      const author = users.find((user) => user.id === post.authorId);

      if (!author) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Author not found" });
      }

      return {
        post,
        author,
      }

    });

  }),
});
