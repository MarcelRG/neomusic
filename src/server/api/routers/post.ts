import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/server";

const getToken = async (userId: string) => {
  const response = await clerkClient.users.getUserOauthAccessToken(
    userId,
    `oauth_spotify`,
  );
  if (response?.[0]) {
    return response[0].token;
  }
  throw new Error("Failed to get token");
};

export const postRouter = createTRPCRouter({
  artist: publicProcedure
    .input(z.object({ userId: z.string(), q: z.string(), type: z.string() }))
    .query(async ({ input }) => {
      const token = await getToken(input.userId);
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${input.q}&type=${input.type}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response;
    }),

  search: publicProcedure
    .input(z.object({ genre: z.string(), page: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.genre.findMany({
        take: 100,
        where: {
          name: {
            contains: input.genre,
          },
        },
        orderBy: { popularity: "asc" },
        skip: (input.page - 1) * 100,
      });
    }),

  genre: publicProcedure
    .input(z.object({ page: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.genre.findMany({
        take: 100,
        orderBy: { popularity: "asc" },
        skip: (input.page - 1) * 100,
      });
    }),
});
