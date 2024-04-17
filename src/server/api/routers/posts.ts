import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "appt3/server/api/trpc";

export const postsRouter = createTRPCRouter({

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany();
  }),


});
